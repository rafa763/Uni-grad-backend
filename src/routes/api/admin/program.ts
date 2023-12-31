import { ProgramController } from "../../../controllers/programController";
import express from "express";
import { ProgramRelationsController } from "../../../controllers/programRelationsController";
import { ProgramCourseController } from "../../../controllers/programCourseController";
import { ControllerFactory } from "../../../controllers/controllerFactory";

const router = express.Router();
const programController = ControllerFactory.getController(
  "program"
) as ProgramController;

router.get("/", programController.getAll);

router.get("/:id", programController.get);

router.post("/", programController.create);

router.put("/:id", programController.update);

router.delete("/:id", programController.delete);

// **************************************************

const programCourseController = ControllerFactory.getController(
  "programCourse"
) as ProgramCourseController;

router.get("/:program_id/program_courses", programCourseController.getAll);

router.get("/:program_id/program_courses/:id", programCourseController.get);

router.post("/:program_id/program_courses", programCourseController.create);

router.put("/:program_id/program_courses/:id", programCourseController.update);

router.delete(
  "/:program_id/program_courses/:id",
  programCourseController.delete
);

// **************************************************

const levelController = ControllerFactory.getController(
  "level"
) as ProgramRelationsController;

router.get("/:program_id/levels", levelController.getAll);

router.get("/:program_id/levels/:id", levelController.get);

router.post("/:program_id/levels", levelController.create);

router.put("/:program_id/levels/:id", levelController.update);

router.delete("/:program_id/levels/:id", levelController.delete);

// **************************************************

const gradeController = ControllerFactory.getController(
  "grade"
) as ProgramRelationsController;

router.get("/:program_id/grades", gradeController.getAll);

router.get("/:program_id/grades/:id", gradeController.get);

router.post("/:program_id/grades", gradeController.create);

router.put("/:program_id/grades/:id", gradeController.update);

router.delete("/:program_id/grades/:id", gradeController.delete);

// **************************************************

const levelAllowedHourseController = ControllerFactory.getController(
  "levelAllowedHours"
) as ProgramRelationsController;

router.get(
  "/:program_id/level_allowed_hours",
  levelAllowedHourseController.getAll
);

router.get(
  "/:program_id/level_allowed_hours/:id",
  levelAllowedHourseController.get
);

router.post(
  "/:program_id/level_allowed_hours",
  levelAllowedHourseController.create
);

router.put(
  "/:program_id/level_allowed_hours/:id",
  levelAllowedHourseController.update
);

router.delete(
  "/:program_id/level_allowed_hours/:id",
  levelAllowedHourseController.delete
);

// **************************************************

const gpaAllowedHoursController = ControllerFactory.getController(
  "gpaAllowedHours"
) as ProgramRelationsController;

router.get("/:program_id/gpa_allowed_hours", gpaAllowedHoursController.getAll);

router.get("/:program_id/gpa_allowed_hours/:id", gpaAllowedHoursController.get);

router.post("/:program_id/gpa_allowed_hours", gpaAllowedHoursController.create);

router.put(
  "/:program_id/gpa_allowed_hours/:id",
  gpaAllowedHoursController.update
);

router.delete(
  "/:program_id/gpa_allowed_hours/:id",
  gpaAllowedHoursController.delete
);

export default router;
