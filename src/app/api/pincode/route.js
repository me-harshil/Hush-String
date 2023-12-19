import pincodes from "./pincodes.json";

export async function GET(request) {
  return Response.json(pincodes);
}
