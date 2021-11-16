$(function () {

    gridListSys();

})

function gridListSys() {

    var $gridListSys = $("#gridListSys");

    $gridListSys.dataGrid({
        url: '/SystemSettings/GetClientGridJson',
        height: $(window).height() - 128,
        colModel: [
            { label: 'Id', name: 'Id', hidden: true, align: 'left' },
            { label: 'Country', name: 'CountryName', width: $(window).width() * 0.4, align: 'left' },
            { label: 'Currency', name: 'CurrencyName', width: $(window).width() * 0.4, align: 'left' },
            {
                label: 'Status', name: 'IsActive', width: $(window).width() * 0.4, align: 'left',
                formatter: function (cellvalue, options, rowObject) {
                    if (cellvalue == '1') {
                        return '<span class=\"label label-success\">Active</span>';
                    } else if (cellvalue == '0') {
                        return '<span class=\"label label-default\">Inactive</span>';
                    }
                }
            },
            
        ],
        pager: "#gridPagerSys",
        sortname: 'Id asc,CalendarYear desc',
        viewrecords: true
    });
    $("#btn_search_sys").click(function () {
        $gridListSys.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword_sys").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add_sys() {
    $.modalOpen({
        id: "Form",
        title: "System Settings",
        url: "/SystemSettings/Form",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_edit_sys() {
    var keyValue = $("#gridListSys").jqGridRowValue().Id;
    
    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Form",
        title: "Edit Setting",
        url: "/SystemSettings/Form?keyValue=" + keyValue,
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete_sys() {

    if ($("#gridListSys").jqGridRowValue().Id == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.deleteForm({
        url: "/SystemSettings/DeleteForm",
        param: { keyValue: $("#gridListSys").jqGridRowValue().Id },
        success: function () {
            $.currentWindow().$("#gridListSys").trigger("reloadGrid");
        }
    })
}

function btn_details_sys() {
    var keyValue = $("#gridListSys").jqGridRowValue().Id;

    if (keyValue == null) {

        $.modalMsg('No record Selected from the Grid', 'error');

        return false;
    }

    $.modalOpen({
        id: "Details",
        title: "System Settings",
        url: "/SystemSettings/Details?keyValue=" + keyValue,
        width: "700px",
        height: "550px",
        btn: null,
    });
}


