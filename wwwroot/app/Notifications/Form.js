var keyValue = $.request("keyValue");

$(function () {
    initControl();
    if (!!keyValue) {
        $.ajax({
            url: "/Notifications/GetFormJson",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                $("#form1").formSerialize(data);
               
            }
        });
    }
});

function initControl() {

   
}

function submitForm() {
   if (!$('#form1').formValid()) {
        return false;
    }
    $.submitForm({
        url: "/Notifications/SubmitForm?keyValue=" + keyValue,
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridListNotifs").trigger("reloadGrid");
        }
    })
}

function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}
function capitalize(inputField) {
    inputField.value = inputField.value.replace(/\b([a-z])[a-z]*?/gi, function (letter) {
        return letter.toUpperCase();
    });
}

