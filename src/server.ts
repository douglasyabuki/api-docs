import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import scalarUI from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import { createUserRoute } from "./routes/create-user-route.ts";
import { getUsersRoute } from "./routes/get-users-route.ts";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Example API Docs",
      version: "1.0.0",
    },
  },
});

app.register(getUsersRoute)
app.register(createUserRoute)

app.get("/openapi.json", () => app.swagger());

app.register(scalarUI, {
  routePrefix: "/docs",
  configuration: {
    layout: 'modern'
  }
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
