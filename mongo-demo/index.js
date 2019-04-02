 const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Connected to Mongodb'))
    .catch(err => console.error('couldnt connect',err ));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default: Date.now },
    isPubished: Boolean,
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse(){
const course =new Course({
    name: 'ANgular Course',
    author: 'me',
    tags: ['Angular', 'frontend'],
    isPublished: true,
});

const result = await course.save();
console.log(result);
}

function getCourses(){
    Course.find()
        .limit(10)
        .sort({name: 1})
        .select({name:1, author:1})
         
        .then(courses => console.log(courses))
        .catch(err => console.log(error)); 

} 
getCourses();

