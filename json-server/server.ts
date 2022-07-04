import { Application, Context, isHttpError, Router, Status } from "oak/mod.ts";
import { bold, cyan, green, yellow } from "fmt/colors.ts";

import { getArchive, getArchives, getArticle } from "../gstools/mod.ts";

const router = new Router();
const controller = new AbortController();

router
  .get("/", (context) => {
    context.response.body = "Running the Geenstijl service";
  })
  .get("/archives", async (context) => {
    try {
      const data = await getArchives();
      context.response.status = Status.OK;
      context.response.body = data;
      context.response.type = "json";
    } catch (error) {
      context.throw(Status.InternalServerError, error);
    }
  })
  .get("/archive/:year/:month", async (context) => {
    const year = parseInt(context.params.year, 10);
    const month = parseInt(context.params.month, 10);

    if (
      !Number.isNaN(year) &&
      !Number.isNaN(month) &&
      month > 0 &&
      month <= 12
    ) {
      try {
        const data = await getArchive(year, month);
        context.response.status = Status.OK;
        context.response.body = data;
        context.response.type = "json";
      } catch (error) {
        context.throw(Status.InternalServerError, error);
      }
    } else {
      return notFound(context);
    }
  })
  .get("/article", async (context) => {
    const { searchParams } = context.request.url;
    const query = searchParams.get("q");

    if (query) {
      let parsed: URL | null = null;
      try {
        parsed = new URL(query);
      } catch (_error) {
        parsed = null;
      }

      if (
        parsed &&
        parsed.host.includes("geenstijl.nl") &&
        parsed.protocol === "https:" &&
        parsed.pathname
      ) {
        const data = await getArticle(parsed.href);
        context.response.status = Status.OK;
        context.response.body = data;
        context.response.type = "json";
        return;
      }
    }
    return notFound(context);
  });

const app = new Application();

app.use(async (context, next) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(
    `${green(context.request.method)} ${cyan(
      context.request.url.pathname
    )} - ${bold(String(rt))}`
  );
});

app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      context.response.status = err.status;
      const { message, status, stack } = err;
      if (context.request.accepts("json")) {
        context.response.body = { message, status, stack };
        context.response.type = "json";
      } else {
        context.response.body = `${status} ${message}\n\n${stack ?? ""}`;
        context.response.type = "text/plain";
      }
    } else {
      console.log(err);
      throw err;
    }
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const notFound = (context: Context) => {
  context.response.status = Status.NotFound;
  context.response.body = `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
};

app.use(notFound);

app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") +
      yellow(`${hostname}:${port}`) +
      bold(" using HTTP server: " + yellow(serverType))
  );
});

const { signal } = controller;
await app.listen({ port: 8000, signal });
console.log(bold("Server closed."));
