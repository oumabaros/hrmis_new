var dataJson = top.clients.user;
var incometype = 'I';
var expensetype = 'E';
var keyValue = $.request("keyValue");

$(function () {
    initControl();
    if (!!keyValue) {
        $.ajax({
            url: "/SystemManage/Module/GetFormJson",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                $("#form1").formSerialize(data);
            }
        });
    }
});

function initControl() {

    console.log(dataJson);

    $("#BudgetTypeID").bindSelect({
        url: "/Search/GetSystemCodeJson",
        search: true,
        param: { FilterCode: "RecurrenceID" },
        id: "SubCodeID",
        text: "Narration"
    });


    $("#CategoryID").bindSelect({
        url: "/Search/SearchResult",
        search: true,
        param: {
            TableID: "CategoryID", LanguageID: "en",
            AdvFilterString: " CategoryTypeID IN (\'" + incometype + "\',\'" + expensetype + "\') AND " + " AccountID ='" + dataJson.AccountID + "'"
        },
        id: "CategoryID",
        text: "CategoryName"
    });

    $("#CategoryID").change(function () {
        var selectedcat = $("#CategoryID option:selected").val();
        var ItemFilterArr = new Array();
        ItemFilterArr[0] = "AccountID ='" + dataJson.AccountID + "'";
        ItemFilterArr[1] = "CategoryID ='" + selectedcat + "'";
        var ITfilter = ItemFilterArr.toString().replace(/\,/g, ' AND ')
        $('#GlAccountID').get(0).selectedIndex = 0;
        $("#GlAccountID").empty();
        $("#GlAccountID").bindSelect({
            url: "/Search/SearchResult",
            search: true,
            param: {
                TableID: "ItemID", LanguageID: "en",
                AdvFilterString: ITfilter
            },
            id: "ItemID",
            text: "ItemName"
        });

    });


}

function submitForm() {

    if (!$('#form1').formValid()) {
        return false;
    }

    $.submitForm({
        url: "/SysBudget/Budget/SubmitForm",
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridList").resetSelection();
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}

function blurChange(num) {

    var numamt = parseInt(num.replace(/\,/g, ''), 10);

    $('#TotalBudget').val($.moneyFormat(numamt));
}


