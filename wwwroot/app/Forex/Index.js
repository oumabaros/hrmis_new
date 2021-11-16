$(function () {

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/SysForex/Forex/GetExchageRateGrid',
        height: $(window).height() - 128,
        colModel: [
            { label: 'AccountID', name: 'AccountID', hidden: true },
            { label: 'Exchange Currency ID', name: 'FromCurrencyID', width: 150, align: 'left' },
            { label: 'Exchange Currency', name: 'FromCurrency', width: 150, align: 'left' },
            { label: 'Base Currency ID', name: 'ToCurrencyID', width: 100, align: 'left' },
            { label: 'Base Currency', name: 'ToCurrency', width: 150, align: 'left' },
            {
                label: 'Exchange Date', name: 'ProcessDate', width: 100, align: 'left',
                formatter: "date", formatoptions: { srcformat: 'Y-m-d ', newformat: 'Y-m-d ' }
            },
            { label: 'BaseRate', name: 'BaseRate', width: $(window).width() * 0.1, align: 'left' }
        ],
        pager: "#gridPager",
        sortname: 'ProcessDate desc',
        viewrecords: true
    });

    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam', {
            postData: { keyword: $("#txt_keyword").val(), startdate: $("#startDate").val(), todate: $("#endDate").val() },
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    $.modalOpen({
        id: "Form",
        title: "Realtime Exchange Rate",
        url: "/SysForex/Forex/LiveExchangeRate",
        width: "700px",
        height: "510px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}
