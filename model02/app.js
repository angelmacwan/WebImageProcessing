let inp;
let out;
let P2P_MODEL;
let curCol;
let curStroke;

const SIZE = 256;
function setup() {
	inp = createCanvas(SIZE, SIZE);
	inp.parent("input");
	out = select("#outImg");

	curCol = color(0, 0, 255);
	curStroke = 17;
	select("#red").mousePressed(() => (curCol = color(255, 0, 0)));
	select("#blue").mousePressed(() => (curCol = color(0, 0, 255)));
	select("#size").mouseReleased(() => (curStroke = select("#size").value()));

	stroke(0);
	pixelDensity(1);

	P2P_MODEL = ml5.pix2pix("./model2.pict", () => {
		let spinner = document.querySelector("#loader");
		let content = document.querySelector(".content");

		spinner.style.display = "none";
		content.style.display = "block";

		transfer();
	});

	background(255, 0, 0);
}

function draw() {
	if (mouseIsPressed) {
		stroke(curCol);
		strokeWeight(curStroke);
		line(mouseX, mouseY, pmouseX, pmouseY);
	}
}

function transfer() {
	const canvasElement = select("canvas").elt;

	P2P_MODEL.transfer(canvasElement, function (error, res) {
		if (error) {
			alert("Something Went Wrong!!!");
			console.log(error);
		}
		if (res && res.src) {
			out.elt.src = res.src;
		}
	});
}
