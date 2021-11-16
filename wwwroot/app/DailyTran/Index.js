$(function () {

    var startTime = laydate.render({
        elem: '#startDate', type: 'date', done: function (value, date, endDate) {
            date.month = date.month - 1;
            endTime.config.min = date;
            $(endTime.config.elem).focus();
        }
    });

    var endTime = laydate.render({
        elem: '#endDate', type: 'date', done: function (value, date, endDate) {
            date.month = date.month - 1;
            startTime.config.max = date;
        }
    });

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/SysTransaction/DailyTran/GetTransGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'AccountTrxID', name: 'AccountTrxID', hidden: true },
            { label: 'Transaction ID', name: 'TrxBatchID', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Account', name: 'MainGLID', width: $(window).width() * 0.1, align: 'left' },
            {
                label: 'Date', name: 'TrxDate', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            {
                label: 'Event', name: 'AccountTypeID', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == 'I') {
                        return '<span class=\"label label-success\">Receipt</span>';
                    } else {
                        return '<span class=\"label label-default\">Payment</span>';
                    }
                }
            },
            {
                label: 'Amount', name: 'TrxAmount', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {               
                    return $.addCommas(cellvalue);
                }
            },
            { label: 'Curreny ID', name: 'TrxCurrencyID', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Exchange Rate', name: 'ExchangeRate', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Transacton Desc', name: 'TrxDescription', width: $(window).width() * 0.1, align: 'left' }
        ],
        pager: "#gridPager",
        sortname: 'AccountTrxID desc',
        viewrecords: true
    });
    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword").val(), startdate: $("#startDate").val(), todate: $("#endDate").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    $.modalOpen({
        id: "Form",
        title: "Create a new transaction",
        url: "/SysTransaction/DailyTran/add",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit() {
    var keyValue = $("#gridList").jqGridRowValue().ClientID;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit User Info",
        url: "/Account/Form?keyValue=" + keyValue,
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete() {

    if ($("#gridList").jqGridRowValue().ClientID == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.deleteForm({
        url: "/Account/DeleteForm",
        param: { keyValue: $("#gridList").jqGridRowValue().ClientID },
        success: function () {
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}

function btn_details() {
    var keyValue = $("#gridList").jqGridRowValue().ClientID;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Details",
        title: "User Details",
        url: "/Account/Info?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}

function btn_createpassword() {
    if ($("#gridList").jqGridRowValue().AccountID == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }
    var keyValue = $("#gridList").jqGridRowValue().ClientID;
    var Account = $("#gridList").jqGridRowValue().AccountID;
    var RealName = $("#gridList").jqGridRowValue().Name;
    var UserName = $("#gridList").jqGridRowValue().Email;
    var RoleAssigned = $("#gridList").jqGridRowValue().RoleAssigned;
    var role = $("#gridList").jqGridRowValue().RoleID;

    $.modalOpen({
        id: "CreatePassword",
        title: 'Create Login Credentials',
        url: '/Account/CreatePassword?keyValue=' + keyValue + "&account=" + escape(Account) + '&realName=' + escape(RealName) + '&UserName=' + escape(UserName) + '&RoleID=' + escape(role) + '&RoleAssigned=' + escape(RoleAssigned),
        width: "650px",
        height: "450px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_revisepassword() {
    if ($("#gridList").jqGridRowValue().AccountID == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    var keyValue = $("#gridList").jqGridRowValue().ClientID;
    var Account = $("#gridList").jqGridRowValue().AccountID;
    var RealName = $("#gridList").jqGridRowValue().Name;
    var UserName = $("#gridList").jqGridRowValue().Email;
    var RoleAssigned = $("#gridList").jqGridRowValue().RoleAssigned;
    var role = $("#gridList").jqGridRowValue().RoleID;

    $.modalOpen({
        id: "RevisePassword",
        title: 'Revise Login Credentials',
        url: '/Account/RevisePassword?keyValue=' + keyValue + "&account=" + escape(Account) + '&realName=' + escape(RealName) + '&UserName=' + escape(UserName) + '&RoleID=' + escape(role) + '&RoleAssigned=' + escape(RoleAssigned),
        width: "650px",
        height: "450px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_disabled() {
    if ($("#gridList").jqGridRowValue().AccountID == null) {

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