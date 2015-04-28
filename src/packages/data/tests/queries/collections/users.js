Tinytest.add("findAdmins should return only administrative users", function(test){
    arrangeUsers();

    test.length(Meteor.users.queries.findAdmins().fetch(), 2);
})

function arrangeUsers(){
    Meteor.users.remove({});

    Accounts.createUser({
        email: "test1@test.com",
        password: "normaluser#1"
    });
    Accounts.createUser({
        email: "test2@test.com",
        password: "normaluser#2"
    });
    var adminId1 = Accounts.createUser({
        email: "test3@test.com",
        password: "adminuser#1"
    });

    var adminId2 = Accounts.createUser({
        email: "test4@test.com",
        password: "adminuser#2"
    });

    Roles.addUsersToRoles([adminId1, adminId2], ["administrator"]);
}