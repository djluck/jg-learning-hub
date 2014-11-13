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
	}
});

Template.addCourse.events = {
	"click #btnAddCourse" : function(event, template){
		
		var isValid = AutoForm.validateForm("addCourse")
		_.each(Sessions.getSessions(), function(e){
			console.log(e);
			isValid = AutoForm.validateForm(e.formId) && isValid;
		});
		
		if (isValid){
			//insert course and session
		}
	}
}