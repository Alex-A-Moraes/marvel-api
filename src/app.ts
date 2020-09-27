import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import Database from "./config/connection";
import * as dotenv from "dotenv";
dotenv.config();

import routes from "./config/v1";

class App {
  public app: express.Application;
  private database: Database = new Database();

  public constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.dataBaseConnection();
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(
      morgan(
        ":date[iso] :method :url :status :response-time ms - :res[content-length]"
      )
    );
  }

  private dataBaseConnection() {
    this.database.connect();
  }

  private routes() {
    this.app.use(routes);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.route("/status").get((_req, res) => {
      res.json({
        success: true,
        serverStatus: "OK",
        port: process.env.PORT || 3001,
      });
    });
  }
}

export default new App();
