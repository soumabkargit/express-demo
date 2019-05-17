const Joi = require('joi');
const listCourses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
];

const validateCourse= function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return result = Joi.validate(course, schema);
};

exports.validateCourse = validateCourse;
exports.listCourses = listCourses;
