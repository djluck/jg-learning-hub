DateTimeHelpers = {
	date : function(date){
		return date.toDateString();
	},
	time : function(date){
		return date.getHours() + ":" + date.getMinutes();
	},
	dateAndTime : function(date){
		return DateTimeHelpers.date(date) +  ", " + DateTimeHelpers.time(date);
	}
}