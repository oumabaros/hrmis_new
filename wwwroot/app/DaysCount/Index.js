$(function () {

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/DaysCount/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Count Method', name: 'LeaveCountMethod', hidden: false, align: 'left' },
            {
                label: 'Created On', name: 'CreatedOn', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            {
                label: 'Modified On', name: 'ModifiedOn', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            {
                label: 'IsActive', name: 'IsActive', width: $(window).width() * 0.1, align: 'left',
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
        sortname: 'Id asc,CreatedOn desc',
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
        title: "Create New Count Method",
        url: "/DaysCount/Form",
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

        $.modalMsg('No Count Record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Days Count Info",
        url: "/DaysCount/Form?keyValue=" + keyValue,
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
        url: "/DaysCount/DeleteForm",
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
        title: "Count Details",
        url: "/DaysCount/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
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