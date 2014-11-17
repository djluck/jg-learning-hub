var formId = "addCourse";

Template.addCourse.rendered = function(){
	console.log(this.data.course);
	if (this.data.course){
		Sessions.initSessions(CourseService.getSessions(this.data.course.sessionIds));
	}
	else{
		Sessions.initSessions();
	}
}

Template.addCourse.helpers({
	courseFormats : function(){
		return _.map(
			Collections.CourseFormats.find().fetch(),
			function(e){
				return { 
					label: e.type, 
					value: e.type
				};
			}
		);
	},
	formId : formId,
	sessions : Sessions.getSessions
});

Template.addCourse.events = {
	"click #btnAddCourse" : function(event, template){
		if (!validateCourseAndSessions()){
			return false;
		}
		
		createCourseAndSession();

		return true;
	},
	"click #btnAddSession" : function(event, template){
		Sessions.addNewEmptySession();
	}
}

function validateCourseAndSessions(){
	var isValid = AutoForm.validateForm("addCourse")
	console.log(AutoForm.getValidationContext("addCourse"));
	_.each(Sessions.getSessions(), function(e){
		isValid = AutoForm.validateForm(e.formId) && isValid;
		console.log(AutoForm.getValidationContext(e.formId));
	});

	

	return isValid;
}

function createCourseAndSession(){
	var course = AutoForm.getFormValues("addCourse").insertDoc;
	var sessions = Sessions.getSessionsReadyForStorage();

	CourseService.addCourseAndSessions(course, sessions)
		.then(function(course){
		 	Router.go('/');
		})
		.done();;
}