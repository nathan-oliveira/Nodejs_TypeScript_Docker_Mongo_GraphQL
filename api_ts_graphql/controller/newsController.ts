import { Request, Response } from "express";
import NewsService from "../services/newsService";
import * as HttpStatus from "http-status";
import * as redis from "redis";

import Helper from "../infra/helper";
import ExportFiles from "../infra/exportFiles";

class NewsController {
  async get(req: Request, res: Response) {
    let client = redis.createClient();

    await client.get("news", async function (err, reply) {
      try {
        if (reply) {
          Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
        } else {
          console.log("db");

          let response = await NewsService.get();

          client.set("news", JSON.stringify(response));

          client.expire("news", 20);

          Helper.sendResponse(res, HttpStatus.OK, response);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  async exportToCsv(req: Request, res: Response) {
    try {
      const response = await NewsService.get();
      const filename = ExportFiles.tocsv(response);
      Helper.sendResponse(res, HttpStatus.OK, req.get("host") + "/exports/" + filename);
    } catch (error) {
      console.error(error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      let response = await NewsService.getById(_id);
      Helper.sendResponse(res, HttpStatus.OK, response);
    } catch (error) {
      console.error(error);
    }
  }

  async search(req: Request, res: Response) {
    try {
      const term = req.params.term;

      const page = req.params.page ? parseInt(req.params.page) : 1;
      const perPage = req.params.limit ? parseInt(req.params.limit) : 1;

      let response = await NewsService.search(term, page, perPage);
      Helper.sendResponse(res, HttpStatus.OK, response);
    } catch (error) {
      console.error(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      let vm = req.body;
      await NewsService.create(vm);
      Helper.sendResponse(res, HttpStatus.OK, "Noticia cadastrada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      let news = req.body;
      await NewsService.update(_id, news);
      Helper.sendResponse(res, HttpStatus.OK, `Noticia atualiza com sucesso!`);
    } catch (error) {
      console.error(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      await NewsService.delete(_id);
      Helper.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }
}

export default new NewsController();
