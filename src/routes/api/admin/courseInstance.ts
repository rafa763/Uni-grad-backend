import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";
import { CourseInstanceController } from "../../../controllers/courseInstanceController";

const router = express.Router();
const courseInstanceController = ControllerFactory.getController(
  "courseInstance"
) as CourseInstanceController;

router.get(
  "/semesters/:semester_id/programs/:program_id",
  courseInstanceController.getAllByProgram
);

router.get(
  "/semesters/:semester_id/programs/:program_id/:id",
  courseInstanceController.get
);

router.post(
  "/semesters/:semester_id/programs/:program_id",
  courseInstanceController.create
);

router.put(
  "/semesters/:semester_id/programs/:program_id/:id",
  courseInstanceController.update
);

router.delete(
  "/semesters/:semester_id/programs/:program_id/:id",
  courseInstanceController.delete
);

// assign professor to a course
router.put(
  "/assign/:instanceId/professor/:professorId",
  courseInstanceController.assignProfessor
);

export default router;
