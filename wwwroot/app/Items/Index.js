$(function () {

    $('#layout').layout();

    treeView();

    gridList();
});

function treeView() {

    $("#itemTree").treeview({
        url: "/SysCategory/Items/GetCategoryTree",
        onnodeclick: function (item) {
            $("#txt_keyword").val('');
            $('#btn_search').trigger("click");
        }
    });
}

function gridList() {
    var $gridList = $("#gridList");
    $gridList.dataGrid({
        height: $(window).height() - 96,
        colModel: [
            { label: "AccountID", name: "AccountID", hidden: true },
            { label: "ItemID", name: "ItemID", hidden: true },
            { label: 'CategoryID', name: 'CategoryID', width: $(window).width() * 0.1, align: 'left' },
            { label: 'ItemName', name: 'ItemName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'AccountCodeID', name: 'AccountCodeID', width: $(window).width() * 0.1, align: 'left' },
            { label: 'CreatedBy', name: 'CreatedBy', width: $(window).width() * 0.1, align: 'left' },
            {
                label: 'Creation time', name: 'CreatedOn', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
            },
            { label: "ModifiedBy", name: "ModifiedBy", index: "ModifiedBy", width: $(window).width() * 0.1, align: "left", sortable: false },
            {
                label: 'Modified time', name: 'ModifiedOn', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
            }
        ]
    });

    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam', {
            url: "/SysCategory/Items/GetItemGridJson",
            postData: { CategoryID: $("#itemTree").getCurrentNode().id, keyword: $("#txt_keyword").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    
    if ($("#itemTree").getCurrentNode().text == null) {

        $.modalMsg('Kindly Select General ledger Category', 'error');

        return false;
    }
    var categoryid = $("#itemTree").getCurrentNode().id;

    var categoryname = $("#itemTree").getCurrentNode().text;

    var accounttype = $("#itemTree").getCurrentNode().value;
    $.modalOpen({
        id: "Form",
        title: categoryname + "(" + accounttype+") 》New Sub Category>>" ,
        url: "/SysCategory/Items/Form?CategoryId=" + escape(categoryid) + '&CategoryName=' + escape(categoryname) + '&accounttype=' + escape(accounttype),
        width: "530px",
        height: "400px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit() {

    if ($("#itemTree").getCurrentNode().text == null) {

        $.modalMsg('Kindly Select General ledger Category', 'error');

        return false;
    }

    var categoryid = $("#gridList").jqGridRowValue().CategoryID;

    var categoryname = $("#itemTree").getCurrentNode().text;

    var accounttype = $("#itemTree").getCurrentNode().value;

    var keyValue = $("#gridList").jqGridRowValue().ItemID;

    var keyGl = $("#gridList").jqGridRowValue().AccountCodeID;

    var keyItemname = $("#gridList").jqGridRowValue().ItemName;
    
    $.modalOpen({
        id: "Form",
        title: categoryname + "(" + accounttype + ") 》Edit Sub Category",
        url: "/SysCategory/Items/Form?CategoryId=" + escape(categoryid) + '&CategoryName=' + escape(categoryname) + '&accounttype=' + escape(accounttype) + '&keyValue=' + escape(keyValue) + '&Gl=' + escape(keyGl) + '&Itemname=' + escape(keyItemname),
        width: "530px",
        height: "350px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });

}

function btn_delete() {
    $.deleteForm({
        url: "/SysCategory/Items/DeleteForm",
        param: { keyValue: $("#gridList").jqGridRowValue().ItemID},
        success: function () {
            $("#gridList").resetSelection();
            $("#gridList").trigger("reloadGrid");
        }
    })
}
