var drGLAccountTypeID = $.request("keyAcType");
var drGLTypeGroupID = $.request("keyAcgroup");
var drGLTypeGroupName = $.request("gltypeName");
var dsSubGroupID ;

$(function () {

    gridList();

})

function gridList() {

    $("#gridList").dataGrid({
        url: "/SysOperation/GeneralLedger/GetGLAcSubTypeGridJson?GLAccountTypeID=" + drGLAccountTypeID + '&GLTypeGroupID=' + escape(drGLTypeGroupID),
        height: $(window).height() - 90,
        colModel: [
            { label: "GLAccountTypeID", name: "GLAccountTypeID", hidden: true },
            { label: "GLTypeGroupID", name: "GLTypeGroupID", hidden: true },
            { label: 'AccountType', name: 'GLAccountTypeDesc', width: 100, align: 'left' },
            { label: 'AccountGroup', name: 'GLTypeGroupDesc', width: 120, align: 'left' },
            { label: 'SubGroupID', name: 'GLSubAccountTypeID', width: 100, align: 'left' },
            { label: 'Description', name: 'Description', width: 230, align: 'left' },
            { label: 'CreatedBy', name: 'CreatedBy', width: 150, align: 'left' },
            {
                label: 'Creation time', name: 'CreatedOn', width: 80, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d', newformat: 'Y-m-d' }
            }
        ]
    });

}

function btn_add() {

    $.modalOpen({
        id: "Form",
        title: "Add Gl SUB-Group For》" + drGLTypeGroupName,
        url: "/SysOperation/GeneralLedger/SubAcForm?GLAccountTypeID=" + drGLAccountTypeID + '&GLTypeGroupID=' + escape(drGLTypeGroupID) + '&SubGroupID=' + escape(dsSubGroupID) + '&SubAccountName=' + escape(drGLTypeGroupName),
        width: "400px",
        height: "360px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit() {
    drGLAccountTypeID = $("#gridList").jqGridRowValue().GLAccountTypeID;
    drGLTypeGroupID = $("#gridList").jqGridRowValue().GLTypeGroupID;

    if ($("#gridList").jqGridRowValue().GLSubAccountTypeID==null) {

        $.modalMsg('Kindly Select General ledger Category', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Gl SUB-Group》" +drGLTypeGroupID,
        url: "/SysOperation/GeneralLedger/SubAcForm?GLAccountTypeID=" + drGLAccountTypeID + '&GLTypeGroupID=' + escape(drGLTypeGroupID) + '&SubGroupID=' + $("#gridList").jqGridRowValue().GLSubAccountTypeID + '&SubAccountName=' + escape(drGLTypeGroupName) + '&Desc=' + $("#gridList").jqGridRowValue().Description,
        width: "450px",
        height: "360px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete() {
    $.deleteForm({
        url: "/SysOperation/GeneralLedger/DelSubAC",
        param: {
            GLAccountTypeID: $("#gridList").jqGridRowValue().GLAccountTypeID,
            GLTypeGroupID: $("#gridList").jqGridRowValue().GLTypeGroupID,
            GLSubAccountTypeID: $("#gridList").jqGridRowValue().GLSubAccountTypeID
        },
        success: function () {
            $("#gridList").resetSelection();
            $("#gridList").trigger("reloadGrid");
        }
    })
}

