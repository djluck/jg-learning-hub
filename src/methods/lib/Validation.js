Validation = {
    requireUser : requireUser,
    requireAdministrator : requireAdministrator,
    isMongoId : isMongoId
};

function requireUser(userId){
    if (userId === null)
        Meteor.Error("NotAuthenticated", "Requires an authenticated user");
    }

function requireAdministrator(userId){
    if (!Roles.userIsInRole(userId, "administrator"))
        Meteor.Error("NotAuthorized", "Must be an administrator to carry out this action");
}

function isMongoId(id){
    var nonEmptyString = Match.Where(function (x) {
        check(x, String);
        return x.length > 0;
    });

    check(id, nonEmptyString);
}
