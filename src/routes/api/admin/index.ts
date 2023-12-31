import express from "express";
import program from "./program";
import course from "./course";
import classesTable from "./classesTable";
import courseIntance from "./courseInstance";
import professor from "./professor";
import admission from "./admission";
import department from "./department";
import student from "../student/index";
import bank from "./bank"
import question from "./question"
import sheet from "./sheet"
import sheetInstance from "./sheetInstance"
import payment from "./payment"

const router = express.Router();

router.use("/student", admission);
router.use("/programs", program);
router.use("/courses", course);
router.use("/professor", professor);
router.use("/classes_tables", classesTable);
router.use("/course_instances", courseIntance);
router.use("/departments", department);
router.use("/bank", bank);
router.use("/question", question);
router.use("/sheet", sheet);
router.use("/sheetInstance", sheetInstance);
router.use("/payments", payment);
router.use("/view", student);

// delete this route
import { Schedule } from "../../../controllers/staffSceduleDELL";
const schedule = new Schedule();
router.get("/schedules", schedule.get);

export default router;