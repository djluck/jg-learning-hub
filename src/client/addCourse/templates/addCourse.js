var formId = "addCourseDetails";

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
	sessions : Sessions.getSessions,
	users : function(){
		return _.sortBy(Meteor.users.find().map(function(u){
			return {
				value : u._id,
				label : u.profile.name
			};
		}), "label");
	}
});

Template.addCourse.events = {
	"click #btnAddCourse" : function(event, template){
		if (!validateCourseDetailsAndSessions()){
			return false;
		}

		if (this.isEditing){
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
		.then(function(course){
		 	Router.go('/');
		})
		.done();
}

function updateCourse(course){
	var courseDetails = AutoForm.getFormValues(formId).insertDoc;
    courseDetails.runByUserId = courseDetails.runByUserId || Meteor.userId();
	var sessions = Sessions.getSessionsReadyForStorage();

	Methods
		.modifyCourse(course._id, courseDetails, sessions)
		.then(function(course){
			Router.go('/');
		})
		.done();
}