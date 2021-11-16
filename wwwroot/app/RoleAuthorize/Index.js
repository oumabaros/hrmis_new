$(function () {

    gridList();

})
function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/RoleAuthorize/GetRoleGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'AccountID', name: 'AccountID', hidden: true },
            { label: 'RowID', name: 'RowID', hidden: true },
            { label: 'Role ID', name: 'RoleID', width: $(window).width() * 0.2 },
            { label: 'Role Name', name: 'RoleName', width: $(window).width() * 0.2, align: 'left' },
            {
                label: "Super User", name: "IsSupremeUser", width: $(window).width() * 0.1, align: "center",
                formatter: function (cellvalue) {
                    return cellvalue == true ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                }
            },
            {
                label: "Account Owner", name: "IsAccountMaster", width: $(window).width() * 0.1, align: "center",
                formatter: function (cellvalue) {
                    return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                }
            },
            { label: 'Created By', name: 'CreatedBy', width: $(window).width() * 0.2, align: 'left' },
            {
                label: 'Created On', name: 'CreatedOn', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            }
        ],
        pager: "#gridPager",
        sortname: 'RoleID asc,CreatedOn desc',
        viewrecords: true
    });
    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    $.modalOpen({
        id: "Form",
        title: "Create role",
        url: "/RoleAuthorize/Form",
        width: "550px",
        height: "570px",
        btn: null
    });
}

function btn_edit() {
    var keyValue = $("#gridList").jqGridRowValue().RowID;
    var keyRole = $("#gridList").jqGridRowValue().RoleID;
    $.modalOpen({
        id: "Form",
        title: "Edit Role",
        url: "/RoleAuthorize/Form?keyValue=" + keyValue + "&RoleID=" + keyRole,
        width: "550px",
        height: "570px",
        btn: null
    });
}

function btn_delete() {
    $.deleteForm({
        url: "/RoleAuthorize/DeleteForm",
        param: { keyValue: $("#gridList").jqGridRowValue().RowID },
        success: function () {
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}

function btn_details() {
    var keyValue = $("#gridList").jqGridRowValue().RowID;
    var keyRole = $("#gridList").jqGridRowValue().RoleID;
    $.modalOpen({
        id: "Details",
        title: "Role Details",
        url: "/RoleAuthorize/Info?keyValue=" + keyValue + "&RoleID=" + keyRole,
        width: "550px",
        height: "570px",
        btn: null,
    });
}