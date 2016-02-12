(function() {
  (function($) {
    var daydiff, detail, fetch_detail, render_detail, render_photos, update_total;
    detail = detail || {};
    $(document).ready(function() {
      var detail_url, j, len, prop, ref, ref1, ref2, ref3;
      detail.params = window.get_query_params();
      detail_url = _config.detail_url + "?";
      ref = ['id', 'to_d', 'from_d', 'guests'];
      for (j = 0, len = ref.length; j < len; j++) {
        prop = ref[j];
        detail_url += prop + "=" + ((ref1 = detail.params) != null ? ref1[prop] : void 0) + "&";
      }
      fetch_detail(detail_url, detail.params);
      $('input.datepicker').datepicker({
        maxViewMode: 0,
        orientation: "bottom auto",
        todayHighlight: true,
        toggleActive: true
      });
      if ((ref2 = detail.params) != null ? ref2.from_d : void 0) {
        $('input#from_date').val(detail.params.from_d);
      }
      if ((ref3 = detail.params) != null ? ref3.to_d : void 0) {
        $('input#to_date').val(detail.params.to_d);
      }
      $('input.datepicker').change(function() {
        console.log('changing');
        update_total($('input#from_date').val(), $('input#to_date').val(), detail.booking);
      });
    });
    daydiff = function(from_date, to_date) {
      var day, from_, to_;
      if (!from_date) {
        return 0;
      }
      if (!to_date) {
        return 0;
      }
      day = 1000 * 60 * 60 * 24;
      from_ = from_date.split('/');
      to_ = to_date.split('/');
      from_ = new Date(from_[2], from_[0] - 1, from_[1]);
      to_ = new Date(to_[2], to_[0] - 1, to_[1]);
      return Math.floor((to_ - from_) / day);
    };
    update_total = function(from_date, to_date, node) {
      var days, subtotal, total;
      days = daydiff(from_date, to_date);
      if (days === 0) {
        days = 1;
      }
      if (!node) {
        return;
      }
      $('div.booking-price span.price').html("$" + node.price);
      $('div.booking-summary span.price').html("$" + node.price);
      $('div.booking-summary span.period').html(days + " nights");
      subtotal = node.price * days;
      $('div.booking-subtotal span.subtotal').html("$" + subtotal);
      total = subtotal;
      $('div.booking-total span.total').html("$" + total);
    };
    fetch_detail = function(url, params) {
      $.ajax({
        url: url,
        context: this,
        dataType: 'JSON',
        type: 'GET',
        data: {
          id: params.id
        },
        success: function(rsp) {
          console.log(rsp);
          render_detail(rsp);
          render_photos(rsp);
          update_total(params != null ? params.from_d : void 0, params != null ? params.to_d : void 0, rsp);
          detail.booking = rsp;
        },
        error: function(rsp) {
          console.log(rsp);
        }
      });
    };
    render_detail = function(data) {
      var amenities, amenities_col_1, amenities_col_2, amenity, header_image, i, j, len;
      document.title = data.title;
      $('div.detail-place-title').html(data.title.toUpperCase());
      header_image = window.is_retina() ? data.profilePhoto.photoUrl2x : data.profilePhoto.photoUrl;
      $('div.detail-header').css('background-image', "url(" + header_image + ")");
      $('div.detail-place-location').html((data != null ? data.region : void 0) || "Baja, Mexico");
      $('div.detail-place-icon-list span.number-bedrooms').html("" + data.numBedroom);
      $('div.detail-place-icon-list span.number-guests').html("" + data.capacity);
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
