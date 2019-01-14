const imageBase = '../images/wheel-builder/';
const imageBlank = `${imageBase}blank-background.png`;

function picFade(picture,link){
    $(picture).fadeOut(300).delay(100).fadeIn(300);
    setTimeout(function() {picture.src = link;}, 300);
}

function activateTabs(id) {
    //Declare variables
    var base = id.slice(0, id.length - 9);
    var longID = base.concat("tab-large");
    var shortID = base.concat("tab-small");
    var selectionID = base.concat("selection");
    //Get elements
    var shorttab = $('#' + shortID);
    var longtab = $('#' + longID);
    var selectionPanel = $('#' + selectionID);
    var tabs = $(".selection-tab.active");
    var selections = $(".selection-list.active");
    //Remove "active" class from all elements
    tabs.each(function() {
        $(this).removeClass("active");
    });
    selections.each(function() {
        $(this).removeClass("active");
    });
    //Add "acttive" class to appropriate elements
    shorttab.addClass("active");
    longtab.addClass("active");
    selectionPanel.addClass("active");
}

function activateSelections(id) {
    // //Declare variables
    var arr = id.split("-");
    var base = arr[0];
    //Get elements
    var selection = $('#' + id)[0];
    var possSelections = document.getElementsByClassName(`${base} selection-list-option active`);
    var pic = $('#' + base)[0];
    //Do something with the elements
    if (id === "halo-check") {
        var checked = $('#' + id)[0].checked;
        if (checked) {
            picFade(pic,`${imageBase}halo.png`);
            $('#' + id)[0].labels[0].innerHTML = "Halo on";
        }
        else {
            picFade(pic,imageBlank);
            $('#' + id)[0].labels[0].innerHTML = "Halo off";
        }
    }
    else if (selection.classList.contains("active")) {
        selection.classList.remove("active");
    }
    else {
        while (possSelections[0]) {
            possSelections[0].classList.remove("active");
        }
        selection.classList.add("active");
    }
    // Veneer finish selection
    if (document.getElementById(`${base}-finish`) !== null) {
        var picFinishArr = document.getElementsByName(`${base}-finish`);
        var picFinish;
        for (i = 0; i < picFinishArr.length; i++) {
            if (picFinishArr[i].checked === true && selection.classList.contains("active")) {
                picFinish = picFinishArr[i].value;
            }
        }
        picFinish === undefined ? picFade(pic,imageBlank) : picFade(pic,`${imageBase}${id}-${picFinish}.png`);
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
        ballstopQty === undefined ? picFade(pic,imageBlank) : picFade(pic,`${imageBase}${id}-${ballstopQty}.png`);
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
        turretType === undefined ? picFade(pic,imageBlank) : picFade(pic,`${imageBase}${id}-${turretType}.png`);
    }
    // Power supply selection
    else if (possSelections[0] && possSelections[0].classList.contains((`psu`))) {
        picFade(pic,`${imageBase}${possSelections[0].id}.png`);
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
        picFade(arcPic,`${imageBase}${arcId}.png`);
        picFade(sepPic,`${imageBase}${sepId}-${arcPockets}-${sepStyle}.png`);
    }
    else if (arcSelection && !sepSelection) {
        picFade(arcPic,`${imageBase}${arcId}.png`);
        picFade(sepPic,imageBlank);
    }
    else if (sepSelection && !arcSelection) {
        picFade(arcPic,imageBlank);
        picFade(sepPic,`${imageBase}${sepId}-${pocketsVal}-${sepStyle}.png`);
    }
    else {
        picFade(arcPic,imageBlank);
        picFade(sepPic,imageBlank);
    }
}

function turretSelection(name, value) {
    var base = name.split("-")[0];
    var selection = $('.' + base + '.selection-list-option.active').first();
    if (selection && selection.hasClass(value)) {
        finishSelection(name, value);
    }
    var checkedVal = value;
    var allTurrets = $('.' + base);
    var possTurrets = $([]);
    var pic = $('#' + base);
    allTurrets.each(function() {
        if ($(this).hasClass(checkedVal)) {
            possTurrets.push($(this));
        }
        $(this).parent().parent().addClass("arc-container");
    });
    possTurrets.each(function() {
        $(this).parent().parent().removeClass("arc-container");
    });
}

function finishSelection(name, value) {
    var base = name.split("-")[0];
    var selection = $('.' + base + '.selection-list-option.active').first();
    var pic = $('#' + base)[0];
    if (selection[0]) {
        var selectionId = selection[0].id;
        picFade(pic,`${imageBase}${selectionId}-${value}.png`);
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
        // Deals with halo checkbox
        else if (spanIds[i] === 'halo') {
            var checked = $('#halo-check')[0].checked;
            if (checked) {
                dataIds.push("Yes");
            }
            else {
                dataIds.push("No");
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
