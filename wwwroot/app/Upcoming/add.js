var dataJson = top.clients.user;
var accounttype = 'A';
var accountgroup = '10';
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

    var AdvFilterArr = new Array();

    AdvFilterArr[0] = "GLAccountTypeID in (\'" + accounttype + "\')";

    AdvFilterArr[1] = "GLTypeGroupID ='" + accountgroup + "'";

    AdvFilterArr[1] = "AccountID ='" + dataJson.AccountID + "'";

    var filter = AdvFilterArr.toString().replace(/\,/g, ' AND ')

    console.log(dataJson);

    fnSetMessage(dataJson.CurrencyID);

    //$("#TrxDate").WdatePicker({ skin: 'whyGreen', maxDate: '%y-%M-%d' });//max today

    $("#TrxTypeID").bindSelect({
        url: "/Search/GetSystemCodeJson",
        search: true,
        param: { FilterCode: "TrxTypeID" },
        id: "SubCodeID",
        text: "Narration"
    });

    $("#ContraGLID").bindSelect({
        url: "/Search/SearchResult",
        search: true,
        param: {
            TableID: "AccountCodeID", LanguageID: "en",
            AdvFilterString: filter
        },
        id: "AccountCodeID",
        text: "AccountName"
    });

    $("#CategoryID").bindSelect({
        url: "/Search/SearchResult",
        search: true,
        param: {
            TableID: "CategoryID", LanguageID: "en",
            AdvFilterString: "AccountID = '" + dataJson.AccountID + " '"
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
        $('#ItemID').get(0).selectedIndex = 0;
        $("#ItemID").empty();
        $("#ItemID").bindSelect({
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

    $("#TrxCurrencyID").bindSelect({
        url: "/Search/SearchResult",
        search: true,
        param: {
            TableID: "CurrencyID", LanguageID: "en",
            AdvFilterString: "AccountID = '" + dataJson.AccountID + " '"
        },
        id: "CurrencyID",
        text: "CurrencyName"
    });

    $("#TrxCurrencyID").change(function () {

        var selectedcur = $("#TrxCurrencyID option:selected").val();

        if (selectedcur == '0' || selectedcur == dataJson.CurrencyID) {

            console.log(selectedcur);

            $('#ExchangeRate').val('1');

            document.getElementById('trxCurrencySysmbol').textContent = dataJson.CurrencyID;
        }
        else {

            var keySearch = selectedcur + '_' + dataJson.CurrencyID

            console.log(keySearch);

            document.getElementById('trxCurrencySysmbol').textContent = selectedcur;

            var result = $.callPostAjax({
                url: "/SysTransaction/Upcoming/ExchangeRate",
                param: { ExchangeRate: keySearch }
            });

            result.success(function (data) {

                console.log(data);

                if (data.success) {

                    $('#ExchangeRate').val(data.data);

                }
            });
        }
    });

}

function submitForm() {

    if (!$('#form1').formValid()) {
        return false;
    }

    $.submitForm({
        url: "/SysTransaction/Upcoming/SubmitForm",
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridList").resetSelection();
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}

function blurChange(num) {
    var extRate = $("#ExchangeRate").val();
    var numrate = parseFloat(extRate).toFixed(4);
    var numamt = parseInt(num.replace(/\,/g, ''), 10);

    $('#TrxAmount').val($.moneyFormat(numamt));

    $('#LocalAmount').val($.moneyFormat(numamt * numrate));
}

function changeChange(num) {

    var cRate = $("#ExchangeRate").val();

    var cnumrate = parseFloat(cRate).toFixed(4);

    var numamt = parseInt(num.replace(/\,/g, ''), 10);

    $('#LocalAmount').val($.moneyFormat(numamt * cnumrate));
}

function txtTrxCurrency_KeyDown(oEdit, newText, oEvent) {
    //if (BRtxtTrxCurrency.IDControl_ID.Element.disabled == false) {
    //    BRtxtTrxCurrency.setControlStatusToFalse(newText);
    //    if (newText != 113)
    //        return false;
    //    var AdvFilterArr = new Array();
    //    BRtxtTrxCurrency.BrModule = "TrxAllowedCurrencyID"; //TrxAllowedCurrencyID
    //    //if foreign currency allow only that currency & local currency
    //    if (gLocalCurrency.toUpperCase() != fnCheckNull(dtBHSTransactions.Rows[0].CurrencyID).toUpperCase()
    //        || fnCheckNull(fnGetValue("cboAccountType")).toUpperCase() == "G") {
    //        BRtxtTrxCurrency.BrModule = "CurrencyID";
    //        AdvFilterArr[0] = " CurrencyID in (\'" + fnCheckNull(dtBHSTransactions.Rows[0].CurrencyID).toUpperCase()
    //            + "\',\'" + gLocalCurrency + "\')";
    //        BRtxtTrxCurrency.F2KeyHelp(AdvFilterArr);
    //    }
    //    else {
    //        AdvFilterArr[0] = "ProductID in (\'" + fnCheckNull(dtBHSTransactions.Rows[0].ProductID).toUpperCase() + "\')";//,\'\'
    //        AdvFilterArr[1] = "OurBranchID ='" + fnGetValue("_BranchID") + "'";
    //        BRtxtTrxCurrency.F2KeyHelp(AdvFilterArr);
    //    }
    //    BRtxtTrxCurrency.setControlStatusToFalse(newText);
    //}
}

function fnSetMessage(strMessage) {

    document.getElementById('LocalCurrencySysmbol').textContent = strMessage;
}
