Meteor.startup(function(){

})

function addDepartments(){
	addIfEmpty(Collections.Department, [
		{ 
			name : "Marketplace"
		},
		{ 
			name : "The Garage"
		},
		{ 
			name : "Secret Room"
		}
	])
}

function addLocations(){
	addIfEmpty(Collections.Location, [
		{ 
			name : "Marketplace"
		},
		{ 
			name : "The Garage"
		},
		{ 
			name : "Secret Room"
		}
	])
}

function addCourseFormats(){
	addIfEmpty(Collections.CourseFormat, [
		{ 
			type : "Debate"
		},
		{ 
			type : "Workshop"
		},
		{ 
			type : "Classroom"
		},
		{ 
			type : "Coaching"
		}
	])
}

function addIfEmpty(collection, toAdd){
	if (collection.find().count() === 0){
		_.each(toAdd, function(e){
			Rooms.insert(e);
		}); 
	}
}