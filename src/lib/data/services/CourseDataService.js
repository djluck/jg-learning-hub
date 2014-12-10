CourseDataService = {
	createCourse : createCourse,
	updateCourse : updateCourse,
	getCourses : getCourses,
	getCourse : getCourse,
	getCourseCount : getCourseCount,
	approveCourse : approveCourse
};


function getCourseCount(){
	return Collections.Courses.find().count();
}

function getCourse(courseId){
	return Collections.Courses.findOne(courseId);
}

function getCourses(){
	return Collections.Courses.find(
		{},
		{ sort : { startsAt : 1 } }
	);
}

function createCourse(details, sessions){
	var toInsert = {
		details : details,
		sessions : sessions
	};
	Meteor.wrapAsync(Collections.Courses.insert.bind(Collections.Courses, toInsert));
}

function updateCourse(id, details, sessions){
	var modifier = 	{
		$set: { details : details,  sessions : sessions }
	};
	Meteor.wrapAsync(Collections.Courses.update.bind(Collections.Courses, id, modifier));
}

function approveCourse(id){
	var modifier = { $set : { "approved" : true }};
	Meteor.wrapAsync(Collections.Courses.update.bind(Collections.Courses, id, modifier));
}
