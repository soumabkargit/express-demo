const express = require('express');
const app = new express();
const Joi = require('joi');
var _ = require('underscore');
const logger = require('./logger');

app.use(express.json()); // req.body
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);


var result = _.contains([1,2,3],2);
console.log(result);

app.get('/', (req, res)=>{
res.send('Hello World');
});

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
];

app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res)=>{
   // res.send(req.params.id);
    const course = courses.find(value => value.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res)=>{
    res.send(req.params);
});

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) {
        // 400 Bad Request
        return  res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(value => value.id === parseInt(req.params.id));
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

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(value => value.id === parseInt(req.params.id));
    if (!course) return  res.status(404).send('The course with the given ID was not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return result = Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
 app.listen(3000, ()=> console.log(`Listening on port ...${port}`));

