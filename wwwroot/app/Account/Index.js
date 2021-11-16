$(function () {

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/Account/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'AccountID', name: 'AccountID', hidden: true },
            { label: 'Email', name: 'Email', hidden: true },
            { label: 'RoleAssigned', name: 'RoleAssigned', hidden: true },
            { label: 'ClientID', name: 'ClientID', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Name', name: 'Name', width: $(window).width() * 0.15, align: 'left' },
            { label: 'Mobile', name: 'Mobile', width: $(window).width() * 0.1, align: 'left' },
            {
                label: 'DOB', name: 'DateOfBirth', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            { label: 'Country Name', name: 'CountryName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'RoleID', name: 'RoleID', width: $(window).width() * 0.1, align: 'left' },
            {
                label: 'RegisteredOn', name: 'CreatedOn', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            {
                label: 'StatusID', name: 'StatusID', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == 'A') {
                        return '<span class=\"label label-success\">Active User</span>';
                    } else if (cellvalue == 'C') {
                        return '<span class=\"label label-default\">User Disable</span>';
                    } else {
                        return '<span class=\"label label-default\">Access Rights Pending</span>';
                    }
                }
            }
        ],
        pager: "#gridPager",
        sortname: 'ClientID asc,RegisteredOn desc',
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
        title: "Create New User",
        url: "/Account/Form",
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