//app/api/game/route.js
import gameS from "@/models/gameMod";
import { NextResponse } from "next/server";
export async function GET() {
  const gameList = await gameS.find().sort({ name: 1 })
  return Response.json(gameList)
}

export async function POST(request) {
  const body = await request.json();
  const game = new gameS(body); // Create a new game entry
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
    const game = await gameS.findByIdAndUpdate(_id, updateData, { new: true });
    
    // Handle the case where no game was found
    if (!game) {
      return new Response("Game not found", { status: 404 });
    }

    // Return the updated game
    return new Response(JSON.stringify(game), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error updating game:", error); // Log error for debugging
    return new Response("Server error", { status: 500 });
  }
}
/*format:
{
  "_id": "66f7d24424219c52bd9f3b53", <-- not nessessary for GET() & Post()
  "rating": 9.8,
  "name": "The Legend of Zelda: Breath of the Wild",
  "slug": "the-legend-of-zelda-breath-of-the-wild",
  "publishers": ["Nintendo"],
  "developers": ["Nintendo"],
  "image_background": "http://example.com/updated_zelda.jpg",
  "description": "An updated description for this open-world action-adventure game."
} */
