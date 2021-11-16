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
        url: '/SysBudget/Budget/GetBudgetTracker',
        height: $(window).height() - 156,//128
        colModel: [
            { label: 'AccountID', name: 'AccountID', hidden: true },
            { label: 'CategoryID', name: 'CategoryID', hidden: true },
            { label: 'ItemID', name: 'ItemID', hidden: true },
            { label: 'Account Name', name: 'AccountName', frozen: true, width: $(window).width() * 0.25, align: 'left' },
            {
                label: 'Annual Budget', name: 'ProjectedAnnually', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {               
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'Budget To Date', name: 'ProjectedToDate', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'Current Month ', name: 'CurrentMonthBudget', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'Amount To Date', name: 'ActualCostToDate', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'Current Month', name: 'MonthActualCost', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            },
            {
                label: 'Budget Variance', name: 'BudgetDifference', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    return $.addCommas(cellvalue);
                }
            }
        ],
        pager: "#gridPager",
        sortname: 'CategoryID asc',
        viewrecords: true
    });
    $gridList.jqGrid('setGroupHeaders', {
        useColSpanStyle: false,
        groupHeaders: [
            { startColumnName: 'ProjectedAnnually', numberOfColumns: 3, titleText: '<em>Budget Projection</em>' },
            { startColumnName: 'ActualCostToDate', numberOfColumns: 2, titleText: 'Actual Expenditure/Income' }
        ]
    });

    $gridList.jqGrid('setFrozenColumns');

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