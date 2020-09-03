/* eslint-disable linebreak-style */
import { Router } from "express";
import {
  createResource,
  getResource,
  updateResource,
  deleteResource,
  getAllResource,
} from "../controller/user";
import middlewares from "../middleware";

const { validate, updateSchema, IdSchema, createSchema } = middlewares;

const userRouter = Router();

userRouter.post("/", validate(createSchema), createResource);

userRouter.get(
  "/:id",
  validate(IdSchema, (req) => (req.body.id = req.params.id)),
  getResource
);

userRouter.put(
  "/:userId",
  validate(updateSchema, (req) => (req.body.userId = req.params.userId)),
  updateResource
);

userRouter.delete(
  "/:id",
  validate(IdSchema, (req) => (req.body.id = req.params.id)),
  deleteResource
);

userRouter.get("/", getAllResource);
export default userRouter;
