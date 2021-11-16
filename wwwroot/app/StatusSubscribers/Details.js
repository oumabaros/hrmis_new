var keyValue = $.request("keyValue");

$(function () {

    if (!!keyValue) {

        $.ajax({
            url: "/StatusSubscribers/StatusSubscriberDetails",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                $("#form2").formSerialize(data);
               
            }
        });

        $.ajax({
            url: "/ProcessStatusSubscriber/StatusDetails",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('#div_status').append(
                        "<input type='checkbox' checked='checked' class='formValue' style='margin:5px;' disabled /> <label class='formTitle' >" + data[i]["StatusName"]+"</label>");
                    
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.modalMsg(errorThrown, "error");
                
            },
        });
    }
});