import { Router } from "../deps.ts";
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/index.ts";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "Welcomeee running with deno";
});

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);
export default router;
