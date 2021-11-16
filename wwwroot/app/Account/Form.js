var keyValue = $.request("keyValue");

$(function () {
    initControl();
    if (!!keyValue) {
        $.ajax({
            url: "/Account/GetFormJson",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                $("#form1").formSerialize(data);
                //$("#F_UserPassword").val("******").attr('disabled', 'disabled');
            }
        });
    }
});


function initControl() {

    $("#CountryCode").bindSelect({
        url: "/Search/GetAddressJson",
        search: true,
        param: { CountryID: "", StateID: "", FilterCode: "C" },
        id: "ID",
        text: "Narration"
    });
    $("#SupervisorId").bindSelect({
        url: "/Search/GetSupervisorJson",
        search: true,
        param: { SupervisorId: "", FilterCode: "S" },
        id: "Id",
        text: "Narration"
    });
    $("#WorkWeekId").bindSelect({
        url: "/Search/GetWorkWeekJson",
        search: true,
        param: { },
        id: "Id",
        text: "WorkWeekName"
    });
    $("#CountryCode").change(function () {

        var selectedCountry = $("#CountryCode option:selected").val();

        $("#CityID").bindSelect({
            url: "/Search/GetAddressJson",
            search: true,
            param: { CountryID: selectedCountry, StateID: "", FilterCode: "S" },
            id: "ID",
            text: "Narration"
        });

    });


    $("#CityID").change(function () {

        var selectedCountry = $("#CountryCode option:selected").val();

        var selectedState = $("#CityID option:selected").val();

        $("#Residence").bindSelect({
            url: "/Search/GetAddressJson",
            search: true,
            param: { CountryID: selectedCountry, StateID: selectedState, FilterCode: "CI" },
            id: "ID",
            text: "Narration"
        });

    });


    $("#IdentityTypeID").bindSelect({
        url: "/Search/GetSystemCodeJson",
        search: true,
        param: { FilterCode: "IdentityID" },
        id: "SubCodeID",
        text: "Narration"
    });


    $("#GenderID").bindSelect({
        url: "/Search/GetSystemCodeJson",
        search: true,
        param: { FilterCode: "GenderID" },
        id: "SubCodeID",
        text: "Narration"
    });


    $("#StatusID").bindSelect({
        url: "/Search/GetSystemCodeJson",
        search: true,
        param: { FilterCode: "ClientStatusID" },
        id: "SubCodeID",
        text: "Narration"
    });

}

function submitForm() {
    if (!$('#form1').formValid()) {
        return false;
    }
    $.submitForm({
        url: "/Account/SubmitForm?keyValue=" + keyValue,
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
function capitalize(inputField) {
    inputField.value = inputField.value.replace(/\b([a-z])[a-z]*?/gi, function (letter) {
        return letter.toUpperCase();
    });
}
