Router.configure({
	layoutTemplate: "defaultLayout"
})

Router.route("/", function(){
	this.render("viewCourses");
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
				sessions : Meteor.user().getSessionsSignedUpTo()
			};
	 	}
 	});
});

Router.route("/edit-course/:_id", function(){
	this.render("addCourse",  {
		data: function(){
			var course = Collections.Courses.findOne(courseId);
			if (!course)
				return {};

			Deps.nonreactive(function(){
				Sessions.initSessions(course.sessions);
			});
			return {
				course : course,
				isEditing: true
			};
		}
	});
});

Router.route("/add-course", {
	name : "addCourse",
	data : function(){
		Deps.nonreactive(function(){
			Sessions.initSessions();
		});

		return {
			course : {
				details : {
					title : "", //return a dummy title to clear out previous data
					runByUserId : Meteor.userId()
				}
			},
			isEditing: false
		}
	}
});