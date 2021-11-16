
var keyValue = $.request("keyValue");

var keyRoleID = $.request("RoleID");

$(function () {
    initControl();
    if (!!keyValue) {
        $.ajax({
            url: "/RoleAuthorize/GetFormJson",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                $("#form1").formSerialize(data);
            }
        });
    }
})

function initControl() {

    $('#wizard').wizard().on('change', function (e, data) {
        var $finish = $("#btn_finish");
        var $next = $("#btn_next");
        if (data.direction == "next") {
            switch (data.step) {
                case 1:
                    if (!$('#form1').formValid()) {
                        return false;
                    }
                    $finish.show();
                    $next.hide();
                    break;
                default:
                    break;
            }
        } else {
            $finish.hide();
            $next.show();
        }
    });
    $("#permissionTree").treeview({
        height: 444,
        showcheck: true,
        url: "/RoleAuthorize/GetPermissionTree",
        param: { roleId: keyRoleID }
    });
}
function submitForm() {
    var postData = $("#form1").formSerialize();
    postData["permissionIds"] = String($("#permissionTree").getCheckedNodes());
    $.submitForm({
        url: "/RoleAuthorize/SubmitForm?keyValue=" + keyValue,
        param: postData,
        success: function () {
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    });
}
function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}