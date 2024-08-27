export async function POST (request : Request){

    const userData = await request.json();

    //make database call

    return Response.json({ message : 'success' });

}