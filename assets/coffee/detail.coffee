do ($ = jQuery) ->
    $(document).ready ->
        console.log p
        # pull id from query params
        # hit json api with id
        # fill dom with details
        p = get_query_params()
        id = p?.id or null

        $.ajax
            url:_config.detail_url,
            context:this,
            dataType:'JSON',
            type:'GET',
            data:
                id:id
            success: (rsp)->
                console.log rsp
                render_details rsp
                render_photos rsp
                return
            error: (rsp)->
                console.log rsp
                return
        return

    get_query_params = ()->
        query = window.location.search.substring(1)
        raw_vars = query.split("&")
        params = {}
        for v in raw_vars
            [key, val] = v.split("=")
            params[key] = decodeURIComponent(val)
        return params

    render_details = (data)->

        # update page title
        document.title = data.title

        $('div.detail-place-title').html data.title.toUpperCase()
        # update header
        $('div.detail-header').css('background-image', "url(#{data.profilePhoto.photoUrl2x})")

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
            $("div.detail-photo-#{i} img").attr 'src', photo.thumbUrl2x

        return
    return
