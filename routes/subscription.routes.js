import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "GET all Subscriptions" });
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET Subscription by ID" });
});
subscriptionRouter.post("/", (req, res) => {
  res.send({ title: "Create Subscription" });
});
subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "Update Subscription" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete Subscription" });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "Get all user Subscriptions by User ID" });
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "Cancel Subscription" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "Get all upcoming subscription renewals" });
});

export default subscriptionRouter;
