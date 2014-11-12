

Template.addSessions.created = function(){
	Sessions.initSessions();
}

Template.addSessions.events = {
	"click #btnAddSession" : function(event, template){
		Sessions.addNewEmptySession();
	}
}

Template.addSessions.helpers({
	sessions : Sessions.getSessions
})
