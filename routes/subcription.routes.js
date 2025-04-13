import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "GET all Subscription" });
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET Subscription by ID" });
});
subscriptionRouter.post("/", (req, res) => {
  res.send({ title: "POST/Create a new Subscription" });
});
subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "PUT/Update Subscription by ID" });
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE Subscription by ID" });
});
subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "GET all Subscription by User ID" });
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "PUT/Cancel Subscription by ID" });
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET Upcoming Renewals" });
});
 export default subscriptionRouter;
