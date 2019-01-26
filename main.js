function getFile() {
	document.getElementById('camera-input').click();
}

document.addEventListener("DOMContentLoaded", function(e) {
	document.getElementById('button').onclick = getFile;
});