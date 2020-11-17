let spinner = document.querySelector("#loader");
let content = document.querySelector(".content");

let inpImg;
let inp;

let P2P_MODEL;

let MR = false;
let TransferingNow = false;

const SIZE = 256;

function setup() {
	inp = createCanvas(SIZE, SIZE);
	inp.class("border-box").parent("inpDiv");
	inpImg = loadImage("./input.png", () => {
		image(inpImg, 0, 0);
	});

	P2P_MODEL = ml5.pix2pix("./model1.pict", () => {
		MR = true;
		magic();
		spinner.style.display = "none";
		content.style.display = "block";
	});

	stroke(0);
	pixelDensity(1);
}

function magic() {
	TransferingNow = true;

	const drawing = select("canvas").elt;
	P2P_MODEL.transfer(drawing, (error, res) => {
		if (error) {
			alert("Something Went Wrong!!!!");
			console.log(error);
		}
		if (res && res.src) {
			TransferingNow = false;
			select("#outImg").html("");
			createImg(res.src).parent("outImg");
		}
	});
}
function draw() {
	if (mouseIsPressed) {
		line(mouseX, mouseY, pmouseX, pmouseY);
	}
}

function mouseReleased() {
	if (MR && !TransferingNow) {
		magic();
	}
}
