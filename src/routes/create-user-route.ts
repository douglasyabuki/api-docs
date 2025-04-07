import type { FastifyPluginAsync } from "fastify";

export const createUserRoute: FastifyPluginAsync = async (app) => {
  app.post(
    "/user",
    {
      schema: {
        summary: "Create an user",
        security: [{ bearerAuth: [] }],
        querystring: {
          type: "object",
          examples: [
            {
              name: "John Doe",
              email: "john.doe@example.com",
            },
          ],
          properties: {
            name: { type: ["string", "null"], maxLength: 100 },
            email: { type: "string", format: "email" },
          },
        },
        response: {
          201: {
            description: "User created",
            type: "object",
            properties: {
              userId: {
                type: "string",
                format: "uuid",
                description: "New user ID",
              },
            },
          },
        },
      },
    },
    () => {
      return { userId: "123" };
    }
  );
};
