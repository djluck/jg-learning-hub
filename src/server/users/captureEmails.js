Accounts.onCreateUser(function(options, user) {
    //This is the default implementation of onCreateUser(). Retain this as it is used to copy a user's name, etc.
    if (options.profile)
        user.profile = options.profile;

    //Copy the .emails option as well.
    if (options.emails)
        user.emails = options.emails;

    return user;
});