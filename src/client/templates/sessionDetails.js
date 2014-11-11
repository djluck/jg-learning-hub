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
					value : e._id
				};
			}
		);
	}
});

Template.sessionDetails.events = {
	"click .btn-remove-session" : function(event, template){
		var sessions = Session.get(SessionsKey);
		delete sessions[this.tempId];
		Session.set(SessionsKey, sessions);
	},
	"blur input, blur select" : function(event, template){
		console.log(AutoForm.getFieldValue(template.data.formId, this.name));
		template.data[this.name] = AutoForm.getFieldValue(template.data.formId, this.name);
		var sessions = Session.get(SessionsKey);
		sessions[template.data.tempId] = template.data;
		Session.set(SessionsKey, sessions);
	}
}