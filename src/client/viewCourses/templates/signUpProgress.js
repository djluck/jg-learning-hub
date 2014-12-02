Template.signUpProgress.helpers({
	numberUsersSignedUp: numberUsersSignedUp,
	percentagePlacesFree: function(){
		return percentagePlacesFree.apply(this)
	},
	progressClass : function(){
		return progressClass.apply(this);
	},
	isFull: function(){
		return Rules.Courses.isCourseFull(this);
	}
})

function numberUsersSignedUp(){
	return this.signedUpUserIds.length;
}

var percentagePlacesFree = function(){
	if (Rules.Courses.isCourseFull(this))
		return 100; //return a full, red progress bar

	var signedUp = numberUsersSignedUp.apply(this);
	if (signedUp === 0)
		return 100;
	else
		return 100 - ((this.signedUpUserIds.length / this.details.numberOfSpaces) * 100);
}

var progressClass = function(){
	if (Rules.Courses.isCourseFull(this))
		return "progress-bar-danger";

	var percentageFree = percentagePlacesFree.apply(this);

	if (percentageFree > 50)
		return "progress-bar-success progress-bar-striped";
	else
		return "progress-bar-warning progress-bar-striped";

}
