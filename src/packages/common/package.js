Package.describe({
  name: 'jg-learninghub-common'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.imply('underscore');
  api.addFiles('log.js');
});