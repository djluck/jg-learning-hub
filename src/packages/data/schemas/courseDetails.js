Schemas.CourseDetails = new SimpleSchema({
    title: {
        type: String,
        label: "Course title",
        min: 1
    },
    objectives: {
        type: String,
        label: "What's the objective of your course?",
        min: 1
    },
    intendedLearnings: {
        type: String,
        label : "What will people learn?",
        min: 1
    },
    suitableFor: {
        type: String,
        label: "Who should take this course?",
        min: 1
    },
    numberOfSpaces: {
        type: Number,
        label: "Number of spaces on your course",
        min: 1,
        max: 100
    },
    formatType: {
        type: String,
        label: "Please select a course type",
        min: 1
    },
    runByUserId: {
        type: String,
        autoValue: function(){
            if (this.isInsert && !this.isSet){
                return Meteor.userId();
            }
        }
    }
});