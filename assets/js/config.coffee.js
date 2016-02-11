(function() {
  (function(global, $) {
    var __DEV__, __PROD__, config, env;
    __DEV__ = 'DEV';
    __PROD__ = 'PROD';
    env = global.location.hostname.search('localhost') === 0 ? __DEV__ : __PROD__;
    config = {
      'DEV': {
        base_url: 'https://dl.dropboxusercontent.com/u/122147773/',
        search_url: '//localhost:2368/assets/js/faker.js',
        detail_url: '//localhost:2368/assets/js/faker-detail.js'
      },
      'PROD': {
        base_url: 'https://dl.dropboxusercontent.com/u/122147773/',
        search_url: 'https://dl.dropboxusercontent.com/u/122147773/showcase/json/searchResult.json',
        detail_url: 'https://dl.dropboxusercontent.com/u/122147773/showcase/json/searchResultDetail.json'
      }
    };
    global._env = env;
    global._config = config[env];
    console.log(env);
    global._config.img_url = "https://www.dropbox.com/sh/xhmto6yekn6tqip/AADKlct4Cv5sfzUITcErB4pua?dl=0";
    global.get_query_params = function() {
      var i, key, len, params, query, raw_vars, ref, v, val;
      query = window.location.search.substring(1);
      raw_vars = query.split("&");
      params = {};
      for (i = 0, len = raw_vars.length; i < len; i++) {
        v = raw_vars[i];
        ref = v.split("="), key = ref[0], val = ref[1];
        params[key] = decodeURIComponent(val);
      }
      return params;
    };
    global.is_retina = function() {
      var mq;
      if (global.matchMedia) {
        mq = global.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return mq && mq.matches || global.devicePixelRatio > 1;
      }
    };
  })(window, jQuery);

}).call(this);
