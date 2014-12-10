var formId = "addCourseDetails";

Template.addCourse.rendered = function(){
	console.log(this.data);
	console.log(isEditing(this.data));
	if (isEditing(this.data)){
		Sessions.initSessions(this.data.course.sessions);
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
		if (!validateCourseDetailsAndSessions()){
			return false;
		}

		if (isEditing(this)){
			updateCourse(this.course);
		}
		else{
			createCourse();
		}

		return true;
	},
	"click #btnAddSession" : function(event, template){
		Sessions.addNewEmptySession();
	}
}

function validateCourseDetailsAndSessions(){
	var isValid = AutoForm.validateForm(formId)
	//console.log(AutoForm.getValidationContext(formId));
	_.each(Sessions.getSessions(), function(e){
		isValid = AutoForm.validateForm(e.formId) && isValid;
		//console.log(AutoForm.getValidationContext(e.formId));
	});

	return isValid;
}

function createCourse(){
	var courseDetails = AutoForm.getFormValues(formId).insertDoc;
	var sessions = Sessions.getSessionsReadyForStorage();

	Methods.createCourse(courseDetails, sessions)
		.createCourse(courseDetails, sessions)
		.then(function(course){
		 	Router.go('/');
		})
		.done();
}

function updateCourse(course){
	var courseDetails = AutoForm.getFormValues(formId).insertDoc;
	var sessions = Sessions.getSessionsReadyForStorage();

	CourseDataService
		.updateCourse(course._id, courseDetails, sessions)
		.then(function(course){
			Router.go('/');
		})
		.done();
}

function isEditing(data){
	return data && data.course;
}
