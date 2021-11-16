
var keyValue = $.request("keyValue");

$(function () {
    initControl();
    if (!!keyValue) {

        var data = new Object();

        data.GLAccountTypeID = $.request('gltypeId');

        data.GLAccountType = $.request('gltypeName');

        data.GLTypeGroupID = keyValue;

        data.Description = $.request('name');

        $("#form1").formSerialize(data);

    }
});

function initControl() {

    var onload = new Object();

    onload.GLAccountTypeID = $.request('gltypeId');

    onload.GLAccountType = $.request('gltypeName');

    $("#form1").formSerialize(onload);
}


function submitForm() {
    if (!$('#form1').formValid()) {

        return false;
    }
    $.submitForm({
        url: "/SysOperation/GeneralLedger/SubmitForm?keyValue=" + keyValue,
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridList").resetSelection();
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}