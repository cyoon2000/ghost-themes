(function() {
  (function($) {
    var _missing, render_results_tile, search, validate;
    $(document).ready(function() {
      console.log(_config.search_url);
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
      var from_d, guests, to_d;
      status = $('h3.status');
      status.removeClass('bg-warning');
      if (status) {
        status.html('searching...');
      }
      from_d = $('input#from_date').val();
      to_d = $('input#to_date').val();
      console.log("from " + from_d + " to " + to_d);
      guests = $('select#guests').val();
      console.log(guests);
      $.ajax({
        url: _config.search_url,
        context: this,
        dataType: 'JSON',
        type: 'GET',
        data: {
          param1: 'param1',
          param2: 'param2'
        },
        success: function(rsp) {
          var i, j, len, node;
          console.log("rsp[" + rsp.length + "]");
          i = 0;
          for (j = 0, len = rsp.length; j < len; j++) {
            node = rsp[j];
            render_results_tile(i, node);
            i++;
          }
          $('div.results-place-tile').fadeIn('slow');
          status.hide();
        },
        error: function(rsp) {
          console.log(rsp);
        }
      });
    };
    render_results_tile = function(id, node, callback) {
      var description, img, ref;
      img = (((ref = node.profilePhoto) != null ? ref.thumbUrl : void 0) != null) && node.profilePhoto.thumbUrl || "http://placehold.it/400x300";
      $("img#results_img_" + id).attr('src', img);
      $("h4#results_title_" + id).html(node.title);
      $("div#results_price_" + id).html("$" + node.price);
      $("a#results_img_anchor_" + id).attr('href', '/sleep-detail/?id=42');
      $("a#results_title_anchor_" + id).attr('href', '/sleep-detail/?id=42');
      description = node.propertyType || "Secret";
      if (node.numBedroom) {
        description += " &middot; ";
        description += node.numBedroom + " bedroom";
      }
      $("div#results_description_" + id).html(description);
    };
  })(jQuery);

}).call(this);
