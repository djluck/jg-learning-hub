var links = [
	{
		name : "Available courses",
		urls : ["/"],
		isVisible : function(){
			return true;
		},
		badgeCount : function(){
			return CourseDataService.getCourseCount();
		}
	},
	{
		name : "My courses",
		urls : ["/my-courses", "/my-sessions"], //we accept arrays so that multiple links can have a menu option marked as active
		isVisible : function(){
			return Meteor.userId() !== null;
		},
		badgeCount : function(){
			return UserCourseDataService.countCoursesSignedUpTo(Meteor.user());
		}
	}
];

Template.nav.helpers({
	links : function(){
		var visibleLinks = _.filter(links, function(link){
			return link.isVisible();
		});

		return _.map(
			visibleLinks,
			function(link){
				link.isActive = _.contains(link.urls, Router.current().route.path());
				link.url = link.urls[0]; //render first URL as the main link
				return link;
			}

		);
	},
	isCreateCourseActive : function(){
		return Router.current().route.path() === "/add-course";
	}
});
