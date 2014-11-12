Template.addCourse.courseFormats = function(){
	return _.map(
		Collections.CourseFormats.find().fetch(),
		function(e){
			return { 
				label: e.type, 
				value: e.type
			};
		}
	);
};

Template.addCourse.events = {
	"click #btnAddCourse" : function(event, template){
		
		var isValid = AutoForm.validateForm("addCourse")
		_.each(Sessions.getSessions(), function(e){
			isValid = isValid && AutoForm.validateForm(e.formId)	
		});
		
		if (isValid){
			//insert course and session
		}
	}
}

Template.sessionDetails.locations = function(){
	return _.map(
		Collections.Locations.find().fetch(), 
		function(e){
			return {
				label : e.name,
				value : e.name
			};
		}
	);
}

Template.sessionDetails.canBeRemoved = function(){
	return !this.isFirst;
}