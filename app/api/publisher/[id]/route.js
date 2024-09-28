import pubS from "@/models/pubMod";

export async function GET(request, { params }) {
    const id = params.id;
    const category = await pubS.findById(id)
    return Response.json(category);
}
export async function DELETE(request, { params }) {
    const id = params.id;
    return Response.json(await pubS.findByIdAndDelete(id));
  }