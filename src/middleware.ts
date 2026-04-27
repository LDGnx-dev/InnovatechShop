// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Verificamos si la ruta que intentan visitar empieza con "/admin"
  if (context.url.pathname.startsWith("/admin")) {
    
    // 2. Le preguntamos a Auth.js si hay una sesión activa
    const session = await getSession(context.request);
    
    // 3. Si no hay sesión (o es un intruso), lo mandamos al Login de un plumazo
    if (!session) {
        // Antes: return context.redirect("/login");
        return context.redirect("/?access=denied"); 
    }
  }

  // Si no es la ruta /admin, o si sí hay sesión, lo dejamos pasar normalmente
  return next();
});