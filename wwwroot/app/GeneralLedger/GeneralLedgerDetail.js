
var keyValue = $.request("keyValue");

$(function () {
    initControl();
    $.ajax({
        url: "/SysOperation/GeneralLedger/GetGeneralLedgerForm",
        data: { keyValue: keyValue },
        dataType: "json",
        async: false,
        success: function (data) {
            $("#form1").formSerialize(data);
            $("#form1").find('#GLAccountTypeID,#GLTypeGroupID,input,select').attr('disabled', 'disabled');
        }
    });
});

function initControl() {

    $("#GLAccountTypeID").bindSelect({
        url: "/Search/GetSystemCodeJson",
        search: true,
        param: { FilterCode: "GLAccountTypeID" },
        id: "SubCodeID",
        text: "Narration"
    });

    $("#GLAccountTypeID").change(function () {
        var selectedAccountTypeID = $("#GLAccountTypeID option:selected").val();
        $('#GLTypeGroupID').get(0).selectedIndex = 0;
        $("#GLTypeGroupID").empty();
        $("#GLTypeGroupID").bindSelect({
            url: "/Search/SearchResult",
            search: true,
            param: {
                TableID: "GLAccountTypeID", LanguageID: "en",
                AdvFilterString: "GLAccountTypeID = '" + selectedAccountTypeID + " '"
            },
            id: "GLTypeGroupID",
            text: "Description"
        });

    });

    $("#CurrencyID").bindSelect({
        url: "/Search/SearchResult",
        search: true,
        param: {
            TableID: "CurrencyID", LanguageID: "en"
        },
        id: "CurrencyID",
        text: "CurrencyName"
    });

    $("#CashFlowType").bindSelect({
        url: "/Search/GetSystemCodeJson",
        search: true,
        param: { FilterCode: "CashFlowTypeID" },
        id: "SubCodeID",
        text: "Narration"
    });
}
