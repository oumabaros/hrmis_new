var keyValue = $.request("keyValue");
var keyValue_ = $.request("keyValue");
$(function () {
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

        $.ajax({
            url: "/ProcessStatus/GetDataJson",
            dataType: "json",
            async: false,
            success: function (data) {
                jQuery(data).each(function (index) {
                    if (data[index].StatusName == "Applied") {
                        data.splice(index, 1); 
                        return false; 
                    }
                });
                for (var i = 0; i < data.length; i++) {
                    $('#process_group').append(
                        "<label class='radio-inline'><input type='radio' id='" + data[i]["Id"] + "' name='process' value='" + data[i]["Id"] + "' />" + data[i]["StatusName"] + "</label>"
                        );
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.modalMsg(errorThrown, "error");
            },
        });
        initControl();
        keyValue = 0;
    }
});

function initControl() {
    
    $('#LeaveTransactionId').val($('#Id').val());
    $('#ClientId').val($('#UserId').val());
    $('#LeaveStartDate').val($('#StartDate').val());
    $('#DaysTaken').val($('#LeaveDaysTaken').val());

    $("#ApprovingPersonId").bindSelect({
        url: "/Search/GetSupervisorJson",
        search: true,
        param: { SupervisorId: "", FilterCode: "S" },
        id: "Id",
        text: "Narration"
    });

    $('#process_group input:radio').click(function () {
        if ($(this).val() === '1') {
            $('#td_approver').css('visibility', 'hidden');
            $('#ApprovingPersonId').removeClass('required');
            $('#ProcessStatusId').val('1');
            $('#Status').val('Approved');
        } else if ($(this).val() === '2') {
            $('#td_approver').css('visibility', 'hidden');
            $('#ApprovingPersonId').removeClass('required');
            $('#ProcessStatusId').val('2');
            $('#Status').val('Rejected');
        } else if ($(this).val() === '3') {
            $('#td_approver').css('visibility', 'hidden');
            $('#ApprovingPersonId').removeClass('required');
            $('#ProcessStatusId').val('3');
            $('#Status').val('Applied');
        } else if ($(this).val() === '4') {
            $('#td_approver').css('visibility', 'hidden');
            $('#ApprovingPersonId').removeClass('required');
            $('#ProcessStatusId').val('4');
            $('#Status').val('Under Review');
        }
        else if ($(this).val() === '5') {
            $('#td_approver').css('visibility', 'hidden');
            $('#ApprovingPersonId').removeClass('required');
            $('#ProcessStatusId').val('5');
            $('#Status').val('Withdrawn');
        }
        else if ($(this).val() === '6') {
            $('#td_approver').css('visibility', 'visible');
            $('#ApprovingPersonId').addClass('required');
            $('#ProcessStatusId').val('6');
            $('#Status').val('Escalated');
        }
    });
}

function submitForm() {
    if (!$('#form2').formValid()) {
        return false;
    }
    var LeaveProcess = new FormData();

    LeaveProcess.append("ProcessStatusId", $('#ProcessStatusId').val());
    LeaveProcess.append("LeaveTransactionId", $('#LeaveTransactionId').val());
    LeaveProcess.append("ClientId", $('#ClientId').val());
    LeaveProcess.append("LeaveStartDate", $('#LeaveStartDate').val());
    LeaveProcess.append("DaysTaken", $('#DaysTaken').val());
    LeaveProcess.append("Notes", $('#Notes').val());
    LeaveProcess.append("Status", $('#Status').val());
    LeaveProcess.append("ApprovingPersonId", $("#ApprovingPersonId option:selected").val());

    var options = {
        url: "",
        param: [],
        loading: "Submitting data...",
        success: null,
        close: true,
        processData: true,
    };

    $.ajax({
        url: "/ProcessLeave/SubmitForm?keyValue=" + keyValue,
        type: 'POST',
        dataType: 'JSON',
        contentType: false,
        async:false,
        processData: false,
        data: LeaveProcess,
        beforeSend: function (xhr) {
            $.loading(true, options.loading);
            xhr.setRequestHeader("RequestVerificationToken",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
        success: function (data) {
            if (data.state == "success") {
                if (options.close == true) {
                    $.loading(false);
                    
                  }
                $.modalMsg(data.message, data.state);
            } else {
                $.modalAlert(data.message, data.state);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.loading(false);
            $.modalMsg(errorThrown, "error");
        },
        complete: function () {
            $.loading(false);
        }
    })
    $.modalClose();
    $.reload();
    
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

