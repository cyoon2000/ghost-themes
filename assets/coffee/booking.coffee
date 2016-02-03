do ($ = jQuery) ->
    $(document).ready ->
        console.log _config.search_url
        # setup for date picker
        $('.input-group.date').datepicker
            maxViewMode: 0,
            todayHighlight: true,
            toggleActive: true
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

    search = ()->
        # clear status
        status = $('h3.status')
        status.removeClass 'bg-warning'
        status.html 'searching...'

        from_d = $('input#from_date').val()
        to_d = $('input#to_date').val()
 
        console.log "from #{from_d} to #{to_d}"

        guests = $('select#guests').val()
        console.log guests

        # search
        #
        $.ajax 
            url:_config.search_url,
            context:this,
            dataType:'JSON',
            type:'GET',
            data: 
                param1:'param1',
                param2:'param2'
            success: (rsp)->
                # dom
                console.log "rsp[#{rsp.length}]"
                i = 0
                for node in rsp
                    render_results_tile i, node
                    i++
                $('div.results-container').show()
                $('div.results-place-tile').fadeIn 'slow'
                # add pagination
                status.hide()
                return
            error: (rsp)->
                return
        return

    render_results_tile = (id, node, callback)->

        img = node.profilePhoto? or "http://placehold.it/400x300"  
        $("img#results_img_#{id}").attr 'src', img
        $("div#results_title_#{id}").html node.title
        description = node.propertyType or "Secret"
        if node.numBedroom
            description += " #{node.numBedroom} bedroom"
        $("div#results_description_#{id}").html description
        return

    return