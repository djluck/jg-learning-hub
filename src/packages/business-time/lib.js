BusinessTime = {};

function requireAdministrator(userId){
    if (!Roles.userIsInRole(userId, "administrator"))
        throw new Meteor.Error("NotAuthorized", "Must be an administrator to carry out this action");
}