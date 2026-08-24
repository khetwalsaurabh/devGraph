import express from "express";
import { addDeveloper, addSkillForDeveloper, getSkills, getRelatedSkillsForDeveloper, getTechnologiesForDeveloper, getDeveloperDetails } from "../controller/developerController.js";

const router = express.Router();

router.post("/developers", addDeveloper);
router.post("/skills", addSkillForDeveloper);
router.get("/developers/:name/skills", getSkills);
router.get("/developers/:name/related-skills", getRelatedSkillsForDeveloper);
router.get(
    "/developers/:name/technologies",
    getTechnologiesForDeveloper
);
router.get(
    "/developers/:name",
    getDeveloperDetails
);


export default router;