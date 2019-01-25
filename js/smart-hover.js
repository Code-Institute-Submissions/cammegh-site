// Taken from http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml. All credit and rights to this code are property of the designer.

(function(){
	var isTouch = false; //var to indicate current input type (is touch versus no touch) 
	var isTouchTimer; 
	var curRootClass = ''; //var indicating current document root class ("can-touch" or "")
	function addtouchclass(e){
		clearTimeout(isTouchTimer);
		isTouch = true;
		if (curRootClass != 'can-touch'){ //add "can-touch' class if it's not already present
			curRootClass = 'can-touch';
			document.documentElement.classList.add(curRootClass);
		}
		isTouchTimer = setTimeout(function(){isTouch = false}, 500); //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
	}
	function removetouchclass(e){
		if (!isTouch && curRootClass == 'can-touch'){ //remove 'can-touch' class if not triggered by a touch event and class is present
			isTouch = false;
			curRootClass = '';
			document.documentElement.classList.remove('can-touch');
		}
	}
	document.addEventListener('touchstart', addtouchclass, false); //this event only gets called when input type is touch
	document.addEventListener('mouseover', removetouchclass, false); //this event gets called when input type is everything from touch to mouse/ trackpad
})();

// This function here is my own creation. It finds the dropdown links associated with a dropdown icon and shows only those links. This allows for an ever-expanding
// dropdown menu instead of the kind that opens to the side of the existing dropdown.
$(function() {
    $('.fa').on('click', function() {
        $(this).toggle();
        $(this).siblings('.fa').toggle();
        var assocLink = ($(this)[0].classList[0]);
        $(this).nextAll('.dropdown-menu').fadeToggle(250);
        $(this).nextAll('.dropdown-menu-small').fadeToggle(250);
        $('.'+assocLink).not('i').slideToggle(250);
    });
});
