import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";

import Database from "./infra/db";
import Auth from "./infra/auth";
import Uploads from "./infra/uploads";
import newsRouter from "./router/newsRouter";

import * as graphqlHTTP from "express-graphql";
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";

class StartUp {
  public app: express.Application;
  private _db: Database;

  constructor() {
    this.app = express();

    this._db = new Database();
    this._db.createConnection();

    this.middler();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET,OPTIONS,PUT,POST,DELETE,PATCH",
      origin: "*",
    };

    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use("/exports", express.static(process.cwd() + "/exports"));
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send({ version: "0.0.1" });
    });

    this.app.route("/uploads").post(Uploads.single("file"), (req, res) => {
      try {
        res.send("Arquivo enviado com sucesso");
      } catch (error) {
        console.log(error);
      }
    });

    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema: schemas,
        rootValue: resolvers,
        graphiql: true,
      })
    );

    this.app.use(Auth.validate);
    this.app.use("/api/v1", newsRouter);
  }
}

export default new StartUp().app;
