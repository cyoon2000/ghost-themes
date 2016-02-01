(function ($){
    $(document).ready(function(){
        console.log(_config.search_url);
        // setup for date picker to/from
        $('div.booking').html('<h1>ready</h1>');
        $('.input-group.date').datepicker({
            maxViewMode: 0,
            todayHighlight: true,
            toggleActive: true,
        });
        // bindings
        $('button#btn_search').click(function(e){
            // validate
            // extract
            search();
        });
    });

    var validate = function(){
        var from_d = $('input#from_date');
        _missing(from_d, 'Need a From date');
        _missing(to_d, 'Need a To date');
    };

    var _missing = function(ele, statement){
        var status = $('div.status');
        if (!ele.val()){
            ele.focus();
        }
        status.addClass('bg-warning');
        status.html(statement);
    };

    var search = function(){
        // clear status
        var status = $('div.status');
        status.removeClass('bg-warning');
        status.html('searching...');
        // to
        var from_d = $('input#from_date').val();
        console.log(from_d);
        // from
        var to_d = $('input#to_date').val();
        console.log(to_d);
        var guests = $('select#guests').val();
        console.log(guests);

        //search
        $.ajax({url:_config.search_url,
            context:this,
            dataType:'JSON',
            type:'GET',
            data:{param1:'param1', param2:'param2'},
            success: function(rsp){
                //dom
                console.log('rsp[' + rsp.length + ']');
                for (var i=0;i<rsp.length;i++){
                    // layout
                    var template = results_template(i, rsp[i], 9);
                    $('div.results-row').append(template).show('slow');
                }
                // add pagination
                return false;
            },
            error: function(rsp){
                //dom
                return false;
            }
        });

        var results_template = function(id, node, max){
            var templ = "<div id='results_place_"+id+"' class='col-md-4 col-sm-6 result-place-tile'>";
            var img = "http://placehold.it/300x200";
            if (node.profilePhoto != null){
                img = node.profilePhoto;
            }

            templ += "<img class='img-responsive center-block results-img' id='feature_img_"+id+"' src='"+img+"' />";
            templ += "<div class='center-block results-title' id='results_title_"+id+"'>";
            templ += node.title;
            templ += "</div></div>";
            return templ;
        };

    };

}(jQuery))
