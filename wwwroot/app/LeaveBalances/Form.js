var keyValue = $.request("keyValue");

$(function () {
    initControl();
    if (!!keyValue) {
        $.ajax({
            url: "/LeaveBalances/GetFormJson",
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

    $("#DaysCountMethodId").bindSelect({
        url: "/Search/GetDaysCountMethodJson",
        search: true,
        param: {},
        id: "Id",
        text: "LeaveCountMethod"
    });

    $("#LeaveTypeId").bindSelect({
        url: "/Search/GetLeaveTypesJson",
        search: true,
        param: {},
        id: "Id",
        text: "LeaveName"
    });

    $("#LeaveCalendarId").bindSelect({
        url: "/Search/GetLeaveCalendarJson",
        search: true,
        param: {},
        id: "Id",
        text: "CalendarYear"
    });
}




function submitForm() {
    if (!$('#form').formValid()) {
        return false;
    }
    $.submitForm({
        url: "/LeaveBalances/SubmitForm?keyValue=" + keyValue,
        param: $("#form").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridList").trigger("reloadGrid");
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
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57)))
        return false;
    return true;
}
