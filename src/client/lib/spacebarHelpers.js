

Template.moment.helpers({
	formattedDate : function() {
		return moment(this.date).format(this.format);
	}
});
