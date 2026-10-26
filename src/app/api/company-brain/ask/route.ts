/** The marketing site's former demo cookie is not customer authentication. */
export async function POST(): Promise<Response> {
  return Response.json(
    { error: { code: "DEMO_DISABLED", message: "Open your authenticated Notrix workspace to ask a question." } },
    { status: 410, headers: { "cache-control": "no-store" } },
  );
}
