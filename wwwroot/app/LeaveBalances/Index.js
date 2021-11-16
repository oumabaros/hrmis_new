$(function () {

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/LeaveBalances/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'User', name: 'UserName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Year', name: 'LeaveCalendarName', width: $(window).width() * 0.07, align: 'left' },
            { label: 'Leave Type', name: 'LeaveTypeName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'B/F', name: 'BroughtForward', width: $(window).width() * 0.07, align: 'left' },
            { label: 'Entitled', name: 'EntitledDays', width: $(window).width() * 0.07, align: 'left' },
            { label: 'Accrued', name: 'AccruedDays', width: $(window).width() * 0.07, align: 'left' },
            { label: 'Available', name: 'AvailableDays', width: $(window).width() * 0.07, align: 'left' },
            { label: 'Taken', name: 'TakenInYear', width: $(window).width() * 0.07, align: 'left' },
            { label: 'Forfeited', name: 'ForfeitedDays', width: $(window).width() * 0.07, align: 'left' },
            { label: 'C/F', name: 'CarriedForward', width: $(window).width() * 0.07, align: 'left' },
            { label: 'Balance', name: 'ClosingBalance', width: $(window).width() * 0.07, align: 'left' },
            {
                label: 'Is Active', name: 'IsActive', width: $(window).width() * 0.07, align: 'left',
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
        sortname: 'IsActive asc,LeaveCalendarName asc,Id asc',
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
        title: "Create New Leave Balance",
        url: "/LeaveBalances/Form",
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
        title: "Edit Leave Balance",
        url: "/LeaveBalances/Form?keyValue=" + keyValue,
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
        url: "/LeaveBalances/DeleteForm",
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
        title: "Leave Balance Details",
        url: "/LeaveBalances/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}


