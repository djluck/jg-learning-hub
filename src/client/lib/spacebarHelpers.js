Template.time.helpers({
	time : function(){
		return DateTimeHelpers.time(this);
	}
});

Template.date.helpers({
	date : function() {
		return DateTimeHelpers.date(this);
	}
});