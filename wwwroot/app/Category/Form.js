var keyValue = $.request("keyValue");
$(function () {
    initControl();
    if (!!keyValue) {

        var data = new Object();

        data.CategoryID = keyValue;

        data.CategoryTypeID = $.request("keyCatType");

        data.CategoryName = $.request("keyCatName");

        $("#form1").formSerialize(data);
    }
});
function initControl() {
    $("#CategoryTypeID").bindSelect({
        url: "/Search/GetSystemCodeJson",
        search: true,
        param: { FilterCode: "GLAccountTypeID" },
        id: "SubCodeID",
        text: "Narration"
    });
}
function submitForm() {
    if (!$('#form1').formValid()) {
        return false;
    }
    $.submitForm({
        loading: "Saving Category...",
        url: "/SysCategory/Category/SubmitCategory?keyValue=" + keyValue,
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}

function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}