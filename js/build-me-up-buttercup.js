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
        picFinish === undefined ? pic.src = "../images/wheel-builder/blank-background.png" : pic.src = `../images/wheel-builder/${id}-${picFinish}.png`;
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
        ballstopQty === undefined ? pic.src = "../images/wheel-builder/blank-background.png" : pic.src = `../images/wheel-builder/${id}-${ballstopQty}.png`;
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
        turretType === undefined ? pic.src = "../images/wheel-builder/blank-background.png" : pic.src = `../images/wheel-builder/${id}-${turretType}.png`;
    }
    // Power supply selection
    else if (possSelections[0] && possSelections[0].classList.contains((`psu`))) {
        pic.src = `../images/wheel-builder/${possSelections[0].id}.png`;
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
    var base = name.split("-")[0];
    var selection = document.getElementsByClassName(`${base} selection-list-option active`)[0];
    if (selection && selection.classList.contains(value)) {
        finishSelection(name, value);
    }
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

function reviewFill() {
    var reviewSpans = [];
    var spanIds = [];
    var active
    var spans = document.getElementsByTagName(`span`);
    for (i = 0; i < spans.length; i++) {
        if (spans[i].hasAttribute(`data-id`)) {
            reviewSpans.push(spans[i]);
            spanIds.push(spans[i].dataset.id);
        }
    }
    var dataIds = [];
    for (i = 0; i < spanIds.length; i++) {
        var selection = document.getElementsByClassName(`${spanIds[i]} selection-list-option active`)[0];
        if (selection) {
            // Deals with lacquered sections that have matt or glass finish
            if (i < 4) {
                var finishSelected;
                var finishes = document.getElementsByName(`${spanIds[i]}-finish`);
                for (j = 0; j < finishes.length; j++) {
                    if (finishes[j].checked === true) {
                        var checkedVal = finishes[j].value;
                        finishSelected = oneCap(checkedVal);
                    }
                }
                dataIds.push(`${selection.dataset.id}, ${finishSelected} Finish`)
            }
            // Deals with separators and number arc quirks
            else if (spanIds[i] === "separator") {
                var styleSelected;
                var styles = document.getElementsByName(`${spanIds[i]}-style`);
                for (j = 0; j < styles.length; j++) {
                    if (styles[j].checked === true) {
                        styleSelected = styles[j].dataset.value;
                    }
                }
                dataIds.push(`${styleSelected}, ${selection.dataset.id}`);
            }
            // Deals with turret quirks
            else if (spanIds[i] === "turret") {
                var turTyps = document.getElementsByName(`turret-type`);
                var turTypVal;
                for (j = 0; j < turTyps.length; j++) {
                    if (turTyps[j].checked === true) {
                        turTypVal = turTyps[j].value;
                    }
                }
                var turTypId = oneCap(turTypVal);
                if (selection && selection.classList.contains(turTypVal)) {
                    dataIds.push(`${selection.dataset.id}, ${turTypId}`);
                }
                else {
                    var turSrcArr = document.getElementById("turret").src.split("/");
                    var turStyleArr = turSrcArr[turSrcArr.length - 1].split("-");
                    var turStyle = turStyleArr[turStyleArr.length - 1];
                    turStyle = oneCap(turStyle.slice(0, turStyle.length - 4));
                    dataIds.push(`${turStyle}, ${selection.dataset.id}`);
                }
            }
            // Deals with ballstop quantities
            else if (spanIds[i] === "ballstops") {
                var qtySelected;
                var qtys = document.getElementsByName(`${spanIds[i]}-qty`);
                for (j = 0; j < qtys.length; j++) {
                    if (qtys[j].checked === true) {
                        qtySelected = qtys[j].value;
                    }
                }
                dataIds.push(`${selection.dataset.id}, x${qtySelected}`);
            }
            // Deals with everything else
            else {
                dataIds.push(selection.dataset.id);
            }
        }
        // If a section does not have a selection
        else {
            dataIds.push("Not selected");
        }
        // Prints the selections in a user-friendly format to the webpage
        reviewSpans[i].innerHTML = dataIds[i];
    }
}

// Small function that capitalises the first letter of a string
function oneCap(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
}
