// Import the gameS model
import gameS from "@/models/gameM";

export async function GET() {
  return Response.json(await gameS.find()); // Fetch all games
}

export async function POST(request) {
  const body = await request.json();
  const game = new gameS(body); // Create a new game entry
  await game.save();
  return Response.json(game);
}

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body; // Update game by ID
  const game = await gameS.findByIdAndUpdate(_id, updateData, { new: true });
  if (!game) {
    return new Response("Game not found", { status: 404 });
  }
  return Response.json(game);
}

export async function PATCH(request) {
  const body = await request.json();
  const { _id, ...updateData } = body; // Partial update of game by ID
  const game = await gameS.findByIdAndUpdate(_id, updateData, { new: true });
  if (!game) {
    return new Response("Game not found", { status: 404 });
  }
  return Response.json(game);
}
