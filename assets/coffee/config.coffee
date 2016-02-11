do(global = window, $ = jQuery) ->

    __DEV__ = 'DEV'
    __PROD__ = 'PROD'
    env = if global.location.href.search('localhost') != -1 then __PROD__ else __DEV__

    config =
        'DEV':
            base_url:'https://dl.dropboxusercontent.com/u/122147773/',
            search_url: '//localhost:2368/assets/js/faker.js',
            detail_url: '//localhost:2368/assets/js/faker-detail.js'
        'PROD':
            base_url:'https://dl.dropboxusercontent.com/u/122147773/',
            search_url: 'https://dl.dropboxusercontent.com/u/122147773/showcase/json/searchResult.json',
            detail_url: 'https://dl.dropboxusercontent.com/u/122147773/showcase/json/searchResultDetail.json'

    global._env = env
    global._config = config[env]

    # TODO: static urls
    # SEE: extra.scss
    global._config.img_url = "https://www.dropbox.com/sh/xhmto6yekn6tqip/AADKlct4Cv5sfzUITcErB4pua?dl=0"

    # commons
    global.get_query_params = ()->
        query = window.location.search.substring(1)
        raw_vars = query.split("&")
        params = {}
        for v in raw_vars
            [key, val] = v.split("=")
            params[key] = decodeURIComponent(val)
        return params

    global.is_retina = ()->
        if global.matchMedia
            mq = global.matchMedia "only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)"
            return mq and mq.matches or global.devicePixelRatio >1
        return

    return
