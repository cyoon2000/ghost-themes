do ($ = jQuery) ->
    # detail namespace
    detail = detail or {}
    $(document).ready ->
        # pull id from query params
        # hit json api with id
        # fill dom with details
        detail.params = window.get_query_params()

        detail_url = "#{_config.detail_url}?"
        for prop in ['id', 'to_d', 'from_d', 'guests']
            detail_url += "#{prop}=#{detail.params?[prop]}&"

        fetch_detail detail_url, detail.params

        # setup for date picker
        $('input.datepicker').datepicker
            maxViewMode: 0,
            orientation:"bottom auto",
            todayHighlight: true,
            toggleActive: true

        # update booking summary
        if detail.params?.from_d
            $('input#from_date').val(detail.params.from_d)
        if detail.params?.to_d
            $('input#to_date').val(detail.params.to_d)

        # bindings
        $('input.datepicker').change ()->
            console.log 'changing'
            update_total $('input#from_date').val(), $('input#to_date').val(), detail.booking
            return
        return

    daydiff = (from_date, to_date)->
        if not from_date
            return 0
        if not to_date
            return 0
        # calc days diff
        day = 1000*60*60*24

        from_ = from_date.split('/')
        to_ = to_date.split('/')

        from_ = new Date(from_[2], from_[0]-1, from_[1])
        to_ = new Date(to_[2], to_[0]-1, to_[1])
        return Math.floor((to_ - from_)/day)

    update_total = (from_date, to_date, node)->
        days = daydiff from_date, to_date
        # at least 1 night
        if days is 0
            days = 1

        if not node
            return

        # arbitrary $currency
        $('div.booking-price span.price').html "$#{node.price}"
        $('div.booking-summary span.price').html "$#{node.price}"
        $('div.booking-summary span.period').html "#{days} nights"
        subtotal = node.price * days
        $('div.booking-subtotal span.subtotal').html "$#{subtotal}"
        # arbitrary fee for now
        total = subtotal
        $('div.booking-total span.total').html "$#{total}"

        return

    fetch_detail = (url, params)->
        $.ajax
            url:url,
            context:this,
            dataType:'JSON',
            type:'GET',
            data:
                id:params.id
            success: (rsp)->
                console.log rsp
                render_detail rsp
                render_photos rsp
                update_total params?.from_d, params?.to_d, rsp
                detail.booking = rsp
                return
            error: (rsp)->
                console.log rsp
                return

        return

    render_detail = (data)->

        # update page title
        document.title = data.title

        $('div.detail-place-title').html data.title.toUpperCase()
        # update header

        header_image = if window.is_retina() then data.profilePhoto.photoUrl2x else data.profilePhoto.photoUrl

        $('div.detail-header').css('background-image', "url(#{header_image})")

        # update summary
        $('div.detail-place-location').html (data?.region or "Baja, Mexico")

        # update bedrooms
        $('div.detail-place-icon-list span.number-bedrooms').html "#{data.numBedroom}"
        # update capacity
        $('div.detail-place-icon-list span.number-guests').html "#{data.capacity}"

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
