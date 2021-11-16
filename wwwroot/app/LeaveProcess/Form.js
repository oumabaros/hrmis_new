var keyValue = $.request("keyValue");

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
    if (!$('#form1').formValid()) {
        return false;
    }
    keyValue = 0;
    $.submitForm({
        url: "/ProcessLeave/SubmitForm?keyValue=" + keyValue,
        param: $("#form1").formSerialize(),
        success: function () {
            $.modalClose();
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

