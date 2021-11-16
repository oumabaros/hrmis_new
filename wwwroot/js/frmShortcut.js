var isCtrlHold = false;
var isShiftHold = false;

$(document).keyup(function (e) {
    if (e.which == 17) //17 is the code of Ctrl button
        isCtrlHold = false;
    if (e.which == 16) //16 is the code of Shift button
        isShiftHold = false;
});
$(document).keydown(function (e) {
    if (e.which == 17)
        isCtrlHold = true;
    if (e.which == 16)
        isShiftHold = true;

    ShortcutManager(e);
});

function ShortcutManager(e) {
    //F1:
    if (e.which == 112) { //112 is the code of F1 button
        e.preventDefault(); //prevent browser from the default behavior
        alert("F1 is pressed");
    }

    //Ctrl+K:
    if (isCtrlHold && e.which == 75) { //75 is the code of K button
        e.preventDefault(); //prevent browser from the default behavior
        alert("Ctrl+K is pressed");
    }
}