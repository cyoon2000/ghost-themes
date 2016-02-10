(function() {
  (function($) {
    var get_query_params, render_details, render_photos;
    $(document).ready(function() {
      var id, p;
      console.log(p);
      p = get_query_params();
      id = (p != null ? p.id : void 0) || null;
      $.ajax({
        url: _config.detail_url,
        context: this,
        dataType: 'JSON',
        type: 'GET',
        data: {
          id: id
        },
        success: function(rsp) {
          console.log(rsp);
          render_details(rsp);
          render_photos(rsp);
        },
        error: function(rsp) {
          console.log(rsp);
        }
      });
    });
    get_query_params = function() {
      var j, key, len, params, query, raw_vars, ref, v, val;
      query = window.location.search.substring(1);
      raw_vars = query.split("&");
      params = {};
      for (j = 0, len = raw_vars.length; j < len; j++) {
        v = raw_vars[j];
        ref = v.split("="), key = ref[0], val = ref[1];
        params[key] = decodeURIComponent(val);
      }
      return params;
    };
    render_details = function(data) {
      var amenities, amenities_col_1, amenities_col_2, amenity, i, j, len;
      document.title = data.title;
      $('div.detail-place-title').html(data.title.toUpperCase());
      $('div.detail-header').css('background-image', "url(" + data.profilePhoto.photoUrl2x + ")");
      $('div.detail-place-location').html((data != null ? data.region : void 0) || "Baja, Mexico");
      $('div.detail-description').html(data.description);
      $('div.detail-space li.accomodates').html("Accomodates <span>" + data.capacity + "</span>");
      $('div.detail-space li.bedrooms').html("Bedrooms <span>" + data.numBedroom + "</span>");
      $('div.detail-space li.bathrooms').html("Bathrooms <span>" + ((data.numBathroom != null) && data.numBathroom || '') + "</span>");
      $('div.detail-space li.property_type').html("Property Type <span>" + data.propertyType + "</span>");
      $('div.detail-space li.room_type').html("Room Type <span>HOUSE</span>");
      amenities = data.propertyAmenityList;
      amenities_col_1 = "";
      amenities_col_2 = "";
      for (i = j = 0, len = amenities.length; j < len; i = ++j) {
        amenity = amenities[i];
        amenity = amenity.replace("_", " ");
        if (i <= amenities.length / 2) {
          amenities_col_1 += "<li class='list-group-item'><span>" + amenity + "</span></li>";
        } else {
          amenities_col_2 += "<li class='list-group-item'><span>" + amenity + "</span></li>";
        }
      }
      $('div.detail-amenities ul.amenities-col-1').html(amenities_col_1);
      $('div.detail-amenities ul.amenities-col-2').html(amenities_col_2);
      $('div.detail-prices ul.detail-prices-list').append("<li class='list-group-item'>Extra People <span>$" + data.extraPersonCharge + "</span></li>");
      $('div.detail-prices ul.detail-prices-list').append("<li class='list-group-item'>Minimum Stay <span>" + data.minimumStay + " days</span></li>");
      $('div.detail-prices ul.detail-prices-list').append("<li class='list-group-item'>Weekly Rate <span>$" + data.weeklyRate + "</span></li>");
    };
    render_photos = function(data) {
      var i, j, len, photo, ref;
      ref = data.photos;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        photo = ref[i];
        $("div.detail-photo-" + i + " img").attr('src', photo.thumbUrl2x);
      }
    };
  })(jQuery);

}).call(this);
