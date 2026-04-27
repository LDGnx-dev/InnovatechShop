import type { APIRoute } from 'astro';
import { MongoClient } from 'mongodb';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const uri = import.meta.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    
    // Insertamos al nuevo usuario con valores por defecto
    await db.collection("users").insertOne({
      email: data.email,
      name: data.name,
      alias: data.alias,
      role: 'editor', // Por defecto
      themeColor: '#a855f7', // Tu púrpura por defecto
      status: 'pending'
    });

    return new Response(JSON.stringify({ message: `Usuario ${data.alias} creado.` }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Error en DB" }), { status: 500 });
  } finally {
    await client.close();
  }
}