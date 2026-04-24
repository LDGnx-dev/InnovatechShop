import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!import.meta.env.MONGODB_URI) {
  throw new Error('⚠️ Error: Define la variable MONGODB_URI en tu archivo .env');
}

if (import.meta.env.NODE_ENV === 'development') {
  // En desarrollo, usamos una variable global para preservar la conexión entre recargas de Astro
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción (Vercel), es mejor crear un cliente nuevo
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;