function galInit() {
    blueimp.Gallery(
        document.getElementById('links').getElementsByTagName('a'), {
            container: '#blueimp-gallery-carousel',
            carousel: true
        }
    );
}

function linksInit() {
    document.getElementById('links').onclick = function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement,
            link = target.src ? target.parentNode : target,
            options = { index: link, event: event },
            links = this.getElementsByTagName('a');
        blueimp.Gallery(links, options);
    };
}

$(document).ready(galInit(), linksInit());

function filter(id) {
    $('.links').each(function() {
        $(this).attr('id', '');
    });
    $('label').each(function(){
        $(this).css({'text-decoration':'none'});
    });
    $('#'+id)[0].labels[0].style.textDecoration = 'underline';
    $('.' + id).first().attr('id', 'links');
    galInit();
    linksInit();
}
