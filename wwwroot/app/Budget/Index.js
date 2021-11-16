var dataJson = top.clients.user;

$(function () {

    laydate.render({
        elem: '#txt_year',
        type: 'year'
    });

    $("#CategoryID").bindSelect({
        url: "/Search/SearchResult",
        search: true,
        param: {
            TableID: "CategoryID", LanguageID: "en",
            AdvFilterString: "AccountID = '" + dataJson.AccountID + " '"
        },
        id: "CategoryID",
        text: "CategoryName"
    });

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/SysBudget/Budget/GetBudgetGrid',
        height: $(window).height() - 128,
        colModel: [
            { label: 'GlAccountID', name: 'GlAccountID', hidden: true },
            { label: 'CategoryID', name: 'CategoryID', hidden: true },
            { label: 'Item Name', name: 'ItemName', width: $(window).width() * 0.2, align: 'left' },
            {
                label: 'JAN', name: 'Budget1', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {               
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'FEB', name: 'Budget2', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'MAR', name: 'Budget3', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'APR', name: 'Budget4', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'MAY', name: 'Budget5', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'JUN', name: 'Budget6', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'JUL', name: 'Budget7', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'AUG', name: 'Budget8', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'SEP', name: 'Budget9', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'OCT', name: 'Budget10', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'NOV', name: 'Budget11', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'DEC', name: 'Budget12', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'TOTAL ', name: 'TotalBudget', width: 70, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            }
        ],
        pager: "#gridPager",
        sortname: 'GlAccountID desc',
        viewrecords: true
    });

    $("#btn_search").click(function () {
        var selectedcat = $("#CategoryID option:selected").val();
        console.log(selectedcat);
        $gridList.jqGrid('setGridParam',
            {postData: {Year: $("#txt_year").val(),CategoryID: selectedcat},
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