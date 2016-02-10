(function() {
  (function($) {
    var render_details, render_photos;
    $(document).ready(function() {
      var detail_url, id, p;
      p = window.get_query_params();
      id = (p != null ? p.id : void 0) || null;
      detail_url = _config.detail_url + "?id=" + id + "&token";
      $.ajax({
        url: detail_url,
        context: this,
        dataType: 'JSON',
        type: 'GET',
        data: {
          id: id
        },
        success: function(rsp) {
          render_details(rsp);
          render_photos(rsp);
        },
        error: function(rsp) {
          console.log(rsp);
        }
      });
    });
    render_details = function(data) {
      var amenities, amenities_col_1, amenities_col_2, amenity, header_image, i, j, len;
      document.title = data.title;
      $('div.detail-place-title').html(data.title.toUpperCase());
      header_image = window.is_retina() ? data.profilePhoto.photoUrl2x : data.profilePhoto.photoURL;
      console.log(header_image);
      $('div.detail-header').css('background-image', "url(" + header_image + ")");
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
      var i, j, len, photo, ref, thumb;
      ref = data.photos;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        photo = ref[i];
        thumb = window.is_retina() ? photo.thumbUrl2x : photo.thumbUrl;
        $("div.detail-photo-" + i + " img").attr('src', thumb);
      }
    };
  })(jQuery);

}).call(this);
