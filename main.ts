import { Application } from "./deps.ts";
import router from "./routes/index.ts";

const env = Deno.env.toObject();
const PORT = parseInt(env.PORT) || 3000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server Running on http://localhost:${PORT}`);
await app.listen({ port: PORT }); // escuhando cambios
