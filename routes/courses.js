const express = require('express');
const router =  express.Router();
const {validateCourse, listCourses} = require('../model/course');


router.get('/', (req, res)=>{
    // res.send(req.params.id);
    res.send(listCourses);
});


router.get('/:id', (req, res)=>{
    // res.send(req.params.id);
    const course = listCourses.find(value => value.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});
/*
router.get('/api/posts/:year/:month', (req, res)=>{
    res.send(req.params);
});
*/
router.post('/', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) {
        // 400 Bad Request
        return  res.status(400).send(error.details[0].message);
    }
    const course = {
        id: listCourses.length + 1,
        name: req.body.name
    };
    listCourses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = listCourses.find(value => value.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    }
    const { error } = validateCourse(req.body);
    if (error) {
        // 400 Bad Request
        return  res.status(400).send(error.details[0].message);
    }
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = listCourses.find(value => value.id === parseInt(req.params.id));
    if (!course) return  res.status(404).send('The course with the given ID was not found');
    const index = listCourses.indexOf(course);
    listCourses.splice(index, 1);
    res.send(course);
});

module.exports = router;