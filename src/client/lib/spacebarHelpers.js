Template.time.helpers({
	time : function(){
		return this.getHours() + ":" + this.getMinutes();
	}
});

Template.date.helpers({
	date : function(){
		return this.toDateString();
	}
});