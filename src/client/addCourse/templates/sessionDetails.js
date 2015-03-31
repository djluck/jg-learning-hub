Template.sessionDetails.helpers({
	canBeRemoved: function(){
		return !this.isFirst;
	},
	locations: function(){
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
});

Template.sessionDetails.events = {
	"click .btn-remove-session" : function(event, template){
		Sessions.removeSession(this);
	},
	"blur input, blur select" : function(event, template){
		var sessionId = template.data.tempId;
		var session = Sessions.getSession(sessionId);
		var fieldName = this.name;
		session[fieldName] = AutoForm.getFieldValue(fieldName, template.data.formId);
		Sessions.updateSession(session);
	}
}