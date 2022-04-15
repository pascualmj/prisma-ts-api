import "module-alias/register";
import "source-map-support/register";
import * as dotenv from "dotenv";

import initDatabase from "./database";
import initServer from "./server";

dotenv.config();

if (!process.env.PORT) process.exit(1);

initDatabase(initServer);
