import express from "express";
import cors from "cors";
import helmet from "helmet";

import AppRoutes from "@app/routes";
import { errorHandler } from "@app/middlewares/error.middleware";
import { notFoundHandler } from "@app/middlewares/notFound.middleware";

export default function initServer() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use("/api/v1", AppRoutes);

  /**
   * Global error handling
   */
  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}
