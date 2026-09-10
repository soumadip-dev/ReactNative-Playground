export async function GET(request: Request) {
  return Response.json({
    data: 'Hello World',
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  return Response.json({
    data,
  });
}

//* query
// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const query = url.searchParams.get('q');

//   return Response.json({ query });
// }
