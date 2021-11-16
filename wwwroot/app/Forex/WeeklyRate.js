$(function () {

    gridList();

})

function gridList() {

    var $gridList = $("#gridList");

    $gridList.dataGrid({
        url: '/SysForex/Forex/GetWeeklyExchageRateGrid',
        height: $(window).height() - 128,
        colModel: [
            { label: 'AccountID', name: 'AccountID', hidden: true },
            { label: 'Exchange Currency ID', name: 'FromCurrencyID', width: 150, align: 'left' },
            { label: 'Exchange Currency', name: 'FromCurrency', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Base Currency ID', name: 'ToCurrencyID', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Base Currency', name: 'ToCurrency', width: $(window).width() * 0.1, align: 'left' },
            { label: 'Sunday', name: 'Sunday', width: 80, align: 'left' },
            { label: 'Monday', name: 'Monday', width: 80, align: 'left' },
            { label: 'Tuesday', name: 'Tuesday', width: 80, align: 'left' },
            { label: 'Wednesday', name: 'Wednesday', width: 80, align: 'left' },
            { label: 'Thursday', name: 'Thursday', width: 80, align: 'left' },
            { label: 'Friday', name: 'Friday', width: 80, align: 'left' },
            { label: 'Saturday', name: 'Saturday', width: 80, align: 'left' }
        ],
        pager: "#gridPager",
        sortname: 'ProcessDate desc',
        viewrecords: true
    });
    $("#btn_search").click(function () {
        $gridList.jqGrid('setGridParam', {
            postData: { Year: $("#CurrenyTime").val()},
        }).trigger('reloadGrid');
    });
}

function btn_add() {
    $.modalOpen({
        id: "Form",
        title: "Populate Historical Exchange Rates",
        url: "/SysForex/Forex/PopulateHistoricalRate",
        width: "450px",
        height: "340px",
        callBack: function (iframeId) {
            top.frames[iframeId].submitForm();
        }
    });
}
