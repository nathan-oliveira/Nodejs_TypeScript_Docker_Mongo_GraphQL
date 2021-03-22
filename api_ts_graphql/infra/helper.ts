import { Response } from "express";

class Helper {
  sendResponse = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({
      result: data,
    });
  };
}

export default new Helper();
