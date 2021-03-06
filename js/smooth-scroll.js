//Copied from https://www.w3schools.com/howto/howto_css_smooth_scroll.asp#section1. Modified to accommodate linking to sections of other pages.

$(document).ready(function() {
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
        // Make sure this.hash wants to move somewhere in the same page before overriding default behavior
        if (this.hash !== "" && $(this).attr('href').slice(0,1) === '#') {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function() {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});
