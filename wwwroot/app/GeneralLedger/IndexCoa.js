
$(function () {
    gridList();
})

function gridList() {
    var $gridList = $("#gridList");
    $gridList.dataGrid({
        treeGrid: true,
        treeGridModel: "adjacency",
        ExpandColumn: "AccountGroup",
        url: "/SysOperation/GeneralLedger/GetCOATreeGridJson",
        height: $(window).height() - 96,
        colModel: [
            { label: "AccountID", name: "F_Id", hidden: true, key: true },
            { label: "AccountSubGroupID", name: "AccountSubGroupID", hidden: true },
            { label: 'Account Code', name: 'AccountCode', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Account Name', name: 'AccountName', width: $(window).width() * 0.3, align: 'left' },
            { label: 'Account Group', name: 'AccountGroup', width: $(window).width() * 0.2, align: 'left' },
            { label: 'Account Type', name: 'AccountType', width: $(window).width() * 0.2, align: 'left' }
        ]
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
        title: "Add General Ledger Account",
        url: "/SysOperation/GeneralLedger/GLMaintenance",
        width: "700px",
        height: "440px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit() {
    var keyValue = $("#gridList").jqGridRowValue().AccountCode;
    if ($("#gridList").jqGridRowValue().AccountCode == null || $("#gridList").jqGridRowValue().AccountSubGroupID==1) {

        $.modalMsg('Kindly Select General ledger To Edit', 'error');

        return false;
    }
    $.modalOpen({
        id: "Form",
        title: "Edit General Ledger",
        url: "/SysOperation/GeneralLedger/GLMaintenance?keyValue=" + keyValue,
        width: "700px",
        height: "440px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete() {
   
    if ($("#gridList").jqGridRowValue().AccountCode == null || $("#gridList").jqGridRowValue().AccountSubGroupID == 1) {

        $.modalMsg('Kindly Select General ledger To Edit', 'error');

        return false;
    }

    $.deleteForm({
        url: "/SysOperation/GeneralLedger/DeleteGeneralLedger",
        param: { keyValue: $("#gridList").jqGridRowValue().AccountCode },
        success: function () {
            $.currentWindow().$("#gridList").resetSelection();
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}

function btn_details() {
    var keyValue = $("#gridList").jqGridRowValue().AccountCode;
    $.modalOpen({
        id: "Details",
        title: "General Ledger Detail",
        url: "/SysOperation/GeneralLedger/GeneralLedgerDetail?keyValue=" + keyValue,
        width: "700px",
        height: "490px",
        btn: null,
    });
}