import { MongoClient, ServerApiVersion } from 'mongodb';

if (!import.meta.env.MONGODB_URI) {
  throw new Error('No se encontró MONGODB_URI en las variables de entorno');
}

const uri = import.meta.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// En desarrollo, usamos una variable global para que Hot Module Replacement (HMR)
// no cree mil conexiones cada vez que guardas un cambio en el código.
if (import.meta.env.DEV) {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // En producción (Vercel), simplemente creamos la promesa.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;