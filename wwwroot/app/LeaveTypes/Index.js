$(function () {

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/LeaveTypes/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Leave Name', name: 'LeaveName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Leave Code', name: 'LeaveCode', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Leave Description', name: 'LeaveDescription', width: $(window).width() * 0.15, align: 'left' },
            { label: 'Leave Duration', name: 'LeaveDuration', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Count Method', name: 'LeaveCountMethod', width: $(window).width() * 0.1, align: 'left' },
            {
                label: 'Is Active', name: 'IsActive', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == '1') {
                        return '<span class=\"label label-success\">Active</span>';
                    } else if (cellvalue == '0') {
                        return '<span class=\"label label-default\">Inactive</span>';
                    }
                }
            },
            
        ],
        pager: "#gridPager",
        sortname: 'Id asc,LeaveName desc',
        viewrecords: true
    });
    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    $.modalOpen({
        id: "Form",
        title: "Create New Leave Type",
        url: "/LeaveTypes/Form",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit() {
    var keyValue = $("#gridList").jqGridRowValue().Id;
    
    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Leave Type",
        url: "/LeaveTypes/Form?keyValue=" + keyValue,
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
        url: "/LeaveTypes/DeleteForm",
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
        title: "Leave Type Details",
        url: "/LeaveTypes/Details?keyValue=" + keyValue,
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