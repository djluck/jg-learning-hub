Meteor.startup(function(){
    addDepartments();
    addLocations();
    addCourseFormats();
})

function addDepartments(){
    addIfEmpty(Collections.Departments, [
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
    addIfEmpty(Collections.Locations, [
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
    addIfEmpty(Collections.CourseFormats, [
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
            collection.insert(e);
        }); 
    }
}