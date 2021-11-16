var keyValue = $.request("keyValue");
$(function () {
    initControl();
    $.ajax({
        url: "/Account/GetFormJson",
        data: { keyValue: keyValue },
        dataType: "json",
        async: false,
        success: function (data) {
            $("#form1").formSerialize(data);
            $("#form1").find('.form-control,select,input').attr('readonly', 'readonly');
            $("#form1").find('div.ckbox label').attr('for', '');
            $("#F_UserPassword").val("******");
        }
    });
});
function initControl() {

    $("#CountryCode").bindSelect({
        url: "/Search/GetAddressJson",
        search: true,
        param: { CountryID: "", StateID: "", FilterCode: "C" },
        id: "ID",
        text: "Narration"
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