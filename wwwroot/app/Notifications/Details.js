﻿var keyValue = $.request("keyValue");

$(function () {

    if (!!keyValue) {
        $.ajax({
            url: "/Notifications/NotificationDetails",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                $("#form2").formSerialize(data);
               
            }
        });
    }
});