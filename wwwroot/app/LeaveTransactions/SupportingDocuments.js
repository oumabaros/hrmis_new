$(function () {
    console.log("Host Name: " + document.location.hostname);
    var baseUrl = $("#baseUrl").val();
    if (!!$.session.get("s_docs")) {
        $.ajax({
            url: "/LeaveTransactions/GetSupportingDocuments",
            data: { keyValue: $.session.get("s_docs") },
            dataType: "json",
            async: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#doc").append("<tr id=tr_" + i + "></tr>");
                    $("#tr_" + i).append("<td>" + (i + 1) + "</td><td><a href=" + baseUrl + "/documents/" + data[i]["SupportingDocumentUrl"] + " target='_blank'><span style='cursor:pointer;color:cornflowerblue'>" + data[i]["SupportingDocumentUrl"] +"</span></a></td>");
                    
                }
                
            }
        });
    }
});