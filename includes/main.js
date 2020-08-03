function fetch_info_data(ip, port)
{
    $.ajax({
        url: "ajax.php",
		type: "GET",
		data: 'ip='+ip+'&port='+port+'',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		cache: false,
		success: function(json)
		{
            if (json.error && json.error != '')
            {
                details_holder('hide');
                $(".response").removeClass("processing").removeClass("hide").html(json.error);
                loader('hide');

            }
            else
            {
                parse_server_data(json.server);
                loader('hide', true);
                details_holder('show');
            }

		},
		error: function (xhr, ajaxOptions, thrownError)
		{
            details_holder('hide');
            $(".response").removeClass("processing").removeClass("hide").html(xhr.status +" <br />"+ thrownError);
            loader('hide');
		}
	});
}


function parse_server_data(json)
{
    $.each(json, function(key, val)
    {
        $(".details #"+key).html(val);
    });
}



function details_holder(state)
{
    if (state == 'show')
        $(".details").removeClass("hide");
    else
        $(".details").addClass("hide");
}

function loader(state)
{
    if (state == 'show')
        $(".processing").removeClass("hide");
    else
        $(".processing").addClass("hide");
}

$(document).ready(function() {

    $("input[id^='check']").click(function() {
        $(".response").addClass("processing").addClass("hide").html('');
        loader('show');
        details_holder('hide');
        var ip = $('#address').val();
        var port = $('#port').val();
        fetch_info_data(ip, port);
    });
});
