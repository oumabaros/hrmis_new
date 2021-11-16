var keyValue = $.request("SubGroupID");
var keySubAccountName = $.request("SubAccountName");
var keySubAccountType = $.request("GLAccountTypeID");
var keySubAccountGroup = $.request("GLTypeGroupID");

$(function () {

    initControl();

    if (!!keyValue) {

        var data = new Object();

        data.GLAccountTypeID = keySubAccountType;

        data.GLTypeGroupID = keySubAccountGroup;

        data.SubAccountName = keySubAccountName;

        data.GLSubAccountTypeID = keyValue;

        data.Description = $.request("Desc");

        $("#form1").formSerialize(data);

    }
});
function initControl() {

    var onload = new Object();

    onload.GLAccountTypeID = keySubAccountType;

    onload.GLTypeGroupID = keySubAccountGroup;

    onload.SubAccountName = keySubAccountName;

    $("#form1").formSerialize(onload);

}
function submitForm() {
    if (!$('#form1').formValid()) {
        return false;
    }
    var postData = $("#form1").formSerialize();
    $.submitForm({
        url: "/SysOperation/GeneralLedger/SubmitSubAC?keyValue=" + keyValue,
        param: postData,
        success: function () {
            top.glsubaccounttype.$("#gridList").resetSelection();
            top.glsubaccounttype.$("#gridList").trigger("reloadGrid");
        }
    })
}