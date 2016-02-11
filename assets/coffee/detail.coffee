do ($ = jQuery) ->
    $(document).ready ->
        # pull id from query params
        # hit json api with id
        # fill dom with details
        p = window.get_query_params()
        id = p?.id or null

        detail_url = "#{_config.detail_url}?id=#{id}&token"
        $.ajax
            url:detail_url,
            context:this,
            dataType:'JSON',
            type:'GET',
            data:
                id:id
            success: (rsp)->
                render_details rsp
                render_photos rsp
                return
            error: (rsp)->
                console.log rsp
                return
        # setup for date picker
        $('input.datepicker').datepicker
            maxViewMode: 0,
            orientation:"bottom auto",
            todayHighlight: true,
            toggleActive: true

        # update booking summary
        # bind book
        return

    render_details = (data)->

        # update page title
        document.title = data.title

        $('div.detail-place-title').html data.title.toUpperCase()
        # update header

        console.log "is retina: #{window.is_retina()}"
        header_image = if window.is_retina() then data.profilePhoto.photoUrl2x else data.profilePhoto.photoUrl
        console.log "header image: #{header_image}"

        $('div.detail-header').css('background-image', "url(#{header_image})")

        # update summary
        $('div.detail-place-location').html (data?.region or "Baja, Mexico")

        # update description
        $('div.detail-description').html data.description

        # update space
        $('div.detail-space li.accomodates').html "Accomodates <span>#{data.capacity}</span>"
        $('div.detail-space li.bedrooms').html "Bedrooms <span>#{data.numBedroom}</span>"
        $('div.detail-space li.bathrooms').html "Bathrooms <span>#{data.numBathroom? and data.numBathroom or ''}</span>"
        $('div.detail-space li.property_type').html "Property Type <span>#{data.propertyType}</span>"
        $('div.detail-space li.room_type').html "Room Type <span>HOUSE</span>"
        # update amenities
        amenities = data.propertyAmenityList
        amenities_col_1 = ""
        amenities_col_2 = ""
        #i = 0
        for amenity,i in amenities
            amenity = amenity.replace "_", " "
            if i <= amenities.length/2
                amenities_col_1 += "<li class='list-group-item'><span>#{amenity}</span></li>"
            else
                amenities_col_2 += "<li class='list-group-item'><span>#{amenity}</span></li>"

            #i += 1
        $('div.detail-amenities ul.amenities-col-1').html amenities_col_1
        $('div.detail-amenities ul.amenities-col-2').html amenities_col_2

        # update prices
        $('div.detail-prices ul.detail-prices-list').append "<li class='list-group-item'>Extra People <span>$#{data.extraPersonCharge}</span></li>"
        $('div.detail-prices ul.detail-prices-list').append "<li class='list-group-item'>Minimum Stay <span>#{data.minimumStay} days</span></li>"
        $('div.detail-prices ul.detail-prices-list').append "<li class='list-group-item'>Weekly Rate <span>$#{data.weeklyRate}</span></li>"

        return

    render_photos = (data)->
        
        # retina detection
        for photo, i in data.photos
            thumb = if window.is_retina() then photo.thumbUrl2x else photo.thumbUrl
            $("div.detail-photo-#{i} img").attr 'src', thumb

        return
    return
