const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not Connect',err));
const courseschema= new mongoose.Schema({
tags:[String],
date:Date,
name: String,
author: String,
isPublished:Boolean,
price:Number,
}); 
const Course = mongoose.model('Course', courseschema);
/*   
async function getCourses(){
Course.find({isPublished: true, tags:'backend'})
    .limit(10)
    .sort({name:1})
    .select({name:1,author:1})
    .then(course => console.log(course))
    .catch(err => console.log(err)); 


}
getCourses();
async function getCourses(){
    Course.find({isPublished: true, tags: {$in: ['backend','frontend']}})
        .limit(10)
        .sort({price:-1})
        .select({name:1,author:1,price:1})
        .then(course => console.log(course))
        .catch(err => console.log(err)); 
    
    
    }
getCourses();

async function getCourses(){
Course.find({isPublished: true  })  
        .or([
            {name: /.*by.*//*},
            {price: {$gte:15}}
        ])

        .limit(10)
        .sort({price:-1})
        .select({name:1,author:1,price:1})
        .then(course => console.log(course))
        .catch(err => console.log(err)); 
    
    
    }
getCourses();*/
async function updateCourse(){
    const course =  await Course.findById(id);
    if(!course)return;
    course.isPublished=true;
    course.author ='Another Author';
    course.save();
}
updateCourse('5a68fdf95db93f6477053ddd');
