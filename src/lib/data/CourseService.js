CourseService = {
	createCourse : createCourse,
	updateCourse : updateCourse,
	getCourses : getCourses,
	getCourse : getCourse,
	getCourseCount : getCourseCount
};


function getCourseCount(){
	return Collections.Courses.find().count();
}

function getCourse(courseId){
	return Collections.Courses.findOne(courseId);
}

function getCourses(){
	return Collections.Courses.find();
}

function createCourse(course){
	return Collections.Courses.q.insert(course);
}

function updateCourse(course){
	var id = course._id;
	return Collections.Courses.q.update(course._id, course, { validate : false });
}
