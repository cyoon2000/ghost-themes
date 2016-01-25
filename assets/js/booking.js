(function ($){
    $(document).ready(function(){
        console.log('hah');
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

    var search = function(){
    };

}(jQuery))
