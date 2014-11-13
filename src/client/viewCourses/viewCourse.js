Template.viewCourse.helpers({
	sessionIdentifiers : function(){
		console.log(this.sessionIds);
		return _.map(this.sessionIds, function(id){
			return { id : id}
		});
	}
});