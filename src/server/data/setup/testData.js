TestData = {};

TestData.Courses = {
    data : data,
    after : setupSubscriptions
}

var locationName = "Marketplace"; //don't care about this yet,
var formatType = "Debate";

function data(){
    var userEmailsToIds = {};
    Meteor.users.find().forEach(function(user){
        userEmailsToIds[user.emails[0].address] = user._id;
    });

    return [
        //finished (should not be visible)
        {
            approved : true,
            details : {
                objectives : "Shouldn't see this",
                title:  "Shouldn't see this",
                suitableFor:  "Shouldn't see this",
                numberOfSpaces: 3,
                formatType : formatType,
                runByUserId: userEmailsToIds["teacher@test.com"]
            },
            sessions : [
                {
                    locationName : locationName,
                    durationMinutes : 90,
                    startsAt : moment().subtract(3, "days").toDate()
                }
            ],
            createdByUserId : userEmailsToIds["teacher@test.com"]
        },
        //has started (cannot sign up for)
        {
            approved : true,
            details : {
                objectives : "Shouldn't be able to sign up for this one",
                title:  "Has started",
                suitableFor:  "Anyone",
                numberOfSpaces: 3,
                formatType : formatType,
                runByUserId: userEmailsToIds["teacher@test.com"]
            },
            sessions : [
                {
                    //this session has finished
                    locationName : locationName,
                    durationMinutes : 60,
                    startsAt : moment().add(1, "days").toDate()
                },
                {
                    //this session has yet to occur
                    locationName : locationName,
                    durationMinutes : 60,
                    startsAt : moment().subtract(3, "days").toDate()
                }
            ],
            createdByUserId : userEmailsToIds["teacher@test.com"],
            signedUpUserIds : [ //one space still available
                userEmailsToIds["pupil1@test.com"],
                userEmailsToIds["pupil2@test.com"]
            ]
        },
        //has not started but not approved
        {
            approved : false,
            details : {
                objectives : "Shouldn't be able to see this course unless you are an admin or the course creator",
                title:  "Course not yet approved",
                suitableFor:  "Anyone",
                numberOfSpaces: 3,
                formatType : formatType,
                runByUserId: userEmailsToIds["teacher@test.com"]
            },
            sessions : [
                {
                    locationName : locationName,
                    durationMinutes : 60,
                    startsAt : moment().add(15, "days").toDate()
                }
            ],
            createdByUserId : userEmailsToIds["teacher@test.com"]
        },
        //has not started, no sign ups
        {
            approved : true,
            details : {
                objectives : "This course has 3 spaces left.",
                title:  "Approved but not yet signed up to",
                suitableFor: "Anyone",
                numberOfSpaces: 3,
                formatType : formatType,
                runByUserId: userEmailsToIds["teacher@test.com"]
            },
            sessions : [
                {
                    locationName : locationName,
                    durationMinutes : 60,
                    startsAt : moment().add(6, "days").toDate()
                },
                {
                    locationName : locationName,
                    durationMinutes : 60,
                    startsAt : moment().add(5, "days").toDate()
                }
            ],
            createdByUserId : userEmailsToIds["teacher@test.com"]
        },
        //not started but no space
        {
            approved : true,
            details : {
                objectives : "Shouldn't be able to sign up to this course",
                title:  "Not yet started but full",
                suitableFor:  "Anyone",
                numberOfSpaces: 3,
                formatType : formatType,
                runByUserId: userEmailsToIds["teacher@test.com"]
            },
            sessions : [
                {
                    locationName : locationName,
                    durationMinutes : 60,
                    startsAt : moment().add(3, "days").toDate()
                },
                {
                    locationName : locationName,
                    durationMinutes : 30,
                    startsAt : moment().add(10, "days").toDate()
                },
                {
                    locationName : locationName,
                    durationMinutes : 30,
                    startsAt : moment().add(5, "days").toDate()
                }
            ],
            createdByUserId : userEmailsToIds["teacher@test.com"],
            signedUpUserIds : [ //one space still available
                userEmailsToIds["pupil1@test.com"],
                userEmailsToIds["pupil2@test.com"],
                userEmailsToIds["pupil3@test.com"]
            ]
        },
        //not started and one space
        {
            approved : true,
            details : {
                objectives : "One lucky devil can sign up for this course",
                title:  "Not started but room for one more!",
                suitableFor:  "Anyone",
                numberOfSpaces: 3,
                formatType : formatType,
                runByUserId: userEmailsToIds["teacher@test.com"]
            },
            sessions : [
                {
                    locationName : locationName,
                    durationMinutes : 60,
                    startsAt : moment().add(2, "days").toDate()
                }
            ],
            createdByUserId : userEmailsToIds["teacher@test.com"],
            signedUpUserIds : [ //one space still available
                userEmailsToIds["pupil1@test.com"],
                userEmailsToIds["pupil2@test.com"]
            ]
        }
    ];
}

function setupSubscriptions(){
    console.log("Setting up subs");
    _.each(
        Collections.Courses.find().fetch(),
        function(course){
            //sign up signed up user to this course
            _.each(
                course.signedUpUserIds,
                function(userId){
                    console.log("uid: " + userId + ", cid:" + course._id);
                    var user = Meteor.users.findOne(userId);
                    Meteor.users.signUpUserToCourse(user, course._id);
                }
            );
        }
    )
}
