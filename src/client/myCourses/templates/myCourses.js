var views = [
	{ 
		name : "Courses",
		url : "/my-courses"
	},
	{ 
		name : "Sessions",
		url : "/my-sessions"
	}
]

Template.myCourses.helpers({
	viewOptions : function(){
		return _.map(
			views,
			function(view){
				view.isActive = Router.current().route.path() === view.url;
				return view;
			}
		);
	}
})