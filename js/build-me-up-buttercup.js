function activateTabs(id) {
    //Declare variables
    var base = id.slice(0, id.length - 9);
    var longID = base.concat("tab-large");
    var shortID = base.concat("tab-small");
    var selectionID = base.concat("selection");
    //Get elements
    var shorttab = document.getElementById(shortID);
    var longtab = document.getElementById(longID);
    var selectionPanel = document.getElementById(selectionID);
    var tabs = document.getElementsByClassName("selection-tab active");
    var selections = document.getElementsByClassName("selection-list active");
    //Remove "active" class from all elements
    while (tabs[0]) {
        tabs[0].classList.remove("active");
    }
    while (selections[0]) {
        selections[0].classList.remove("active");
    }
    //Add "acttive" class to appropriate elements
    shorttab.classList.add("active");
    longtab.classList.add("active");
    selectionPanel.classList.add("active");
}

function activateSelections(id) {
    //Declare variables
    var arr = id.split("-");
    var base = arr[0];
    //Get elements
    var selection = document.getElementById(id);
    var possSelections = document.getElementsByClassName(`${base} selection-list-option active`);
    //Do something with the elements
    if (selection.classList.contains("active")) {
        selection.classList.remove("active");
    }
    else {
        while (possSelections[0]) {
            possSelections[0].classList.remove("active");
        }
        selection.classList.add("active");
    }
    var pic = document.getElementById(base);
    // Veneer finish selection
    if (document.getElementById(`${base}-finish`) !== null) {
        var picFinishArr = document.getElementsByName(`${base}-finish`);
        var picFinish;
        for (i = 0; i < picFinishArr.length; i++) {
            if (picFinishArr[i].checked === true && selection.classList.contains("active")) {
                picFinish = picFinishArr[i].value;
            }
        }
        if (picFinish === undefined) {
            pic.src = "../images/wheel-builder/blank-background.png";
        }
        else {
            pic.src = `../images/wheel-builder/${id}-${picFinish}.png`;
        }
    }
    // Ball stop selection
    else if (document.getElementById(`${base}-qty`) !== null) {
        var ballstopQtyArr = document.getElementsByName(`${base}-qty`);
        var ballstopQty;
        for (i = 0; i < ballstopQtyArr.length; i++) {
            if (ballstopQtyArr[i].checked === true && selection.classList.contains("active")) {
                ballstopQty = ballstopQtyArr[i].value;
            }
        }
        if (ballstopQty === undefined) {
            pic.src = "../images/wheel-builder/blank-background.png";
        }
        else {
            pic.src = `../images/wheel-builder/${id}-${ballstopQty}.png`;
        }
    }
    // Turret selection
    else if (document.getElementById(`${base}-type`) !== null) {
        var turretTypesArr = document.getElementsByName(`${base}-type`);
        var turretType;
        for (i = 0; i < turretTypesArr.length; i++) {
            if (turretTypesArr[i].checked === true && selection.classList.contains("active")) {
                turretType = turretTypesArr[i].value;
            }
        }
        if (turretType === undefined) {
            pic.src = "../images/wheel-builder/blank-background.png";
        }
        else {
            pic.src = `../images/wheel-builder/${id}-${turretType}.png`;
        }
    }
    // Separator & number arc selection
    else {
        pocketsSelection();
    }
}

function pocketsSelection() {
    var pocketVals = document.getElementsByName(`numberarc-pockets`);
    var pocketsVal;
    for (i = 0; i < 3; i++) {
        document.getElementsByClassName(`numberarc-pockets arc-container`)[i].classList.remove(`active`);
        if (pocketVals[i].checked === true) {
            pocketsVal = pocketVals[i].value;
            document.getElementById(`numberarc-pockets-${pocketsVal}`).classList.add(`active`);
        }
    }
    var arcSelection = document.getElementsByClassName(`numberarc selection-list-option active`)[0];
    var sepSelection = document.getElementsByClassName(`separator selection-list-option active`)[0];
    var arcId;
    var arcPockets;
    var sepId;
    var sepStyle;
    var arcPic = document.getElementById(`numberarc`);
    var sepPic = document.getElementById(`separator`);
    if (arcSelection) {
        arcId = arcSelection.id;
        arcPockets = arcSelection.id.split("-")[1];
    }
    if (sepSelection) {
        sepId = sepSelection.id;
        var sepStyles = document.getElementsByName(`separator-style`);
        for (i = 0; i < 2; i++) {
            if (sepStyles[i].checked === true) {
                sepStyle = sepStyles[i].value;
            }
        }
    }
    if (arcSelection && sepSelection) {
        arcPic.src = `../images/wheel-builder/${arcId}.png`;
        sepPic.src = `../images/wheel-builder/${sepId}-${arcPockets}-${sepStyle}.png`;
    }
    else if (arcSelection && !sepSelection) {
        arcPic.src = `../images/wheel-builder/${arcId}.png`;
        sepPic.src = `../images/wheel-builder/blank-background.png`;
    }
    else if (sepSelection && !arcSelection) {
        arcPic.src = `../images/wheel-builder/blank-background.png`;
        sepPic.src = `../images/wheel-builder/${sepId}-${pocketsVal}-${sepStyle}.png`;
    }
    else {
        arcPic.src = `../images/wheel-builder/blank-background.png`;
        sepPic.src = `../images/wheel-builder/blank-background.png`;
    }
}

function turretSelection(name, value) {
    var base;
    finishSelection(name, value);
    var checkedVal = value;
    var allTurrets = document.getElementsByClassName(base);
    var possTurrets = [];
    var pic = document.getElementById(base);
    for (i = 0; i < allTurrets.length; i++) {
        if (allTurrets[i].classList.contains(checkedVal)) {
            possTurrets.push(allTurrets[i]);
        }
        allTurrets[i].parentNode.parentNode.classList.add("arc-container");
    }
    for (i = 0; i < possTurrets.length; i++) {
        possTurrets[i].parentNode.parentNode.classList.remove("arc-container");
    }
}

function finishSelection(name, value) {
    var base = name.split("-")[0];
    var selection = document.getElementsByClassName(`${base} selection-list-option active`)[0];
    var pic = document.getElementById(base);
    if (selection) {
        var selectionId = selection.id;
        pic.src = `../images/wheel-builder/${selectionId}-${value}.png`;
    }
}
