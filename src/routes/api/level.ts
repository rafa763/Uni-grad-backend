import express, { NextFunction, Request, Response } from "express";
import { LevelRepo } from "../../db/levelRepo";

const server = express.Router();
const Level = new LevelRepo();

// get all levels in program
server.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programId = req.query.program_id as string;
    const levels = await Level.readMany({ programId });
    res.status(200).send(levels);
  } catch (err) {
    next(err);
  }
});

// get level by id
server.get(
  "/:level_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.level_id;
      const level = await Level.read({ id });
      res.status(200).send(level);
    } catch (err) {
      next(err);
    }
  }
);

// create level
server.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programId = req.query.program_id as string;
    const level = await Level.create({
      ...req.body,
      program: {
        connect: {
          id: programId,
        },
      },
    });
    res.status(201).send(level);
  } catch (err) {
    next(err);
  }
});

// update level
server.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const level = await Level.update({ id }, data);
    res.status(200).send(level);
  } catch (err) {
    next(err);
  }
});

export default server;