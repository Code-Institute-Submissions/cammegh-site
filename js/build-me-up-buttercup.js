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
    if (base === "numberarc" && arr[1] === "37" || arr[1] === "38" || arr[1] === "39") {
        for (i = 37; i < 40; i++) {
            document.getElementById(`separator-${i}`).checked = false;
        }
        document.getElementById(`separator-${arr[1]}`).checked = true;
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
    // Separator & number arc selection
    else if (document.getElementById(`${base}-pockets`) !== null) {
        var picPocketsArr = document.getElementsByName(`${base}-pockets`);
        var picPockets;
        var pocketStyleArr = document.getElementsByName(`${base}-style`);
        var pocketStyle;
        for (i = 0; i < picPocketsArr.length; i++) {
            if (picPocketsArr[i].checked === true && selection.classList.contains("active")) {
                picPockets = picPocketsArr[i].value;
            }
        }
        if (pocketStyleArr[0]) {
            for (i = 0; i < pocketStyleArr.length; i++) {
                if (pocketStyleArr[i].checked === true && selection.classList.contains("active")) {
                    pocketStyle = pocketStyleArr[i].value;
                }
            }
        }
        if (picPockets === undefined) {
            pic.src = "../images/wheel-builder/blank-background.png";
        }
        else if (document.getElementsByName(`${base}-style`) && pocketStyle !== undefined) {
            pic.src = `../images/wheel-builder/${id}-${picPockets}-${pocketStyle}.png`;
        }
        else {
            pic.src = `../images/wheel-builder/${id}.png`;
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
}

function pocketsSelection(id, value) {
    var checkedVal = value;
    var allSeparators = document.getElementsByName("separator-pockets");
    var allArcs = document.getElementsByName("numberarc-pockets");
    for (i = 0; i < allSeparators.length; i++) {
        allArcs[i].checked = false;
    }
    if (document.getElementById(`numberarc-${checkedVal}`)) {
        document.getElementById(`numberarc-${checkedVal}`).checked = true;
    }
    var activeArcs = document.getElementsByClassName("numberarc selection-list-option active");
    if (activeArcs[0]) {
        var activeArcsID = activeArcs[0].id.split("-");
        if (activeArcsID[1] === checkedVal) {
            document.getElementById(`separator-${checkedVal}`).checked = true;
        }
        else {
            document.getElementById(`separator-${activeArcsID[1]}`).checked = true;
        }
    }
    var assocArcDiv = document.getElementById(`numberarc-pockets-${checkedVal}`);
    var activeArcDiv = document.getElementsByClassName("numberarc-pockets arc-container active");
    while (activeArcDiv[0]) {
        activeArcDiv[0].classList.remove("active");
    }
    if (assocArcDiv) {
        assocArcDiv.classList.add("active");
    }
    // Separator & number arc selection
    var arr = id.split("-");
    var base = arr[0];
    var possSelections = document.getElementsByClassName(`${base} selection-list-option active`);
    var selection = possSelections[0];
    if (selection) {
        var selectionId = selection.id;
    }
    var pic = document.getElementById(base);
    if (document.getElementById(`${base}-pockets`) !== null) {
        var picPocketsArr = document.getElementsByName(`${base}-pockets`);
        var picPockets;
        var pocketStyleArr = document.getElementsByName(`${base}-style`);
        var pocketStyle;
        for (i = 0; i < picPocketsArr.length; i++) {
            if (selection && picPocketsArr[i].checked === true && selection.classList.contains("active")) {
                picPockets = picPocketsArr[i].value;
            }
        }
        if (pocketStyleArr[0]) {
            for (i = 0; i < pocketStyleArr.length; i++) {
                if (selection && pocketStyleArr[i].checked === true && selection.classList.contains("active")) {
                    pocketStyle = pocketStyleArr[i].value;
                }
            }
        }
        if (picPockets === undefined) {
            pic.src = "../images/wheel-builder/blank-background.png";
        }
        else if (document.getElementsByName(`${base}-style`) && pocketStyle !== undefined) {
            pic.src = `../images/wheel-builder/${selectionId}-${picPockets}-${pocketStyle}.png`;
        }
    }
}

function turretSelection(name, value) {
    var base = name.slice(0, name.length - 5);
    var checkedVal = value;
    var allTurrets = document.getElementsByClassName(base);
    var possTurrets = [];
    var selection = document.getElementsByClassName("turret selection-list-option active")[0];
    var pic = document.getElementById(base);
    if (selection) {
        var selectionId = selection.id;
        if (selection.classList.contains(value)) {
            pic.src = `../images/wheel-builder/${selectionId}-${value}.png`;
        }
    }
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
