export default async function fetcher<JSON>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
