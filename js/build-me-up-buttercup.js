// This monster deals with checking the selections that a user makes on the wheel-builder.html page and loading the appropriate image
// I initially typed the whole thing out in pure JavaScript (as that was what I was familiar with), but later on added in jQuery bits to shorten the code. This is why
// there is quite a mix of the two.

// Declared one constant for the root path for all pictures used by the page, and one for the empty background
const imageBase = '../images/wheel-builder/';
const imageBlank = `${imageBase}blank-background.png`;

// This function deals with swapping actual images, by fading out the active one, swapping the src and fading back in
function picFade(picture, link) {
    $(picture).fadeOut(300).delay(100).fadeIn(300);
    setTimeout(function() { picture.src = link; }, 300);
}

// This function deals with swapping between tabs in the wheel builder. Each tab controls a specific section of the wheel
function activateTabs(id) {

    // -- Declaring variables --
    // base gets the shortened name of the tab clicked on (so minus the 'tab-large' or 'tab-small'). The longID and shortID should be self-explanatory. selectionID
    // is created to store the id of the selection container we want to show.
    var base = id.slice(0, id.length - 9);
    var longID = base.concat("tab-large");
    var shortID = base.concat("tab-small");
    var selectionID = base.concat("selection");

    // -- Get elements --
    // The next three lines use those variables declared earlier to get the elements on the page that match those ids
    var shorttab = $('#' + shortID);
    var longtab = $('#' + longID);
    var selectionPanel = $('#' + selectionID);

    // tabs finds all active selection tabs, whilst selections finds the active selections associated with the tab
    var tabs = $(".selection-tab.active");
    var selections = $(".selection-list.active");

    //Remove "active" class from all elements
    tabs.each(function() {
        $(this).removeClass("active");
    });
    selections.each(function() {
        $(this).removeClass("active");
    });

    //Add "active" class to appropriate elements (ie. the tab that was clicked and its associated selection container)
    shorttab.addClass("active");
    longtab.addClass("active");
    selectionPanel.addClass("active");
}

// This function deals with getting the information out of the selections made so that the correct pictures can be loaded by picFade() above
function activateSelections(id) {

    // Declare variables. Same as activateTabs(), get the first bit of the id
    var arr = id.split("-");
    var base = arr[0];

    // Get elements based on the id and its parts
    var selection = $('#' + id)[0];
    var possSelections = document.getElementsByClassName(`${base} selection-list-option active`);
    var pic = $('#' + base)[0];

    // Check if the selection is the halo option in the top rim tab. If checked, load the halo.png file, if not, blank background. Uses picFade() to do this.
    if (id === "halo-check") {
        var checked = $('#' + id)[0].checked;
        if (checked) {
            picFade(pic, `${imageBase}halo.png`);
        }
        else {
            picFade(pic, imageBlank);
        }
    }

    // If the selection is not the halo option, then check if the selection is already active. If so, deactivate it. (Toggle selection function)
    else if (selection.classList.contains("active")) {
        selection.classList.remove("active");
    }

    // Otherwise, get all possible selections (using the class list), deactivate them all and activate the one that was clicked on
    else {
        while (possSelections[0]) {
            possSelections[0].classList.remove("active");
        }
        selection.classList.add("active");
    }

    // This if statement deals with selections that have radio buttons for things like finish ('outer bowl', 'turret', etc.) or quantity ('ball stops')
    if (document.getElementById(`${base}-value`) !== null) {

        // Store the possible choices of the appropriate section in a variable, and initialise the picValue variable
        var picValueArr = document.getElementsByName(`${base}-value`);
        var picValue;

        // Loop through the possible choices and if a selection is made and an option is checked set picValue to equal that checked option
        for (i = 0; i < picValueArr.length; i++) {
            if (picValueArr[i].checked === true && selection.classList.contains("active")) {
                picValue = picValueArr[i].value;
            }
        }

        // Finally, check if picValue is undefined (will be if no selection has been made). If it is, load the empty background image, if not then load the
        // appropriate image
        picValue === undefined ? picFade(pic, imageBlank) : picFade(pic, `${imageBase}${id}-${picValue}.png`);
    }

    // Power supply selection. Checks if a power supply has been selected and loads image accordingly
    else if (possSelections[0] && possSelections[0].classList.contains((`psu`))) {
        picFade(pic, `${imageBase}${possSelections[0].id}.png`);
    }

    // Separator & number arc selection. I offloaded this into its own function as it is rather complicated
    else {
        pocketsSelection();
    }
}

// Separators and number arcs are awkward. Using TCS John Huxley's wheel configurator as the example, if you select a single zero number sequence for the number arcs,
// the separator options that will not work with it are greyed out - but you can still select them. This leads to some odd looking roulette wheels. In this function
// I set out to prevent that option entirely by having the separator pocket number tied to the number arcs instead. It is complicated but does the job.

// This runs when a separator or number ring is selected or the number of pockets radio button selection is changed

// The TL:DR logic is this:
// If both separator and number ring are selected, get the number of pockets the separator should have and load both appropriate images
// If only a number arc is selected, load that image and the blank background image in the separator's place
// If only a separator is selected, get the number of pockets it should have from the radio buttons in the number arc tab, and load the appropriate image
// If neither are selected, load both image layers as empty background images
function pocketsSelection() {

    // Starts by getting the radio buttons for the number of pockets and storing them in pocketVals. Also initialises pocketsVal to hold the selected radio button
    var pocketVals = document.getElementsByName(`numberarc-pockets`);
    var pocketsVal;

    // Loop through the containers that contain the different number arc options for each pocket quantity and remove the 'active' class (thereby hiding them)
    for (i = 0; i < 3; i++) {
        document.getElementsByClassName(`numberarc-pockets arc-container`)[i].classList.remove(`active`);

        // While looping, when you find the checked radio button, assign that value to the previously initialised pocketsVal variable (can be 37, 38 or 39 atm. There
        // may eventually be more but that depends on how mad casinos want to get. Lastly, add the 'active' class to the container that contains the associated number
        // arcs.
        if (pocketVals[i].checked === true) {
            pocketsVal = pocketVals[i].value;
            document.getElementById(`numberarc-pockets-${pocketsVal}`).classList.add(`active`);
        }
    }

    // Get the selected 'number arc' and 'separator' options, initialise several variables for later use and get the image elements for 'number arc' and 'separator'
    // layers.
    var arcSelection = document.getElementsByClassName(`numberarc selection-list-option active`)[0];
    var sepSelection = document.getElementsByClassName(`separator selection-list-option active`)[0];
    var arcId;
    var arcPockets;
    var sepId;
    var sepStyle;
    var arcPic = document.getElementById(`numberarc`);
    var sepPic = document.getElementById(`separator`);

    // If there is a number arc selected, get the id of that number arc and split it, assigning the number of pockets it has to the arcPockets variable
    if (arcSelection) {
        arcId = arcSelection.id;
        arcPockets = arcSelection.id.split("-")[1];
    }

    // If there is a separator selected, get the id of that separator and the available separator style options
    if (sepSelection) {
        sepId = sepSelection.id;
        var sepStyles = document.getElementsByName(`separator-style`);

        // Check which separator style option is selected and set its value to sepStyle
        for (i = 0; i < 2; i++) {
            if (sepStyles[i].checked === true) {
                sepStyle = sepStyles[i].value;
            }
        }
    }

    // If both a number arc and separator are selected, fade both existing images out, swap the src (incorporating previously set variables) and load images back in
    if (arcSelection && sepSelection) {
        picFade(arcPic, `${imageBase}${arcId}.png`);
        picFade(sepPic, `${imageBase}${sepId}-${arcPockets}-${sepStyle}.png`);
    }

    // If only a number arc is selected, fade both existing images out, swap the src (incorporating previously set variables) and load images back in
    else if (arcSelection && !sepSelection) {
        picFade(arcPic, `${imageBase}${arcId}.png`);
        picFade(sepPic, imageBlank);
    }

    // If only a separator is selected, fade both existing images out, swap the src (incorporating previously set variables) and load images back in
    else if (sepSelection && !arcSelection) {
        picFade(arcPic, imageBlank);
        picFade(sepPic, `${imageBase}${sepId}-${pocketsVal}-${sepStyle}.png`);
    }

    // If neither a separator nor a number arc is selected, fade both existing images out and replace with empty background image
    else {
        picFade(arcPic, imageBlank);
        picFade(sepPic, imageBlank);
    }
}

// Some turrets do not have the same finishes available as others. This function deals with that difficulty, taking in the name (turret-value) and value (which shall
// be referred to as 'style' from here on out) as variables. This function runs when the style of turret is changed using the radio buttons in wheel-builder.html
function turretSelection(name, value) {

    // Get the base string 'turret'
    var base = name.split("-")[0];

    // Use jQuery to get the turret selection
    var selection = $('.' + base + '.selection-list-option.active').first();

    // Store the turret style (value) in a variable for later use
    var checkedVal = value;

    // Get all the turret selections, initialise an empty jQuery array and get the element with the id 'turret' (hint: its the image that is the turret
    // layer in the wheel render)
    var allTurrets = $('.' + base);
    var possTurrets = $([]);

    // If there is a selected turret, and that turret has as a class the style that is selected from the radio buttons, then do the following:
    // Get the image element for the turret layer and the id of the selected turret, then use picFade() to load that turret image
    if (selection && selection.hasClass(value)) {
        radioSelection(name,checkedVal);
    }

    // For each turret, if it has the style that is selected as a class, add it to the possTurrets array. For each turret, also add to the element two parents above
    // it the class 'arc-container' (this class hides the element using css)
    allTurrets.each(function() {
        if ($(this).hasClass(checkedVal)) {
            possTurrets.push($(this));
        }
        $(this).parent().parent().addClass("arc-container");
    });

    // For all those turrets added to possTurrets earlier, remove the 'arc-container' class from the element two parents above, thereby revealing the option as a 
    // possible selection
    possTurrets.each(function() {
        $(this).parent().parent().removeClass("arc-container");
    });
}

function radioSelection(name, value) {
    var base = name.split("-")[0];
    var selection = $('.' + base + '.selection-list-option.active').first();
    var pic = $('#' + base)[0];
    if (selection[0]) {
        var selectionId = selection[0].id;
        picFade(pic, `${imageBase}${selectionId}-${value}.png`);
    }
}

function reviewFill() {
    var reviewSpans = [];
    var spanIds = [];
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
            if (i < 5) {
                var finishSelected;
                var finishes = document.getElementsByName(`${spanIds[i]}-value`);
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
                var turTyps = document.getElementsByName(`turret-value`);
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
                var qtys = document.getElementsByName(`${spanIds[i]}-value`);
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
    console.log(dataIds);
}

// Small function that capitalises the first letter of a string
function oneCap(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
}
