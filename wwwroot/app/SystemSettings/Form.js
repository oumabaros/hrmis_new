var keyValue = $.request("keyValue");

$(function () {
    initControl();
    if (!!keyValue) {
        $.ajax({
            url: "/SystemSettings/GetFormJson",
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
    $("#CountryId").bindSelect({
        url: "/Search/GetCountriesJson",
        search: true,
        param: {},
        id: "Id",
        text: "CountryName"
    });

    $("#CurrencyId").bindSelect({
        url: "/Search/GetCurrencyJson",
        search: true,
        param: {},
        id: "CurrencyID",
        text: "CurrencyName"
    });
}

function submitForm() {
    if (!$('#form1').formValid()) {
        return false;
    }
    $.submitForm({
        url: "/SystemSettings/SubmitForm?keyValue=" + keyValue,
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridListSys").trigger("reloadGrid");
        }
    })
}

function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}
function capitalize(inputField) {
    inputField.value = inputField.value.replace(/\b([a-z])[a-z]*?/gi, function (letter) {
        return letter.toUpperCase();
    });
}

