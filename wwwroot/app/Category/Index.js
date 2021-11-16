$(function () {
    gridList();
})
function gridList() {
    var $gridList = $("#gridList");
    $gridList.dataGrid({
        url: "/SysCategory/Category/GetCategory",
        height: $(window).height() - 128,
        colModel: [
            { label: "CategoryID", name: "CategoryID", hidden: true, key: true },
            { label: 'CategoryName', name: 'CategoryName', width: $(window).width() * 0.2, align: 'left' },
            { label: 'CategoryTypeID', name: 'CategoryTypeID', width: $(window).width() * 0.1, align: 'left' },
            { label: 'CreatedBy', name: 'CreatedBy', width: $(window).width() * 0.15, align: 'left' },
            {
                label: 'CreatedOn', name: 'CreatedOn', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i' }
            },
            { label: 'ModifiedBy', name: 'ModifiedBy', width: $(window).width() * 0.15, align: 'left' },
            {
                label: 'ModifiedOn', name: 'ModifiedOn', width: $(window).width() * 0.1, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i' }
            }
        ],
        pager: "#gridPager",
        sortname: 'CategoryName asc,CreatedOn desc',
        viewrecords: true
    });
    $("#txt_condition .dropdown-menu li").click(function () {
        var text = $(this).find('a').html();
        var value = $(this).find('a').attr('data-value');
        $("#txt_condition .dropdown-text").html(text).attr('data-value', value)
    });
    $("#btn_search").click(function () {
        var queryJson = {
            condition: $("#txt_condition").find('.dropdown-text').attr('data-value'),
            keyword: $("#txt_keyword").val()
        }
        $gridList.jqGrid('setGridParam', {
            postData: { queryJson: JSON.stringify(queryJson) },
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    $.modalOpen({
        id: "Form",
        title: "Add Category",
        url: "/SysCategory/Category/Form",
        width: "450px",
        height: "360px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}


function btn_edit() {
    var keyValue = $("#gridList").jqGridRowValue().CategoryID;
    var keyCatName = $("#gridList").jqGridRowValue().CategoryName;
    var keyCatType = $("#gridList").jqGridRowValue().CategoryTypeID;
    if ($("#gridList").jqGridRowValue().CategoryID == null ) {

        $.modalMsg('Kindly Select Category To Edit', 'error');

        return false;
    }
    $.modalOpen({
        id: "Form",
        title: "Edit Category",
        url: "/SysCategory/Category/Form?keyValue=" + keyValue + '&keyCatName=' + escape(keyCatName) + '&keyCatType=' + escape(keyCatType),
        width: "450px",
        height: "360px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}

function btn_delete() {

    if ($("#gridList").jqGridRowValue().CategoryID == null) {

        $.modalMsg('Kindly Select Category To Delete', 'error');

        return false;
    }

    $.deleteForm({
        url: "/SysCategory/Category/DeleteForm",
        param: { keyValue: $("#gridList").jqGridRowValue().CategoryID },
        success: function () {
            $.currentWindow().$("#gridList").resetSelection();
            $.currentWindow().$("#gridList").trigger("reloadGrid");
        }
    })
}