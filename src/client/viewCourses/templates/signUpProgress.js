Template.signUpProgress.helpers({
	numberUsersSignedUp: numberUsersSignedUp,
	percentagePlacesFree: function(){
		return percentagePlacesFree.apply(this)
	},
	progressClass : function(){
		return progressClass.apply(this);
	}
})

function numberUsersSignedUp(){
	return this.signedUpUserIds.length;
}

var percentagePlacesFree = function(){
	var signedUp = numberUsersSignedUp.apply(this);
	if (signedUp === 0)
		return 100;
	else
		return 100 - ((this.signedUpUserIds.length / this.details.numberOfSpaces) * 100);
}

var progressClass = function(){
	var percentageFree = percentagePlacesFree.apply(this);

	if (percentageFree > 50)
		return "progress-bar-success";
	else if (percentageFree > 0)
		return "progress-bar-warning";
	else
		return "progress-bar-danger";
}