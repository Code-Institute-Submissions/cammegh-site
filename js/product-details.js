$(function() {
    $('.product-button').on('click', function() {
        function toggleButtonOff(param) {
            var divs = param.find('.active-product-content');
            var path = param.find('.tile').attr('src');
            divs.each(function() {
                $(this).slideUp(500);
            });
            param.parent().removeClass('active-product');
            param.find($('.descriptor')).first().delay(900).fadeIn(300);
            param.find($('.descriptor')).last().fadeOut(500);
            setTimeout(function(){
                param.css('background-image','url("'+path+'")');
            },900);
        }
        if ($(this).parent().hasClass('active-product')) {
            toggleButtonOff($(this));
        }
        else {
            $('.product-button').each(function() {
                if($(this).parent().hasClass('active-product')){
                    toggleButtonOff($(this));
                }
            });
            $(this).parent().addClass('active-product');
            $(this).css('background-image','inherit');
            $(this).find($('.descriptor')).first().fadeOut(500);
            $(this).find($('.descriptor')).last().delay(500).fadeIn(500);
            var divs = $(this).find('.active-product-content');
            divs.each(function() {
                $(this).delay(500).slideDown(500);
            });
        }
    });
});
