var keyValue = $.request("keyValue");
var files = new Array();;
$(function () {
    initControl();
    if (!!keyValue) {
        $.ajax({
            url: "/LeaveTransactions/GetFormJson",
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
    
    $("#ActingPersonId").bindSelect({
        url: "/Search/GetSupervisorJson",
        search: true,
        param: { SupervisorId: "", FilterCode: "S" },
        id: "Id",
        text: "Narration"
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
   
    var FormFile = new FormData();

    var fileInput = document.getElementById('FormFile');
        
    for (i = 0; i < fileInput.files.length; i++) {
        FormFile.append("FormFile", fileInput.files[i]);
    }
    
    FormFile.append("LeaveTypeId", $('#LeaveTypeId').val());
    FormFile.append("LeaveDescription", $('#LeaveDescription').val());
    FormFile.append("LeaveDaysTaken", $('#LeaveDaysTaken').val());
    FormFile.append("IsScheduled", $('#IsScheduled').val());
    FormFile.append("StartDate", $('#StartDate').val());
    FormFile.append("ActingPersonId", $('#ActingPersonId').val());
    FormFile.append("ContactPerson", $('#ContactPerson').val());
    FormFile.append("ContactTelephone", $('#ContactTelephone').val());
    FormFile.append("LeaveAddress", $('#LeaveAddress').val());
  
    var options = {
        url: "",
        param: [],
        loading: "Submitting data...",
        success: null,
        close: true,
        processData: true,
    };
    $.loading(true, options.loading);

    window.setTimeout(function () {
        $.ajax({

            url: "/LeaveTransactions/SubmitForm?keyValue=" + keyValue,
            type: 'POST',
            dataType: 'JSON',
            contentType: false,
            processData: false,
            data: FormFile,
            success: function (data) {
                if (data.state == "success") {
                    $.currentWindow().$("#gridList").trigger("reloadGrid");
                    $.modalMsg(data.message, data.state);
                    if (options.close == true) {
                        $.modalClose();
                    }
                } else {
                    $.modalAlert(data.message, data.state);
                }
            },
            beforeSend: function (xhr) {
                $.loading(true, options.loading);
                xhr.setRequestHeader("RequestVerificationToken",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.loading(false);
                $.modalMsg(errorThrown, "error");
            },
            complete: function () {
                $.loading(false);
            }
        })
    }, 500);
   
}

$("#LeaveTypeId").change(function () {
    var selectedLeaveType = $("#LeaveTypeId option:selected").val();
    var RequireSupportingDocs = null;
    $.ajax({
        url: "/LeaveTypes/GetFormJson",
        data: { keyValue: selectedLeaveType },
        dataType: "json",
        async: false,
        success: function (data) {
            RequireSupportingDocs = data.RequireSupportingDocs;
        }
    });
    
    
    if (RequireSupportingDocs) {
        $("#SupportingDoc_1").show();
        $("#SupportingDoc_2").show();

    } else {
        $("#SupportingDoc_1").hide();
        $("#SupportingDoc_2").hide();
    }
    
});

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

