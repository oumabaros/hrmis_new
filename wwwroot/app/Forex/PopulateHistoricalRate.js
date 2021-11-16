
var keyValue = $.request("keyValue");

$(function () {
    initControl();
});

function initControl() {

}

function submitForm() {
    if (!$('#form1').formValid()) {

        return false;
    }
    $.submitForm({
        url: "/SysForex/Forex/GenerateCurrencyRate",
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridList").resetSelection();
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}