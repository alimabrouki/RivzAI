import serverless from "serverless-http";
import app from "../../server/server";

const handler = serverless(app);

export default async (request, context) => {
  const url = new URL(request.url);
  const body =
    request.method === "GET" || request.method === "HEAD"
      ? null
      : await request.text();
  const event = {
    httpMethod: request.method,
    path: url.pathname,
    headers: Object.fromEntries(request.headers),
    body,
    isBase64Encoded: false,
    queryStringParameters: Object.fromEntries(url.searchParams),
    multiValueQueryStringParameters: {},
  };
  const result = await handler(event, context);

  return new Response(result.body, {
    status: result.statusCode,
    headers: result.headers,
  });
};
