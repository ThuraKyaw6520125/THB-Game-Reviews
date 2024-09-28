import devS from "@/models/devMod";

export async function GET(request, { params }) {
    const id = params.id;
    const category = await devS.findById(id)
    return Response.json(category);
}
export async function DELETE(request, { params }) {
    const id = params.id;
    return Response.json(await devS.findByIdAndDelete(id));
  }