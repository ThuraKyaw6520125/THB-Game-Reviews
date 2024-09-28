import gameS from "@/models/gameMod";

export async function GET(request, { params }) {
    const id = params.id;
    const category = await gameS.findById(id)
    return Response.json(category);
}
export async function DELETE(request, { params }) {
    const id = params.id;
    return Response.json(await gameS.findByIdAndDelete(id));
  }