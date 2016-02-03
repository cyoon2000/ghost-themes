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
        _missing(from_d, 'Please enter your Check In date');
        _missing(to_d, 'Please enter your Check Out date');
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
                // clear layout
                //$('div.results-row').empty();
                console.log('rsp[' + rsp.length + ']');
                for (var i=0;i<rsp.length;i++){
                    // layout
                    //var template = results_template(i, rsp[i], 10);
                    //$('div.results-row').append(template);
                    render_results_tile(i, rsp[i]);
                }
                $('div.results-place-tile').fadeIn('slow');
                // add pagination
                return false;
            },
            error: function(rsp){
                //dom
                return false;
            }
        });

        var render_results_tile = function(id, node, callback){

            var img = "http://placehold.it/400x300";
            if (node.profilePhoto != null){
                img = node.profilePhoto;
            }
            $('img#results_img_' + id).attr('src', img);
            $('div#results_title_' + id).html(node.title);
            var description = "";
            description += node.propertyType;
            if (node.numBedroom != null){
                description += " ";
                description += node.numBedroom;
                description += "bedroom";
            }

            $('div#results_description_'+ id).html(description);

            return false;
        }
        var results_template = function(id, node, max){
            var templ = "<div id='results_place_"+id+"' class='col-md-5 col-sm-5 results-place-tile'>";
            var img = "http://placehold.it/300x300";
            if (node.profilePhoto != null){
                img = node.profilePhoto;
            }

            templ += "<a href='#' target='_blank'><img class='img-responsive center-block results-img img-size-contained' id='feature_img_"+id+"' src='"+img+"' /></a>";
            templ += "<a href='#' target='_blank'><div class='center-block results-title results-img img-size-contained' id='results_title_"+id+"'>";
            templ += node.title;
            templ += "</div></a></div>";
            return templ;
        };

    };

}(jQuery))
