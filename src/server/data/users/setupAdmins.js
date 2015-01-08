Accounts.onLogin(function(details) {
    var user = details.user;
    if (isPotentialAdminUser(user)) {
        console.log(_.sprintf("Making %s an administrator", user.profile.name));
        Roles.addUsersToRoles(user, ["administrator"]);
    }
    else if (Roles.userIsInRole(user, "administrator")){
        console.log(_.sprintf("User %s is already an administrator", user.profile.name));
    }
});


function isPotentialAdminUser(user){
    var validUserEmails = ["james.luck@justgiving.com", "emily@justgiving.com"];
    return _.contains(validUserEmails, user.emails[0].address.toLowerCase()) && !Roles.userIsInRole(user, "administrator");
}

