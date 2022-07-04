import { HandlerContext } from "$fresh/server.ts";
import { decode } from "encoding/base64.ts";
import { getArticle } from "@/gstools/mod.ts";

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
    const decoded = decode(ctx.params.slug);
    const str = new TextDecoder().decode(decoded);

    if (str && str.startsWith("https://www.geenstijl.nl")) {
      const article = await getArticle(str);

      return new Response(JSON.stringify(article), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in API decoder!", error);
    return new Response(null, {
      status: 500,
      statusText: error,
    });
  }

  return new Response(null, {
    status: 400,
  });
};
