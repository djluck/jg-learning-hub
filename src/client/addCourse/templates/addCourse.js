var formId = "addCourse";

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
	formId : formId
});

Template.addCourse.events = {
	"click #btnAddCourse" : function(event, template){
		if (!validateCourseAndSessions()){
			return false;
		}

		createCourseAndSession();

		return true;
	}
}

function validateCourseAndSessions(){
	var isValid = AutoForm.validateForm("addCourse")
	_.each(Sessions.getSessions(), function(e){
		isValid = AutoForm.validateForm(e.formId) && isValid;
		return console.log(isValid);
	});

	return isValid;
}

function createCourseAndSession(){
	var course = AutoForm.getFormValues("addCourse").insertDoc;
	var sessions = Sessions.getSessionsReadyForStorage();
	console.log("Sesssopns");
	console.log(sessions);
	Service.addCourseAndSessions(course, sessions);
}