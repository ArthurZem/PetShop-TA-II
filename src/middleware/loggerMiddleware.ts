import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const currentTime = new Date().toLocaleString();
  const { method, url } = req;

  console.log(`[${currentTime}] ${method} ${url}`);
  
  next();
}
