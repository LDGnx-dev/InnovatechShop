// auth.config.mjs
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { MongoClient } from 'mongodb';

export default {
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    // Esta función se ejecuta JUSTO DESPUÉS de que GitHub/Google dicen "Sí, el correo es real" 
    // pero ANTES de crear la sesión en tu página.
    async signIn({ user }) {
      const client = new MongoClient(import.meta.env.MONGODB_URI);
      
      try {
        await client.connect();
        const db = client.db(); // Se conecta a "InnovatechDB" gracias a tu URI
        
        // Buscamos si el email de GitHub/Google existe en tu colección
        const existingUser = await db.collection("users").findOne({ email: user.email });
        
        if (existingUser) {
          return true; // ¡Existe! Lo dejamos entrar.
        } else {
          // No existe en MongoDB. Le negamos el acceso y lo mandamos al login con un error.
          return "/login?error=AccessDenied"; 
        }
      } catch (error) {
        console.error("Error conectando a MongoDB en el Login:", error);
        return false; // Ante cualquier error de conexión, bloqueamos el acceso por seguridad.
      } finally {
        await client.close(); // Cerramos la conexión para no saturar el clúster.
      }
    }
  }
};