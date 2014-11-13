Template.viewSessionDetails.helpers({
	sessions : function(){
		return Service.getSessions(this.sessionIds);
	}
});