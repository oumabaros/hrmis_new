function jparse(vr) {
    return JSON.parse(vr);
}
function jstring(js) {
    return JSON.stringify(js);
}

function getJsonCount(json) {
    var count = 0;
    for (var key in json) {
        if (json.hasOwnProperty(key))
            count++;
    }

    return count;

}
function chunkArray(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
        R.push(arr.slice(i, i + chunkSize));
    return R;
}

function chunkObject(object, n) {
    var values = Object.values(object);
    var final = [];
    var counter = 0;
    var portion = {};

    for (var key in object) {
        if (counter !== 0 && counter % n === 0) {
            final.push(portion);
            portion = {};
        }
        portion[key] = values[counter];
        counter++
    }
    final.push(portion);
    return final;
}

function splitArray(arr, n) {
    var kys = [];
    var vals = [];
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        var js = arr[i];
        var keys = Object.keys(js);
        for (let j = 0; j < keys.length; j++) {
            var key = keys[j];
            var val = js[key];
            kys.push(key);
        }
        vals.push(kys);
        kys = [];
    }
    for (var i = 0; i < vals.length; i++) {
        arr2.push(chunk(vals[i], n));
    }
    return arr2;
}

function getIncludes() {
    fetch("views/Includes.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("includes").innerHTML = data;
        });
}

function enableDisable(e) {
    var id_1 = e.id.split('_');
    var id_2 = id_1[id_1.length - 1];

    if (e.checked) {
        document.getElementById(id_2).disabled = false;
    }
    else {
        document.getElementById(id_2).disabled = true;
    }

}

function isExists(arr, val) {
    arr.includes(val); //returns true
}
function detailedFilter(arr, criteria) {
    return arr.filter(function (obj) {
        return Object.keys(criteria).every(function (c) {
            return obj[c] == criteria[c];
        });
    });
}
//console.log(detailedFilter(arr, { age: 21, color: 'blue' }));
function highlight_row(table_id) {
    var table = document.getElementById(table_id);
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;
            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "yellow";
            rowSelected.className += " selected";
        }
    }
}

