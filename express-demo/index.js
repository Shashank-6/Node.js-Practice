const startupDebuger  = require('debug')('app:startup');
const Joi = require('joi');
const config = require('config')
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');  

startupDebuger('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log(process.env.NODE_ENV);
console.log(app.get('env'));

const courses = [
 {id:1, name: 'course1'},
 {id:2, name: 'course2'},
 {id:3, name: 'course3'},
];
app.get('/', (req,res)=>{
    res.render('index', {title:'My app', message: 'Hello World'}) ;
});
app.get('/api/courses', (req,res)=>{ 
    res.send(courses);
});
app.post('/api/courses',(req,res)=>{
    const schema ={
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema );
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
 
     const course = {
         id: courses.length + 1,
         name: req.body.name
        };
        courses.push(course);
        res.send(course);
});
app.get('/api/courses/:id', (req,res)=>{
   const course = courses.find(c => c.id === parseInt(req.params.id))
   if(!course){res.status(404).send('Not Found');return;}
   res.send(course);
});
app.put('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){res.status(404).send('Not Found');return;}
    

    const schema ={
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema );
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});
app.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){res.status(404).send('Not Found');return;}

    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course); 
})
const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`Listening on port ${port}`));