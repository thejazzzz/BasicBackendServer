import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id",authorize, getUser);

userRouter.post("/", (req, res) => {
    res.send({ title: "POST/Create a new User" });
});

userRouter.put("/:id", (req, res) => {
    res.send({ title: "PUT/Update User by ID" });
});   

userRouter.delete("/:id", (req, res) => {
    res.send({ title: "DELETE User by ID" });
});

export default userRouter;