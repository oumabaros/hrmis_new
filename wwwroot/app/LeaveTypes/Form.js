var keyValue = $.request("keyValue");

$(function () {
    initControl();
    if (!!keyValue) {
        $.ajax({
            url: "/LeaveTypes/GetFormJson",
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
    $("#NotificationId").bindSelect({
        url: "/Search/GetNotificationsJson",
        search: true,
        param: {},
        id: "Id",
        text: "NotificationName"
    });
    $("#NotificationId").bindSelect({
        url: "/Notifications/GetNotificationsJson",
        search: true,
        param: {},
        id: "Id",
        text: "Notification"
    });
    
    $("#CountryId").bindSelect({
        url: "/Search/GetCountriesJson",
        search: true,
        param: {},
        id: "Id",
        text: "CountryName"
    });

    $("#OtherLeaveTypeId").bindSelect({
        url: "/Search/GetLeaveTypesJson",
        search: true,
        param: {},
        id: "Id",
        text: "LeaveName"
    });
}

function submitForm() {
    if (!$('#form1').formValid()) {
        return false;
    }
    $.submitForm({
        url: "/LeaveTypes/SubmitForm?keyValue=" + keyValue,
        param: $("#form1").formSerialize(),
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

$(function () {
    $("#ConsumeOtherLeaveType").click(function () {
        if ($(this).is(":checked")) {
            $("#onConsume").show();
            
        } else {
            $("#onConsume").hide();
            
        }
    });
    $("#CanCarryForward").click(function () {
        if ($(this).is(":checked")) {
            
            $("#daysForwardable").show();
            document.getElementById("MaxDaysForwardable").className = "form-control required";
          
            document.getElementById("LeaveTypeId").className = "form-control required";
        } else {
            
            $("#daysForwardable").hide();
            document.getElementById("MaxDaysForwardable").className =
                document.getElementById("MaxDaysForwardable").className.replace(/\brequired\b/, '');
            document.getElementById("LeaveTypeId").className =
                document.getElementById("LeaveTypeId").className.replace(/\brequired\b/, '');
        }
    });
});