import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "GET all User" });
});

userRouter.get("/:id", (req, res) => {
    res.send({ title: "GET User by ID" });
});

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