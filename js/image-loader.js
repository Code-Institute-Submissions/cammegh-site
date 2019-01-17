// Copied and adapted version of the 31-01-2017 jQuery solution to loading a low-res image first then a high-res image from https://stackoverflow.com/questions/27934548/load-a-low-res-background-image-first-then-a-high-res-one
$(function() {
    $(".high-res").off().on("load", function() {
        var path = $(this).attr("src");
        var target = $(this).next();
        $(target).attr("src", path);
    });
});
