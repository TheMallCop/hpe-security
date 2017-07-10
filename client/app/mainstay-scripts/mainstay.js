import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

function mainstay () {
	console.log('Mainstay is here!');
	$( "#hpeQuestion1" ).change(function() {
	  console.log( "Handler for .change() called from mainstay." );
	});
}
export default mainstay;