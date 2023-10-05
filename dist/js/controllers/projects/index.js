"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.addProject = exports.getProjects = void 0;
const projects_1 = __importDefault(require("../../models/projects"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projects_1.default.find();
        res.status(200).json({ projects });
    }
    catch (error) {
        throw error;
    }
});
exports.getProjects = getProjects;
const addProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const project = new projects_1.default({
            name: body.name,
            description: body.description,
            link: body.link,
        });
        const newProject = yield project.save();
        const allProjects = yield projects_1.default.find();
        res
            .status(201)
            .json({ message: "Project added", project: newProject, projects: allProjects });
    }
    catch (error) {
        throw error;
    }
});
exports.addProject = addProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateProject = yield projects_1.default.findByIdAndUpdate({ _id: id }, body);
        const allProjects = yield projects_1.default.find();
        res.status(200).json({
            message: "Project updated",
            project: updateProject,
            projects: allProjects,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProject = yield projects_1.default.findByIdAndRemove(req.params.id);
        const allProjects = yield projects_1.default.find();
        res.status(200).json({
            message: "Project deleted",
            project: deletedProject,
            projects: allProjects,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteProject = deleteProject;
