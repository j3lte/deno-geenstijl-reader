import { HandlerContext } from "$fresh/server.ts";
import { getArchive } from "@/gstools/mod.ts";

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  if (!ctx.params.slug) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const arr = (ctx.params.slug || "")
      .trim()
      .split("-")
      .map((x) => parseInt(x, 10));

    if (
      !arr ||
      arr.length !== 2 ||
      Number.isNaN(arr[0]) ||
      Number.isNaN(arr[1])
    ) {
      return ctx.render(null);
    }

    const archiveEntries = await getArchive(arr[0], arr[1]);

    return new Response(JSON.stringify(archiveEntries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in API decoder!", error);
    return new Response(null, {
      status: 500,
      statusText: error,
    });
  }
};
