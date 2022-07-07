import { HandlerContext } from "$fresh/server.ts";
import { getArchives } from "@/gstools/mod.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  try {
    const archives = (await getArchives()).sort((a, b) => b.num - a.num);
    return new Response(JSON.stringify(archives), {
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
