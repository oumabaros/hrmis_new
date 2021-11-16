var keyValue = $.request("keyValue");

$(function () {

    if (!!keyValue) {
        $.ajax({
            url: "/LeaveTransactions/LeaveTransactionDetails",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                $("#form2").formSerialize(data);
               
            }
        });
    }
});

function btn_docs() {
    $.session.set("s_docs", $("#Id").val());
   
    if ($("#Id").val() == null) {

        $.modalMsg('No Documents Exist', 'error');

        return false;
    }
    
    $.modalOpen({
        id: "SupportingDocuments",
        title: "Supporting Documents",
        url: "/LeaveTransactions/SupportingDocuments",
        width: "700px",
        height: "550px",
        btn: null,
    });
}