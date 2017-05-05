cordova.define("cordova-plugin-safariviewcontroller.SafariViewController", function(require, exports, module) {
  var exec = require("cordova/exec");
  var channel = require("cordova/channel");
  var channels = {
    exit: channel.create("exit"),
    loadstart: channel.create("loadstart"),
    loadError: channel.create("loaderror")
  };
  
  function eventHandler(event) {
    if (event && (event.type in channels)) {
      channels[event.type].fire(event);
    }
  }
  
  module.exports = {
    isAvailable: function (callback) {
      var errorHandler = function errorHandler(error) {
      // An error has occurred while trying to access the
      // SafariViewController native implementation, most likely because
      // we are on an unsupported platform.
      callback(false);
    };
    exec(callback, errorHandler, "SafariViewController", "isAvailable", []);
  },
  show: function (options, onSuccess, onError) {
    options = options || {};
    if (!options.hasOwnProperty('animated')) {
      options.animated = true;
    }
    exec(function(event) {
      if (onSuccess) {
        onSuccess.apply(null, arguments);
        onSuccess = null;
      }
      eventHandler(event);
    }, onError, "SafariViewController", "show", [options]);
    
  },
  hide: function (onSuccess, onError) {
    exec(onSuccess, onError, "SafariViewController", "hide", []);
  },
  addEventListener: function (eventname,f) {
    if (eventname in channels) {
      channels[eventname].subscribe(f);
    }
  },
  removeEventListener: function(eventname, f) {
    if (eventname in channels) {
      channels[eventname].unsubscribe(f);
    }
  },
  connectToService: function (onSuccess, onError) {
    exec(onSuccess, onError, "SafariViewController", "connectToService", []);
  },
  warmUp: function (onSuccess, onError) {
    exec(onSuccess, onError, "SafariViewController", "warmUp", []);
  },
  mayLaunchUrl: function (url, onSuccess, onError) {
    exec(onSuccess, onError, "SafariViewController", "mayLaunchUrl", [url]);
  }
};

});