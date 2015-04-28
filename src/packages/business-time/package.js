Package.describe({
  name: 'jg-learninghub-business-time'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['jg-learninghub-common', 'jg-learninghub-data', 'email']);
});