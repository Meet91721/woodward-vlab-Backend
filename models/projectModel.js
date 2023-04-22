const mongoose = require('mongoose');

const projectModel = mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    aim: {
        type: String,
        required: [true, "Aim does not exist"]
    },
    theory: {
        type: String,
        required: [true, "theory does not exist"]
    },
    procedure: {
        type: String,
        required: [true, "procedure does not exist"]
    },
    quiz: {
        type: String,
        required: [true, "quiz does not exist"]
    },
    assignment: {
        type: String,
        required: [true, "assignment does not exist"]
    },
    reference: {
        type: String,
        required: [true, "reference does not exist"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectModel);