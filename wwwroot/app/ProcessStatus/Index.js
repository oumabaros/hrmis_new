$(function () {
    gridListStatus();
})

function gridListStatus() {

    var $gridListStatus = $("#gridListStatus")

    $gridListStatus.dataGrid({
        url: '/ProcessStatus/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Status Name', name: 'StatusName', width: $(window).width() * 0.1, align: 'left' },
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
        pager: "#gridPagerStatus",
        sortname: 'Id asc,StatusName desc',
        viewrecords: true
    });
    $("#btn_search_status").click(function () {
        $gridListStatus.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword_status").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add_status() {
    $.modalOpen({
        id: "Form",
        title: "Process Status",
        url: "/ProcessStatus/Form",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit_status() {
    var keyValue = $("#gridListStatus").jqGridRowValue().Id;
    
    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Status",
        url: "/ProcessStatus/Form?keyValue=" + keyValue,
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_deactivate_status() {

    if ($("#gridListStatus").jqGridRowValue().Id == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.deleteForm({
        url: "/ProcessStatus/DeleteForm",
        param: { keyValue: $("#gridListStatus").jqGridRowValue().Id },
        success: function () {
            $.currentWindow().$("#gridListStatus").trigger("reloadGrid");
        }
    })
}

function btn_details_status() {
    var keyValue = $("#gridListStatus").jqGridRowValue().Id;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Details",
        title: "Status Details",
        url: "/ProcessStatus/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}


