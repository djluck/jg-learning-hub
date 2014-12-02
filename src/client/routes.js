Router.configure({
	layoutTemplate: "defaultLayout"
})

Router.route("/", function(){
	this.render("viewCourses");
});

Router.route("/add-course", function(){
	this.render("addCourse");
});

Router.route("/my-courses", function(){
	this.render("myCourses");
	this.render('viewMyCourses', {to: 'courseView'});
});

Router.route("/my-sessions", function(){
	this.render("myCourses");
	this.render('viewSessions', {
		to: 'courseView',
		data: function(){
			return {
				showCourseName : true,
				sessions : UserCourseDataService.getSessionsSignedUpTo(Meteor.user())
			};
	 	}
 	});
});

Router.route("/edit-course/:_id", function(){
	this.render("addCourse",  {
		data: function(){
			return {
				course : CourseDataService.getCourse(this.params._id)
			}
		},
		waitOn: function () {
			// return one handle, a function, or an array
			return Meteor.subscribe('Courses', this.params._id);
		},
	});
});
