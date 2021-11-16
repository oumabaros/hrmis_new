$(function () {

    $('#layout').layout();

    treeView();

    gridList();
});

function treeView() {

    $("#itemTree").treeview({
        url: "/SysOperation/GeneralLedger/GetAccountTypeTreeJson",
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
            { label: 'GLTypeID', name: 'GLAccountTypeID', width: 80, align: 'left' },
            { label: 'GLSubTypeID', name: 'GLTypeGroupID', width: 80, align: 'left' },
            { label: 'Description', name: 'Description', width: 200, align: 'left' },
            { label: 'CreatedBy', name: 'CreatedBy', width: 150, align: 'left' },
            {
                label: 'Creation time', name: 'CreatedOn', width: 80, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
            },
            { label: "ModifiedBy", name: "ModifiedBy", index: "ModifiedBy", width: 180, align: "left", sortable: false },
            {
                label: 'Modified time', name: 'ModifiedOn', width: 80, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
            }
        ]
    });
    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam', {
            url: "/SysOperation/GeneralLedger/GetGLSubTypeGroupGridJson",
            postData: { GLAccountTypeID: $("#itemTree").getCurrentNode().id, keyword: $("#txt_keyword").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    if ($("#itemTree").getCurrentNode().text == null) {

        $.modalMsg('Kindly Select General ledger Category', 'error');

        return false;
    }
    var gltypeId = $("#itemTree").getCurrentNode().id;

    var gltypeName = $("#itemTree").getCurrentNode().text;

    $.modalOpen({
        id: "Form",
        title: gltypeName + " 》New General Ledger Sub-Category",
        url: "/SysOperation/GeneralLedger/Form?gltypeId=" + escape(gltypeId) + '&gltypeName=' + escape(gltypeName),
        width: "530px",
        height: "350px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit() {

    if ($("#itemTree").getCurrentNode().id == null) {

        $.modalMsg('Kindly Select General ledger Category', 'error');

        return false;
    }
    var gltypeId = $("#itemTree").getCurrentNode().id;

    var gltypeName = $("#itemTree").getCurrentNode().text;

    var keyValue = $("#gridList").jqGridRowValue().GLTypeGroupID;

    var name = $("#gridList").jqGridRowValue().Description;

    $.modalOpen({
        id: "Form",
        title: gltypeName + " 》Edit General Ledger Sub-Category",
        url: "/SysOperation/GeneralLedger/Form?gltypeId=" + escape(gltypeId) + '&gltypeName=' + escape(gltypeName) + '&keyValue=' + escape(keyValue) + '&name=' + escape(name),
        width: "530px",
        height: "350px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });

}

function btn_delete() {
    $.deleteForm({
        url: "/SysOperation/GeneralLedger/DeleteForm",
        param: { keyValue: $("#gridList").jqGridRowValue().GLTypeGroupID, keyGlTypeID: $("#itemTree").getCurrentNode().id },
        success: function () {
            $("#gridList").resetSelection();
            $("#gridList").trigger("reloadGrid");
        }
    })
}

function btn_glsubaccounttype() {

    var keyAcType = $("#itemTree").getCurrentNode().id;

    var keyAcgroup = $("#gridList").jqGridRowValue().GLTypeGroupID;

    var keyName = $("#gridList").jqGridRowValue().Description;

    $.modalOpen({
        id: "glsubaccounttype",
        title: keyName + " 》Sub Account Type",
        url: "/SysOperation/GeneralLedger/SubAcIndex?keyAcType=" + keyAcType + '&keyAcgroup=' + escape(keyAcgroup) + '&gltypeName=' + escape(keyName),
        width: "950px",
        height: "440px",
        btn: null,
    });
}