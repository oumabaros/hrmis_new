
var keyValue = $.request("keyValue");

$(function () {
    initControl();
    if (!!keyValue) {

        var data = new Object();

        data.CategoryID = $.request('CategoryId');

        data.CategoryName = $.request('CategoryName');

        data.ItemID = keyValue;

        data.AccountCodeID = $.request('Gl');

        data.ItemName = $.request('Itemname');

        $("#form1").formSerialize(data);

    }
});

function initControl() {

    var onload = new Object();

    onload.CategoryID = $.request('CategoryId');

    onload.CategoryName = $.request('CategoryName');

    $("#form1").formSerialize(onload);


    $("#AccountCodeID").bindSelect({
        url: "/Search/SearchResult",
        search: true,
        param: {
            TableID: "AccountCodeID", LanguageID: "en",
            AdvFilterString: "GLAccountTypeID = '" + $.request('accounttype') + " '"
        },
        id: "AccountCodeID",
        text: "AccountName"
    });
}


function submitForm() {
    if (!$('#form1').formValid()) {

        return false;
    }
    $.submitForm({
        url: "/SysCategory/Items/Submit?keyValue=" + keyValue,
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridList").resetSelection();
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}