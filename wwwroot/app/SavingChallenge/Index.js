var dataJson = top.clients.user;

$(function () {

    laydate.render({
        elem: '#txt_year',
        type: 'year'
    });

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/SysSaving/SavingChallenge/GetSavingGrid',
        height: $(window).height() - 128,
        colModel: [
            { label: 'AccountID', name: 'AccountID', hidden: true },
            { label: 'InstallmentNo', name: 'InstallmentNo', hidden: true },
            {
                label: 'Dep Date', name: 'Calendar_Date', width: 70, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            { label: 'Year', name: 'Calendar_Year', width: 70, align: 'left' },
            { label: 'Day Name', name: 'Day_Name', width: 80, align: 'left' },
            { label: 'Week', name: 'Week_of_Year', width: 70, align: 'left' },
            { label: 'Month Name', name: 'Month_Name', width: 120, align: 'left' },
            {
                label: 'ExpectedAmount', name: 'ExpectedAmount', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {               
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'DepositAmount', name: 'DepositAmount', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'DepositBalance', name: 'DepositBalance', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'RunningTotal', name: 'RunningTotal', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'Deposit', name: 'PaidStatusID', width: 80, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == 'S') {
                        return '<span class=\"label label-success\">Saved</span>';
                    } else {
                        return '<span class=\"label label-default\">Pending</span>';
                    }
                }
            },
            { label: 'Frequency', name: 'DepositFrequencyID', width: 80, align: 'left' }
        ],
        pager: "#gridPager",
        sortname: 'InstallmentNo asc',
        viewrecords: true
    });

    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam',
            {
                postData: {
                    Year: $("#txt_year").val()
                },
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    $.modalOpen({
        id: "Form",
        title: "Create Budget",
        url: "/SysBudget/Budget/add",
        width: "500px",
        height: "500px",
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