Template.signUpProgress.helpers({
	numberUsersSignedUp: numberUsersSignedUp,
	percentagePlacesFree: percentagePlacesFree
})

function numberUsersSignedUp(){
	return this.signedUpUserIds.length;
}

function percentagePlacesFree(){
	var numberUsersSignedUp = this.signedUpUserIds.length;
	if (numberUsersSignedUp === 0)
		return 100;
	else
		return (this.signedUpUserIds.length / this.details.numberOfSpaces) * 100;
}