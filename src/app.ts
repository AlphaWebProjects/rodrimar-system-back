import { loadEnv, connectDb, disconnectDB } from "@/config";
import cors from "cors";
import express, { Express } from "express";

import "reflect-metadata";
import "express-async-errors";
import { authRouter } from "./routers/auth-router";
import { itemRouter } from "./routers/item-router";
import { categoryRouter } from "./routers/category-router";
import { insertItemRouter } from "./routers/insertItem-router";
import { subCategoryRouter } from "./routers/sub-category-router";
import { imageRouter } from "./routers/image-router";
import { licensePlateRouter } from "./routers/licensePlate-router";
import { deletedItemRouter } from "./routers/deletedItem-router";
import { supplierRouter } from "./routers/supplier-router";

loadEnv();


const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/auth", authRouter)
  .use("/image", imageRouter)
  .use("/itens", itemRouter)
  .use("/supplier", supplierRouter)
  .use("/insertItem", insertItemRouter)
  .use("/deletedItem", deletedItemRouter)
  .use("/category", categoryRouter)
  .use("/subcategory", subCategoryRouter)
  .use("/licenseplate", licensePlateRouter)
  .get("/health", (_req, res) => res.send("OK!"))

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
