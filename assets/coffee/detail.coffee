do ($ = jQuery) ->
    $(document).ready ->
        console.log p
        # pull id from query params
        # hit json api with id
        # fill dom with details
        p = get_query_params()
        return

    get_query_params = ()->
        query = window.location.search.substring(1)
        raw_vars = query.split("&")

        params = {}

        for v in raw_vars
            [key, val] = v.split("=")
            params[key] = decodeURIComponent(val)

        return params
    return
