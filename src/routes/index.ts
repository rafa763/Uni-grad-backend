import express, { Request, Response } from "express";
import college from "./api/college";
import program from "./api/program";
import course from "./api/course";
import server from "./api/auth";
import classesTable from "./api/classesTable";
import courseIntance from "./api/courseInstance";
import admission from "./api/admission";
import professor from "./api/professor";
import errorHandler from "../middleware/errorHandler";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("API router is working");
});

router.use("/", server);
router.use("/student", admission);
router.use("/colleges", college);
router.use("/programs", program);
router.use("/courses", course);
router.use("/professor", professor);
router.use("/classes_tables", classesTable);
router.use("/course_instances", courseIntance);

router.use(errorHandler);

export default router;
