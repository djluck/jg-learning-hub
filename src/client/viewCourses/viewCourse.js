Template.viewCourse.helpers({
	sessionIdentifiers : function(){
		console.log(this.sessionIds);
		return _.map(this.sessionIds, function(id){
			return { id : id}
		});
	},
	noUser: function(){
		return Meteor.user() === null;
	},
	isSignedUp: function(){
		return SignUpService.isSignedUp(this._id);
	}
});

Template.viewCourse.events = {
	"click .btn-sign-up" : function(event, template){
		if (SignUpService.isSignedUp(this._id)){
			SignUpService.resignFromCourse(this._id);
		}
		else{
			SignUpService.signUpToCourse(this._id);
		}
	}
}