$(function () {

    gridListNotifs();

})

function gridListNotifs() {

    var $gridListNotifs = $("#gridListNotifs")

    $gridListNotifs.dataGrid({
        url: '/Notifications/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Notification Name', name: 'NotificationName', width: $(window).width() * 0.15, align: 'left' },
            { label: 'Description', name: 'Description', width: $(window).width() * 0.20, align: 'left' },
            { label: 'Email', name: 'Email', width: $(window).width() * 0.1, align: 'left' },
            { label: 'SMS', name: 'SMS', width: $(window).width() * 0.1, align: 'left' },
                       
            {
                label: 'Status', name: 'IsActive', width: $(window).width() * 0.1, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == '1') {
                        return '<span class=\"label label-success\">Active</span>';
                    } else if (cellvalue == '0') {
                        return '<span class=\"label label-default\">Inactive</span>';
                    }
                }
            },
            
        ],
        pager: "#gridPagerNotifs",
        sortname: 'Id asc,NotificationName desc',
        viewrecords: true
    });
    $("#btn_search_notifs").click(function () {
        $gridListHols.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword_notifs").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add_notifs() {
    $.modalOpen({
        id: "Form",
        title: "Notifications",
        url: "/Notifications/Form",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit_notifs() {
    var keyValue = $("#gridListNotifs").jqGridRowValue().Id;
    
    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Notifications",
        url: "/Notifications/Form?keyValue=" + keyValue,
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete_notifs() {

    if ($("#gridListNotifs").jqGridRowValue().Id == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.deleteForm({
        url: "/Notifications/DeleteForm",
        param: { keyValue: $("#gridListNotifs").jqGridRowValue().Id },
        success: function () {
            $.currentWindow().$("#gridListNotifs").trigger("reloadGrid");
        }
    })
}

function btn_details_notifs() {
    var keyValue = $("#gridListNotifs").jqGridRowValue().Id;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Details",
        title: "Notification Details",
        url: "/Notifications/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}
