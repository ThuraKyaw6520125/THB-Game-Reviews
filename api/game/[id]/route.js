import gameS from "@/models/gameM";

export async function GET(request, { params }) {
    const id = params.id;
    const category = await gameS.findById(id)
    return Response.json(category);
}
