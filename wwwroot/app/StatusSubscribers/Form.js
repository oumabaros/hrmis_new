var keyValue = $.request("keyValue");
var options = [];
$(function () {
    if (!!keyValue) {
        $.ajax({
            url: "/StatusSubscribers/GetFormJson",
            data: { keyValue: keyValue },
            dataType: "json",
            async: false,
            success: function (data) {
                $("#form1").formSerialize(data);
               
            }
        });
    }
});

function selStatus() {
    if (this.checked) {
        options.push(this.id);
    }
    else {
        const index = options.indexOf(this.id);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
    $('#Options').val(options)
}

function submitForm() {
    if (!$('#form1').formValid()) {
        return false;
    }
    $.submitForm({
        url: "/StatusSubscribers/SubmitForm?keyValue=" + keyValue,
        param: $("#form1").formSerialize(),
        success: function () {
            $.currentWindow().$("#gridListSubscribers").trigger("reloadGrid");
        }
    })
}

function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}
function capitalize(inputField) {
    inputField.value = inputField.value.replace(/\b([a-z])[a-z]*?/gi, function (letter) {
        return letter.toUpperCase();
    });
}

