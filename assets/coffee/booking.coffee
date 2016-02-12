do ($ = jQuery) ->
    $(document).ready ->
        # setup for date picker
        $('.input-group.date').datepicker
            maxViewMode: 0,
            orientation:"bottom auto",
            todayHighlight: true,
            toggleActive: true
        # TODO:jwt request
        # onload search()
        search(false)
        # bindings
        $('button#btn_search').click (e)->
            # validate
            # extract
            search()
            return

        return

    validate = ()->
        from_d = $('input#from_date')
        to_d = $('input#to_date')
        _missing from_d, "Please enter your Check In date"
        _missing to_d, "Please enter your Check Out date"
        return

    _missing = (ele, statement)->
        status = $('h3.status')
        if not ele.val()
            ele.focus()
        status.addClass 'bg-warning'
        status.html statement
        return

    search = (status)->
        # clear status
        status = $('h3.status')
        status.removeClass 'bg-warning'
        if status
            status.html 'searching...'

        from_d = $('input#from_date').val()
        to_d = $('input#to_date').val()
 
        guests = $('select#guests').val()

        # search
        search_url = "#{_config.search_url}?from=#{from_d}&to=#{to_d}&guests=#{guests}&token="
        console.log search_url
        $.ajax 
            url:search_url,
            context:this,
            dataType:'JSON',
            type:'GET',
            data: {},
            success: (rsp)->
                # dom
                console.log "rsp[#{rsp.length}]"
                for node,i in rsp
                    node.from_d = from_d
                    node.to_d = to_d
                    node.guests = guests
                    render_results_tile i, node
                $('div.results-place-tile').fadeIn 'slow'
                # add pagination
                status.hide()
                return
            error: (rsp)->
                console.log rsp
                return
        return

    render_results_tile = (id, node, callback)->

        img = if window.is_retina() then node.profilePhoto.thumbUrl2x else node.profilePhoto.thumbUrl or "http://placehold.it/400x300"
        $("img#results_img_#{id}").attr 'src', img
        $("h4#results_title_#{id}").html node.title
        $("div#results_price_#{id}").html "$#{node.price}"
        sleep_detail_url = "/sleep-detail/?id=#{node.id}&from_d=#{node.from_d}&to_d=#{node.to_d}&guests=#{node.guests}"
        $("a#results_img_anchor_#{id}").attr 'href', sleep_detail_url
        if node.beachFront
            $("a#results_img_anchor_#{id}").append "<div class='beachfront-icon'></div>"

        $("a#results_title_anchor_#{id}").attr 'href', sleep_detail_url
        description = node.propertyType or "Secret"
        if node.numBedroom
            description += " &middot; "
            description += "#{node.numBedroom} bedroom"
        $("div#results_description_#{id}").html description
        return

    return
