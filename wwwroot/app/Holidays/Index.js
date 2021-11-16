$(function () {

    gridListHols();

})

function gridListHols() {

    var $gridListHols = $("#gridListHols")

    $gridListHols.dataGrid({
        url: '/Holidays/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Calendar Year', name: 'CalendarYear', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Country Name', name: 'CountryName', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Holiday Name', name: 'HolidayName', width: $(window).width() * 0.1, align: 'left' },
            {
                label: 'Holiday Date', name: 'HolidayDate', width: $(window).width() * 0.15, align: 'left',
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
        pager: "#gridPagerHols",
        sortname: 'Id asc,CalendarYear desc',
        viewrecords: true
    });
    $("#btn_search_hols").click(function () {
        $gridListHols.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword_hols").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add_hols() {
    $.modalOpen({
        id: "Form",
        title: "Holidays",
        url: "/Holidays/Form",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit_hols() {
    var keyValue = $("#gridListHols").jqGridRowValue().Id;
    
    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Holiday",
        url: "/Holidays/Form?keyValue=" + keyValue,
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete_hols() {

    if ($("#gridListHols").jqGridRowValue().Id == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.deleteForm({
        url: "/Holidays/DeleteForm",
        param: { keyValue: $("#gridListHols").jqGridRowValue().Id },
        success: function () {
            $.currentWindow().$("#gridListHols").trigger("reloadGrid");
        }
    })
}

function btn_details_hols() {
    var keyValue = $("#gridListHols").jqGridRowValue().Id;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Details",
        title: "Holiday Details",
        url: "/Holidays/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}


