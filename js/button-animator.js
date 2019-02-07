// This function handles all of the enlarging and shrinking of boxes that double up as button-tiles
$(function() {

    // this function handles shrinking any open boxes
    function toggleButtonOff(param) {

        // an open box will have a content container with the .active-product-content class. Find that content container.
        var divs = param.find('.active-product-content');

        // store the picture that becomes the tile's background-image in a variable (this is used later)
        var path = param.find('.tile').attr('src');

        // use the slideUp jQuery function to hide the active content in the open box
        divs.each(function() {
            $(this).slideUp(500);
        });

        // remove the active-button class from the parent of the target of toggleButtonOff(). This has the effect of shrinking the width (via css)
        param.parent().removeClass('active-button');

        // There are 2 descriptor boxes per roulette wheel on the roulette-wheels.html page, hence the first() and last() functions. This function fades out the first descriptor and fades in the second.
        function fade(time) {
            param.find($('.descriptor.descriptor-active')).first().delay(time).fadeIn(300);
            param.find($('.descriptor')).not('.descriptor-active').fadeOut(500);
        }

        // If their is an image available for the button-tile, load it in at the same time as fading the descriptor
        if (path !== undefined) {
            setTimeout(function() {
                param.css('background-image', 'url("' + path + '")');
            }, 900);
            fade(900);
        }
        else {
            fade(500);
        }
    }
    
    

    // .button-tile is the class name for the aforementioned boxes, so on clicking one...
    $('.button-tile').on('click', function() {

        // This calls toggleButtonOff() on an already open product tile
        if ($(this).parent().hasClass('active-button')) {
            toggleButtonOff($(this));
        }

        // Otherwise, if you clicked on a product tile that was not open, do the following:
        else {

            // Close all open tiles (there should only be one, but in case someone has been fiddling with the HTML in Chrome Dev Tools or equivalent) by calling toggleButtonOff() on all product tiles
            $('.button-tile').each(function() {
                if ($(this).parent().hasClass('active-button')) {
                    toggleButtonOff($(this));
                }
            });

            // These next lines are basically just the reverse of toggleButtonOff(). Add the active-button class to have the box increase in width (if it can), switch the background image to the default off-white colour, fadeOut the title + bumph and after a delay fadeIn the title on its own. Finally, slideDown the content to show it.
            $(this).parent().addClass('active-button');
            var divs = $(this).find('.active-product-content');

            function slideDivs(time) {
                divs.each(function() {
                    $(this).delay(time).slideDown(500);
                });
            }
            if ($(this).find('.tile').attr('src') !== 'undefined') {
                $(this).css('background-image', 'inherit');
            }
            if ($(this).find('.descriptor').length > 1) {
                $(this).find($('.descriptor.descriptor-active')).first().fadeOut(500);
                $(this).find($('.descriptor')).not('.descriptor-active').each(function() {
                    $(this).delay(500).fadeIn(500);
                });
                slideDivs(900);
            }
            else {
                slideDivs(500);
            }
        }
    });
});
