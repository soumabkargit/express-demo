var _ = require('underscore');
var result = _.contains([1,2,3],2);
console.log(result);

const express = require('express');
const app = express();
app.use(express.json());

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
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res)=>{
    res.send(req.params);
});

app.get('/api/postsQuery/:year/:month', (req, res)=>{
    res.send(req.query);
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        // 400 Bad Request
        res.status(400).send('Name is required and should be minimun  3 characters')
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
 app.listen(3000, ()=> console.log(`Listening on port ...`));

