(function() {
  (function($) {
    var get_query_params;
    $(document).ready(function() {
      var p;
      console.log(p);
      p = get_query_params();
    });
    get_query_params = function() {
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
  })(jQuery);

}).call(this);
