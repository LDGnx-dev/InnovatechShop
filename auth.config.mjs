// auth.config.mjs
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { MongoClient } from 'mongodb';
import { defineConfig } from 'auth-astro';

export default defineConfig({
  trustHost: true, 
  
  secret: import.meta.env.AUTH_SECRET || process.env.AUTH_SECRET,

  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // Usamos el fallback a process.env por si Vercel compila esto como Node puro
      const uri = import.meta.env.MONGODB_URI || process.env.MONGODB_URI;
      const client = new MongoClient(uri);
      
      try {
        await client.connect();
        const db = client.db(); 
        const existingUser = await db.collection("users").findOne({ email: user.email });
        
        if (existingUser) {
          return true; 
        } else {
          return "/?access=denied"; 
        }
      } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        return false; 
      } finally {
        await client.close(); 
      }
    }
  }
});