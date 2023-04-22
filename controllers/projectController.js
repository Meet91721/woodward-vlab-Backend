const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');

// @desc Get project
// @route GET /api/project/:id
// @access private
const getProject = asyncHandler(async(req, res) => {
    const requiredProject = await Project.findOne({projectId: (req.params.id).toString()});
    if(!requiredProject){
        res.status(400);
        throw new Error("Project not found");
    }
    res.status(200).json(requiredProject);
})

// @desc Add a project
// @route POST /api/project/:id
// @access private
const postProject = asyncHandler(async(req, res) => {
    const aim = "This is new aim";
    const projectId = req.params.id;
    const theory = "This is new theory";
    const quiz = "This is new quiz";
    const procedure = "This is new procedure";
    const name = "This is project name"
    const project = await Project.create({
        projectId,aim,theory,quiz,procedure, name
    });
    res.status(201).json(project);
})

module.exports = {getProject, postProject};