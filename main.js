var vegard = new Image();
vegard.src = './images/katt.jpg';

var luna = new Image();
luna.src = './images/meo.jpg';

const ams_x = 178, ams_y = 501;
const hk_x = 2230, hk_y = 1227;


document.addEventListener("DOMContentLoaded", (e) => {
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");

	canvas.width = 2476;
	canvas.height = 1594;

	let intervalProgress = window.setInterval(updateProgress, 500);
});


function updateProgress() {
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawProgressLine(ctx, 0, "black"); // baseline

	const distance = 9274.68369911277;
	const startDate = new Date('2019-01-06');
	const endDate = new Date('2019-05-31');
	const today = new Date();

	const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
	const speed = distance / (timeDifference / (1000 * 3600))
	const distanceProgress = (speed * ((today.getTime() - startDate.getTime()) / (1000*3600))) 
	const progress = 100*distanceProgress/distance;

	console.log(progress);


	drawProgressLine(ctx, progress, "red");
	drawProgressImage(ctx, progress);
}

function drawProgressLine(ctx, progress, lineColor) {
	const x = ams_x + (100-progress)/100 * (hk_x - ams_x);
	const y = ams_y + (100-progress)/100 * (hk_y - ams_y);

	ctx.beginPath();
	ctx.moveTo(ams_x, ams_y);
	ctx.lineTo(x, y);
	ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
	ctx.lineWidth = 10;
	ctx.strokeStyle = lineColor;
	ctx.stroke();
}

function drawProgressImage(ctx, progress) {
	const x = ams_x + (100-progress)/100 * (hk_x - ams_x);
	const y = ams_y + (100-progress)/100 * (hk_y - ams_y);

	ctx.drawImage(vegard, x-30, y-50, vegard.width/30, vegard.height/30);
	ctx.drawImage(luna, ams_x-30, ams_y-50, luna.width/30, luna.height/30)
}