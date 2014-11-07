Template.addCourse.courseFormats = function(){
	return _.map(
		Collections.CourseFormats.find().fetch(),
		function(e){
			return { 
				label: e.type, 
				value: e._id
			};
		}
	);
}

Template.sessionDetails.locations = function(){
	return _.map(
		Collections.Locations.find().fetch(), 
		function(e){
			return {
				label : e.name,
				value : e._id
			};
		}
	);
}

Template.sessionDetails.canBeRemoved = function(){
	return !this.isFirst;
}