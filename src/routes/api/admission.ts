import { AdmissionController } from "../../controllers/admissionController";
import { uploadSingle, validateCsv, csvToJson } from "../../middleware/csv";
import express from "express";
import { ControllerFactory } from "../../controllers/controllerFactory";

const router = express.Router();
const admissionController = ControllerFactory.getController(
  "admission"
) as AdmissionController;

// router.get("/all/:collegeId", ac.getAll);

router.get("/:id", admissionController.get);

router.post("/", admissionController.create);

// router.post("/bulk", uploadSingle, validateCsv, csvToJson, ac.bulk);

router.post(
  "/many",
  uploadSingle,
  validateCsv,
  csvToJson,
  admissionController.createMany
);

router.put("/:id", admissionController.update);

router.delete("/:id", admissionController.delete);

export default router;
