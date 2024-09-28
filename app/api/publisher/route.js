//app/api/publisher/route.js
import pubS from "@/models/pubMod";
export async function GET() {
  const gameList = await pubS.find().sort({ name: 1 })
  return Response.json(gameList)
}

export async function POST(request) {
  const body = await request.json();
  const game = new pubS(body); // Create a new entry
  await game.save();
  return Response.json(game);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body; // Extract _id and the rest of the data

    // Validate the presence of _id
    if (!_id) {
      return new Response("ID is required", { status: 400 });
    }

    // Update the game by ID
    const game = await pubS.findByIdAndUpdate(_id, updateData, { new: true });
    
    // Handle the case where no game was found
    if (!game) {
      return new Response( { status: 404 });
    }

    // Return the updated game
    return new Response(JSON.stringify(game), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error updating", error); // Log error for debugging
    return new Response("Server error", { status: 500 });
  }
}
