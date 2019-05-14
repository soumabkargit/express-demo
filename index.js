var _ = require('underscore');
var result = _.contains([1,2,3],2);
console.log(result);

const express = require('express');
const app = new express();
app.get('/', (req, res)=>{
res.send('Hello World');
});

app.get('/api/courses', (req, res)=>{
    res.send([1,2,3]);
});
 app.listen(3000, ()=> console.log('Listening on port 3000'));

