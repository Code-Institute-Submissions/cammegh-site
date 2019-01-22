// This script grabs all of the data from the review section of the wheel-builder.html page and deals with sending it via email.js
$(function() {
    $('#enquiry-form').on('submit', function(e) {
        
        // This variable checks if there was a special number sequence specified in the text box. If there was, get that info as a string, otherwise set the value to
        // "Not specified"
        var sequence = $('#special_arc_seq').val() ? $('#special_arc_seq').val() : "Not specified";
        
        // Check if the 'Send an email to sales for a formal quote' box is ticked. If yes, add a cc to the email, otherwise leave an empty string
        var ccEmail = $('#sales-email-check').is(":checked") ? "s.james@cammegh.com" : "";
        
        // Get all the info from the review section mentioned earlier and send it
        emailjs.send("personal_gmail", "cammegh_wheel_builder", {
            "from_name": $('#from_name').val(),
            "from_email": $('#from_email').val(),
            "cc_email": ccEmail,
            "toprim": $('#toprim_selection').html(),
            "halo": $('#halo_selection').html(),
            "balltrack": $('#balltrack_selection').html(),
            "cone": $('#cone_selection').html(),
            "outerbowl": $('#outerbowl_selection').html(),
            "numberarc": $('#numberarc_selection').html(),
            "separator": $('#separator_selection').html(),
            "turret": $('#turret_selection').html(),
            "ballstops": $('#ballstops_selection').html(),
            "psu": $('#psu_selection').html(),
            "special_arc_sequence": sequence
        });
        
        // Show the submission modal to let the user know the email has been sent
        $('#enquiry-submission').modal("show");
        
        // Reset the review section's fields
        $(this).trigger("reset");
        
        // Prevent a refresh of the page
        e.preventDefault();
    });
});
