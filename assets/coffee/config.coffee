do(global = window, $ = jQuery) ->

    global._config =
        # placeholder
        base_url:'https://dl.dropboxusercontent.com/u/122147773/',
        #search_url: 'https://dl.dropboxusercontent.com/u/122147773/showcase/json/searchResult.json'
        #detail_url: 'https://dl.dropboxusercontent.com/u/122147773/showcase/json/searchResultDetail.json'
        search_url: '//localhost:2368/assets/js/faker.js'
        detail_url: '//localhost:2368/assets/js/faker-detail.js'
    # TODO: static urls
    # SEE: extra.scss
    global._config.img_url = "https://www.dropbox.com/sh/xhmto6yekn6tqip/AADKlct4Cv5sfzUITcErB4pua?dl=0"

    return
