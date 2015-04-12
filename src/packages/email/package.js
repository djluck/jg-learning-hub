Package.describe({
  name: 'jg-learninghub-email'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use("email");
    api.imply(['jg-learninghub-common', 'email']);
    api.addFiles('learningHubEmail.js');
});