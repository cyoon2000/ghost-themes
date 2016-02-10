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
 
        console.log "from #{from_d} to #{to_d}"

        guests = $('select#guests').val()
        console.log guests

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
        # placeholder id
        $("a#results_img_anchor_#{id}").attr 'href', "/sleep-detail/?id=#{node.id}"
        $("a#results_title_anchor_#{id}").attr 'href', "/sleep-detail/?id=#{node.id}"
        description = node.propertyType or "Secret"
        if node.numBedroom
            description += " &middot; "
            description += "#{node.numBedroom} bedroom"
        $("div#results_description_#{id}").html description
        return

    return
