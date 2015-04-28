Package.describe({
  name: 'jg-learninghub-common'
});

Package.onUse(function(api) {
    api.addFiles(['log.js']);
    api.versionsFrom('1.1.0.2');
    api.imply('underscore');
    api.export("MyLog");
});