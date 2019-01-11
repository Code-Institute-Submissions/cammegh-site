$(function() {
    $('#enquiry-form').on('submit', function(e) {
        var sequence = $('#special_arc_seq').val() ? $('#special_arc_seq').val() : "Not specified";
        var ccEmail = $('#sales-email-check').is(":checked") ? "s.james@cammegh.com" : "";
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
        $('#enquiry-submission').modal("show");
        $(this).trigger("reset");
        e.preventDefault();
    });
});
