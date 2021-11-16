$(function () {

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/ProcessLeave/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Requester', name: 'UserName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Calendar Year', name: 'LeaveCalendarName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Leave Type', name: 'LeaveTypeName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Days Taken', name: 'LeaveDaysTaken', width: $(window).width() * 0.1, align: 'left' },
            {
                label: 'Application Date', name: 'ApplicationDate', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            {
                label: 'Start Date', name: 'StartDate', width: $(window).width() * 0.15, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            {
                label: 'End Date', name: 'EndDate', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
           
            {
                label: 'Application Status', name: 'ProcessStatusId', width: $(window).width() * 0.15, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == '1') {
                        return '<span class=\"label label-success\">Approved</span>';
                    } else if (cellvalue == '2') {
                        return '<span class=\"label label-danger\">Rejected</span>';
                    } else if (cellvalue == '3') {
                        return '<span class=\"label label-primary\">Applied</span>';
                    } else if (cellvalue == '4') {
                        return '<span class=\"label label-info\">Under Review</span>';
                    } else if (cellvalue == '5') {
                        return '<span class=\"label label-danger\">Withdrawn</span>';
                    }
                    else if (cellvalue == '6') {
                        return '<span class=\"label label-default\">Escalated</span>';
                    }

                }
            },
        ],
        pager: "#gridPager",
        sortname: 'Id asc,LeaveCalendarName desc',
        viewrecords: true
    });
    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword").val() },
        }).trigger('reloadGrid');
    });
}


function btn_process() {
    var keyValue = $("#gridList").jqGridRowValue().Id;
    if (keyValue == null) {
        $.modalMsg('No record Selected from the Grid', 'error');
        return false;
    }
    $.modalOpen({
        id: "Form",
        title: "Process Leave Application",
        url: "/ProcessLeave/Form?keyValue=" + keyValue,
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete() {

    if ($("#gridList").jqGridRowValue().Id == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.deleteForm({
        url: "/LeaveTransactions/DeleteForm",
        param: { keyValue: $("#gridList").jqGridRowValue().Id },
        success: function () {
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}

function btn_details() {
    var keyValue = $("#gridList").jqGridRowValue().Id;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Details",
        title: "Leave Process Details",
        url: "/ProcessLeave/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}


function btn_disabled() {
    if ($("#gridList").jqGridRowValue().Id == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    var keyAccountID = $("#gridList").jqGridRowValue().AccountID;
    var keyOperatorID = $("#gridList").jqGridRowValue().Email;
    var keyClientID = $("#gridList").jqGridRowValue().ClientID;
    var keyIsClosed = 1;

    $.modalConfirm("Disable Login Credentials for【" + $("#gridList").jqGridRowValue().Name + "】？", function (r) {
        if (r) {
            $.submitForm({
                url: "/Account/DisabledAccount",
                param: { AccountID: keyAccountID, OperatorID: keyOperatorID, ClientID: keyClientID, IsClosed: keyIsClosed },
                success: function () {
                    $.currentWindow().$("#gridList").trigger("reloadGrid");
                }
            })
        }
    });
}