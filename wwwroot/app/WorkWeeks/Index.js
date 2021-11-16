$(function () {

    gridListWwk();

})

function gridListWwk() {

    var $gridListWwk = $("#gridListWwk");

    $gridListWwk.dataGrid({
        url: '/WorkWeeks/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Work Week Name', name: 'WorkWeekName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Is Default', name: 'IsDefault', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Mon', name: 'Mon', width: $(window).width() * 0.08, align: 'left' },
            { label: 'Tue', name: 'Tue', width: $(window).width() * 0.08, align: 'left' },
            { label: 'Wed', name: 'Wed', width: $(window).width() * 0.08, align: 'left' },
            { label: 'Thu', name: 'Thu', width: $(window).width() * 0.08, align: 'left' },
            { label: 'Fri', name: 'Fri', width: $(window).width() * 0.08, align: 'left' },
            { label: 'Sat', name: 'Sat', width: $(window).width() * 0.08, align: 'left' },
            { label: 'Sun', name: 'Sun', width: $(window).width() * 0.08, align: 'left' },
            {
                label: 'Status', name: 'IsActive', width: $(window).width() * 0.15, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == '1') {
                        return '<span class=\"label label-success\">Active</span>';
                    } else if (cellvalue == '0') {
                        return '<span class=\"label label-default\">Inactive</span>';
                    }
                }
            },
            
        ],
        pager: "#gridPagerWwk",
        sortname: 'Id asc,CalendarYear desc',
        viewrecords: true
    });
    $("#btn_search_wwk").click(function () {
        $gridListWwk.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword_wwk").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add_wwk() {
    $.modalOpen({
        id: "Form",
        title: "Work Week",
        url: "/WorkWeeks/Form",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit_wwk() {
    var keyValue = $("#gridListWwk").jqGridRowValue().Id;
    
    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Work Week",
        url: "/WorkWeeks/Form?keyValue=" + keyValue,
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete_wwk() {

    if ($("#gridListWwk").jqGridRowValue().Id == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.deleteForm({
        url: "/WorkWeeks/DeleteForm",
        param: { keyValue: $("#gridListWwk").jqGridRowValue().Id },
        success: function () {
            $.currentWindow().$("#gridListWwk").trigger("reloadGrid");
        }
    })
}

function btn_details_wwk() {
    var keyValue = $("#gridListWwk").jqGridRowValue().Id;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Details",
        title: "Work Week Details",
        url: "/WorkWeeks/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}


