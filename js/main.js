(function(){

	function showStarDate(){
		var ts = Math.round( (new Date()).getTime() / 1000 );
		var starDate = "Star date: " + ts;
		document.querySelector(".site-header span.small").innerHTML = starDate
	}

	function main(){
		showStarDate();
		setInterval(showStarDate, 1000);
	}

	window.addEventListener('DOMContentLoaded', main);
})();