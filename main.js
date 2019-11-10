var vegard = new Image();
vegard.src = './images/meo.jpg';

var luna = new Image();
luna.src = './images/katt.jpg';

const hk_x = 306, hk_y = 800;
const ams_x = 281, ams_y = 250;


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

	const distance = 1981.57;
	const startDate = new Date('2019-11-01');
	const endDate = new Date('2019-12-21');
	const today = new Date();

	const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
	const speed = distance / (timeDifference / (1000 * 3600))
	const distanceProgress = (speed * ((today.getTime() - startDate.getTime()) / (1000*3600))) 
	const progress = 100*distanceProgress/distance;

	ctx.font = "82px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(`Time left: ${dhm(endDate.getTime() - today.getTime())}`, 600, 300)


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

function dhm(ms){
	days = Math.floor(ms / (24*60*60*1000));
	daysms=ms % (24*60*60*1000);
	hours = Math.floor((daysms)/(60*60*1000));
	hoursms=ms % (60*60*1000);
	minutes = Math.floor((hoursms)/(60*1000));
	minutesms=ms % (60*1000);
	sec = Math.floor((minutesms)/(1000));
	return days+":"+hours+":"+minutes+":"+sec;
}
