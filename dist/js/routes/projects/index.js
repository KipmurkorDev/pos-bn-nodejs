"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_1 = require("../../controllers/projects");
const router = (0, express_1.Router)();
router.get("/projects", projects_1.getProjects);
router.post("/add-project", projects_1.addProject);
router.put("/edit-project/:id", projects_1.updateProject);
router.delete("/delete-project/:id", projects_1.deleteProject);
exports.default = router;