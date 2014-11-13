Router.configure({
	layoutTemplate: "defaultLayout"
})

Router.route("/", function(){
	this.render("viewCourses");
});

Router.route("/add-course", function(){
	this.render("addCourse");
});