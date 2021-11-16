$(function () {
    gridListSubscribers();
})
var subs = {};

function gridListSubscribers() {

    var $gridListSubscribers = $("#gridListSubscribers")

    $gridListSubscribers.dataGrid({
        url: '/StatusSubscribers/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Subscriber Name', name: 'SubscriberName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Created By', name: 'CreatedBy', width: $(window).width() * 0.3, align: 'left' },
            {
                label: 'Created', name: 'CreatedOn', width: $(window).width() * 0.2, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
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
        pager: "#gridPagerStatusSubscribers",
        sortname: 'Id asc,SubscriberName desc',
        viewrecords: true
    });
    $("#btn_search_subscribers").click(function () {
        $gridListSubscribers.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword_status").val() },
        }).trigger('reloadGrid');
    });
}
function loadStatus() {
    $.ajax({
        url: "/ProcessStatus/GetDataJson",
        data: {},
        dataType: "json",
        async: false,
        success: function (data) {
            subs = data;
        }
    });
}
function btn_add_subscribers() {
    
    $.modalOpen({
        id: "Form",
        title: "Subscribers",
        url: "/StatusSubscribers/Form",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
    loadStatus();
}

function btn_edit_subscribers() {
    var keyValue = $("#gridListSubscribers").jqGridRowValue().Id;
    
    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Subscribers",
        url: "/StatusSubscribers/Form?keyValue=" + keyValue,
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_deactivate_subscribers() {

    if ($("#gridListSubscribers").jqGridRowValue().Id == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.deleteForm({
        url: "/StatusSubscribers/DeleteForm",
        param: { keyValue: $("#gridListSubscribers").jqGridRowValue().Id },
        success: function () {
            $.currentWindow().$("#gridListSubscribers").trigger("reloadGrid");
        }
    })
}

function btn_details_subscribers() {
    var keyValue = $("#gridListSubscribers").jqGridRowValue().Id;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Details",
        title: "Subscribers Details",
        url: "/StatusSubscribers/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}


