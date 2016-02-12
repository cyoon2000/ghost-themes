(function() {
  (function($) {
    var _missing, render_results_tile, search, validate;
    $(document).ready(function() {
      $('.input-group.date').datepicker({
        maxViewMode: 0,
        orientation: "bottom auto",
        todayHighlight: true,
        toggleActive: true
      });
      search(false);
      $('button#btn_search').click(function(e) {
        search();
      });
    });
    validate = function() {
      var from_d, to_d;
      from_d = $('input#from_date');
      to_d = $('input#to_date');
      _missing(from_d, "Please enter your Check In date");
      _missing(to_d, "Please enter your Check Out date");
    };
    _missing = function(ele, statement) {
      var status;
      status = $('h3.status');
      if (!ele.val()) {
        ele.focus();
      }
      status.addClass('bg-warning');
      status.html(statement);
    };
    search = function(status) {
      var from_d, guests, search_url, to_d;
      status = $('h3.status');
      status.removeClass('bg-warning');
      if (status) {
        status.html('searching...');
      }
      from_d = $('input#from_date').val();
      to_d = $('input#to_date').val();
      guests = $('select#guests').val();
      search_url = _config.search_url + "?from=" + from_d + "&to=" + to_d + "&guests=" + guests + "&token=";
      console.log(search_url);
      $.ajax({
        url: search_url,
        context: this,
        dataType: 'JSON',
        type: 'GET',
        data: {},
        success: function(rsp) {
          var i, j, len, node;
          console.log("rsp[" + rsp.length + "]");
          for (i = j = 0, len = rsp.length; j < len; i = ++j) {
            node = rsp[i];
            node.from_d = from_d;
            node.to_d = to_d;
            node.guests = guests;
            render_results_tile(i, node);
          }
          status.hide();
        },
        error: function(rsp) {
          console.log(rsp);
        }
      });
    };
    render_results_tile = function(id, node, callback) {
      var description, img, sleep_detail_url;
      img = window.is_retina() ? node.profilePhoto.thumbUrl2x : node.profilePhoto.thumbUrl || "http://placehold.it/400x300";
      $("img#results_img_" + id).attr('src', img);
      $("h4#results_title_" + id).html(node.title);
      $("div#results_price_" + id).html("$" + node.price);
      sleep_detail_url = "/sleep-detail/?id=" + node.id + "&from_d=" + node.from_d + "&to_d=" + node.to_d + "&guests=" + node.guests;
      $("a#results_img_anchor_" + id).attr('href', sleep_detail_url);
      if (node.beachFront) {
        $("a#results_img_anchor_" + id).append("<div class='beachfront-icon'></div>");
      }
      $("a#results_title_anchor_" + id).attr('href', sleep_detail_url);
      description = node.propertyType || "Secret";
      if (node.numBedroom) {
        description += " &middot; ";
        description += node.numBedroom + " bedroom";
      }
      $("div#results_description_" + id).html(description);
      $("div#results_place_" + id).show();
    };
  })(jQuery);

}).call(this);
