export async function GET(request) {
  let pincodes = {
    380063: ["Ahmedabad", "Gujarat"],
    360001: ["Rajkot", "Gujarat"],
    300018: ["Vadodara", "Gujarat"],
  };
  return Response.json(pincodes);
}
