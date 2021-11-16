
var keyValue = $.request("keyValue");

var keyAccount = $.request("account");

var keyRoleAssigned = $.request("RoleAssigned");

$(function () {
    var validation = new Object();
    validation.RoleID = $.request('RoleID');
    validation.AccountID = keyAccount;
    validation.ClientID = keyValue;
    validation.OperatorID = $.request('UserName');
    validation.Name = $.request('realName');

    $("#form1").formSerialize(validation);

});

function submitForm() {

    var pass = $('#Password').val();

    var passver = $('#vPassword').val();

    if (!$('#form1').formValid()) {

        return false;

    }
    //alert($.md5("I'm Persian."));

    var passhash = $.md5(pass);

    var passverhash = $.md5(passver);

    //alert(passverhash + '=============' + passhash);

    if (passhash != passverhash) {

        $.modalMsg('Password do not match', 'error');

        return false;
    }

    var postData = $("#form1").formSerialize();

    postData["Password"] = passhash;

    postData["vPassword"] = passverhash;

    postData["keyValue"] = keyValue;

    postData["RoleAssigned"] = keyRoleAssigned;

    $.submitForm({
        url: '@Url.Action("SubmitRevisePassword", "Account")',//"/SystemManage/User/SubmitRevisePassword",
        param: postData,
        success: function () {
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}
