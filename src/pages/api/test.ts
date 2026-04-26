import clientPromise from "../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("innovatech");
    
    // Intentamos pingear la DB
    await db.command({ ping: 1 });
    
    return new Response(JSON.stringify({ message: "¡Conexión exitosa a MongoDB Atlas!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Error de conexión", details: e }), {
      status: 500
    });
  }
}