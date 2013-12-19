// $(window).load(function() {
// 			// Animate loader off screen
// 			$(".loader").animate({
// 				top: -200
// 			}, 1500);
// 		});

(function() {


	var rval = 0;
	var clicked = false;

$( ".top" ).click(function() {
	if (currentlayout != "top"){
	notesPos = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200];
	// notesPos = [200, 200, 200, 200, 200, 200, 200, 200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200];
	notesPos2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	currentlayout = "top";
	initialize();
	movedots();
}
});

$( ".diagonal" ).click(function() {
	if (currentlayout != "diagonal"){
		console.log("CHANGING");
	notesPos = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200];
	notesPos2 = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900];
	currentlayout = "diagonal";
	initialize();
	movedots();
	}
});

$( ".sides" ).click(function() {
	if (currentlayout != "sides"){
	notesPos = [0, 0, 0, 0, 0, 0, 0, 0, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200];
	notesPos2 = [0, 120, 240, 360, 480, 600, 720, 840, 0, 120, 240, 360, 480, 600, 720, 840];
	currentlayout = "sides";
	initialize();
	movedots();
	}
});

$( ".topside" ).click(function() {
	if (currentlayout != "topside"){
	notesPos = [0, 0, 0, 0, 0, 0, 0, 0, 182, 365, 548, 731, 914, 1097, 1280, 0];
	notesPos2 = [0, 120, 240, 360, 480, 600, 720, 840, 0, 0, 0, 0, 0, 0, 0, 0];
	currentlayout = "topside";
	initialize();
	movedots();
	}
});

$( ".random" ).click(function() {
	// if (currentlayout != "random"){
	// notesPos = [0, 0, 0, 0, 0, 0, 0, 0, 182, 365, 548, 731, 914, 1097, 1280, 0];
	// notesPos2 = [0, 120, 240, 360, 480, 600, 720, 840, 0, 0, 0, 0, 0, 0, 0, 0];
	var arrx = [];
	var arry = [];
	for (var i = 0, l = 1280; i < l; i++) {
    arrx.push(Math.round(Math.random() * l))
	}
	for (var i = 0, l = 960; i < l; i++) {
    arry.push(Math.round(Math.random() * l))
	}
	notesPos = arrx
	notesPos2 = arry
	currentlayout = "random";
	initialize();
	movedots();
	// }
});

$( ".hidedots" ).click(function() {
	hideDots();
	// if (currentlayout != "topside"){
	// notesPos = [0, 0, 0, 0, 0, 0, 0, 0, 182, 365, 548, 731, 914, 1097, 1280, 0];
	// notesPos2 = [0, 120, 240, 360, 480, 600, 720, 840, 0, 0, 0, 0, 0, 0, 0, 0];
	// currentlayout = "topside";
	// initialize();
	// movedots();
	// }
});

$( ".major" ).click(function() {
	scale = "major";
	initialize();
});

$( ".minor" ).click(function() {
	scale = "minor";
	initialize();
});

$( ".pizz" ).click(function() {
	scale = "pizz";
	initialize();
});
$( ".mand" ).click(function() {
	scale = "mand";
	initialize();
});


$( ".display" ).click(function() {
	if(bw){
		$('#canvas-blended').css("z-index", "-20");
		bw = false;
	}
	else{
		$('#canvas-blended').css("z-index", "0");
		bw = true;
	}

});


function hideDots(){
	if(hidden){
		for (var i=1; i<17; ++i) {
			$(".circle"+i.toString()).css( "display", "inline" );
		}
		hidden = false;
	}
	else {
		for (var i=1; i<17; ++i) {
			$(".circle"+i.toString()).css( "display", "none" );
		}
		hidden = true;
	}
}


function movedots(){
	for (var i=1; i<17; ++i) {
		$(".circle"+i.toString()).css( "left", notesPos[i-1].toString()+"px" );
		$(".circle"+i.toString()).css( "top", notesPos2[i-1].toString()+"px" );
	}

}

function changeColor(r, color){
	if(color == "red"){
		color = '#bdc3c7';
		$(".circle"+r.toString()).css( "width", "50px");
		$(".circle"+r.toString()).css( "height", "50px");
	}
	if(color == "blue"){
		color = '#3498db';
		$(".circle"+r.toString()).css( "width", "65px");
		$(".circle"+r.toString()).css( "height", "65px");
	}
	$(".circle"+r.toString()).css( "background-color", color);
}

	function hasGetUserMedia() {
		// Note: Opera builds are unprefixed.
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	if (hasGetUserMedia()) {
		$("#info").hide();
		$("#message").show();
	} else {
		$("#info").show();
		$("#message").hide();
		$("#video-demo").show();
		$("#video-demo")[0].play();
		return;
	}

	var webcamError = function(e) {
		alert('Webcam error!', e);
	};

	var video = $('#webcam')[0];

	if (navigator.getUserMedia) {
		navigator.getUserMedia({audio: true, video: true}, function(stream) {
			video.src = stream;
			initialize();
		}, webcamError);
	} else if (navigator.webkitGetUserMedia) {
		navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
			video.src = window.webkitURL.createObjectURL(stream);
			initialize();
		}, webcamError);
	} else {
		//video.src = 'somevideo.webm'; // fallback.
	}

	var AudioContext = (
		window.AudioContext ||
		window.webkitAudioContext ||
		null
	);



	// For Diagonal Layout
	// var notesPos = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200];
	// var notesPos2 = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900];

	var notesPos = [0, 0, 0, 0, 0, 0, 0, 0, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200];
	var notesPos2 = [0, 120, 240, 360, 480, 600, 720, 840, 0, 120, 240, 360, 480, 600, 720, 840];
	var notes3 = [261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25];

	var timeOut, lastImageData;
	var canvasSource = $("#canvas-source")[0];
	var canvasBlended = $("#canvas-blended")[0];

	var contextSource = canvasSource.getContext('2d');
	var contextBlended = canvasBlended.getContext('2d');

	var soundContext = new AudioContext();
	var bufferLoader;
	var notes = [];
	var currentlayout = "sides";
	var hidden = false;
	var major = false;
	var scale = "major";
	var num = 16;
	var bw = true;



	// mirror video
	contextSource.translate(canvasSource.width, 0);
	contextSource.scale(-1, 1);

	var c = 5;

	function initialize() {
		if (!AudioContext) {
			alert("AudioContext not supported!");
		}
		else {
			loadSounds();
		}
	}

	function loadSounds() {
		notes = [];
		console.log("LOADING");
		console.log(notesPos);
		if(scale == "pizz"){
		bufferLoader = new BufferLoader(soundContext,
			[
				'Notes2/1.mp3',
				'Notes2/2.mp3',
				'Notes2/3.mp3',
				'Notes2/4.mp3',
				'Notes2/5.mp3',
				'Notes2/6.mp3',
				'Notes2/7.mp3',
				'Notes2/8.mp3',
				'Notes2/1.mp3',
				'Notes2/2.mp3',
				'Notes2/3.mp3',
				'Notes2/4.mp3',
				'Notes2/5.mp3',
				'Notes2/6.mp3',
				'Notes2/7.mp3',
				'Notes2/8.mp3'
			],
			finishedLoading
		);
	}
	if(scale == "mand"){
		bufferLoader = new BufferLoader(soundContext,
			[
				'Notes2//banjo/banjo_C3_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_D3_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_E3_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_F3_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_G3_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_A3_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_B3_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_C4_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_D4_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_E4_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_F4_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_G4_very-long_piano_normal.mp3',
				'Notes2/banjo/banjo_A4_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_B4_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_C5_very-long_forte_normal.mp3',
				'Notes2/banjo/banjo_C6_very-long_forte_normal.mp3'
			],
			finishedLoading
		);
	}
	if(scale == "minor"){
		bufferLoader = new BufferLoader(soundContext,
			[
				'Notes2/a.mp3',
				'Notes2/b.mp3',
				'Notes2/c.mp3',
				'Notes2/d.mp3',
				'Notes2/e.mp3',
				'Notes2/f.mp3',
				'Notes2/g.mp3',
				'Notes2/a2.mp3',
				'Notes2/b2.mp3',
				'Notes2/c2.mp3',
				'Notes2/d2.mp3',
				'Notes2/a.mp3',
				'Notes2/b.mp3',
				'Notes2/c.mp3',
				'Notes2/d.mp3',
				'Notes2/e.mp3'
			],
			finishedLoading
		);
	}

	if(scale == "major"){
		bufferLoader = new BufferLoader(soundContext,
			[
				'Notes/violin_D4_1_forte_con-sord.mp3',
				'Notes/violin_G4_1_forte_arco-normal.mp3',
				'Notes/violin_B4_1_forte_con-sord.mp3',
				'Notes/violin_D5_1_forte_arco-normal.mp3',
				'Notes/violin_A4_1_fortissimo_arco-normal.mp3',
				'Notes2/cello_D3_1_forte_arco-normal.mp3',
				'Notes2/cello_G3_1_forte_arco-normal.mp3',
				'Notes2/cello_B3_1_fortissimo_arco-normal.mp3',
				'Notes2/cello_D4_1_forte_arco-normal.mp3',
				'Notes/violin_D4_1_forte_con-sord.mp3',
				'Notes/violin_G4_1_forte_arco-normal.mp3',
				'Notes/violin_B4_1_forte_con-sord.mp3',
				'Notes/violin_D5_1_forte_arco-normal.mp3',
				'Notes2/cello_D3_1_forte_arco-normal.mp3',
				'Notes2/cello_G3_1_forte_arco-normal.mp3',
				'Notes2/cello_B3_1_fortissimo_arco-normal.mp3'
			],
			finishedLoading
		);
	}
		bufferLoader.load();
	}

	function finishedLoading(bufferList) {
		console.log("FINISHED LOADING");
		if (source){
			source.disconnect();
		}
		for (var i=0; i<16; i++) {
			var source = soundContext.createBufferSource();
			source.buffer = bufferList[i];
			source.connect(soundContext.destination);
			var note = {
				note: source,
				ready: true,
				visual: $("#note" + i)[0]
			};
			note.area = {x:notesPos[i], y:notesPos2[i], width:note.visual.width, height:100};
			notes.push(note);
		}
		console.log(notes);
		start();
	}

	function playSound(obj) {

		if (!obj.ready) return;
		var source = soundContext.createBufferSource();
		source.buffer = obj.note.buffer;
		source.connect(soundContext.destination);
		source.noteOn(0);
		obj.ready = false;
		// throttle the note
		setTimeout(setNoteReady, 400, obj);
	}

	function setNoteReady(obj) {
		obj.ready = true;
	}

	function start() {
		$(".loader").animate({
				top: -200
			}, 1500);
		$(canvasSource).show();
		$(canvasBlended).show();
		$("h1").hide();
		$("#message").hide();
		$("button").show();
		$("#description").show();
		update();
	}

	function update() {
		drawVideo();
		blend();
		checkAreas();
		timeOut = setTimeout(update, 1000/60);
	}

	function drawVideo() {
		contextSource.drawImage(video, 0, 0, video.width, video.height);
	}

	function blend() {
		var width = canvasSource.width;
		var height = canvasSource.height;
		// get webcam image data
		var sourceData = contextSource.getImageData(0, 0, width, height);
		// create an image if the previous image doesn’t exist
		if (!lastImageData) lastImageData = contextSource.getImageData(0, 0, width, height);
		// create a ImageData instance to receive the blended result
		var blendedData = contextSource.createImageData(width, height);
		// blend the 2 images
		differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
		// draw the result in a canvas
		contextBlended.putImageData(blendedData, 0, 0);
		// store the current webcam image
		lastImageData = sourceData;
	}

	function fastAbs(value) {
		// funky bitwise, equal Math.abs
		return (value ^ (value >> 31)) - (value >> 31);
	}

	function threshold(value) {
		return (value > 0x15) ? 0xFF : 0;
	}

	function difference(target, data1, data2) {
		// blend mode difference
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			target[4*i] = data1[4*i] == 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
			target[4*i+1] = data1[4*i+1] == 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
			target[4*i+2] = data1[4*i+2] == 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function differenceAccuracy(target, data1, data2) {
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
			var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
			var diff = threshold(fastAbs(average1 - average2));
			target[4*i] = diff;
			target[4*i+1] = diff;
			target[4*i+2] = diff;
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function checkAreas() {
		// console.log(rval);
		// loop over the note areas
		for (var r=0; r<16; ++r) {
			// get the pixels in a note area from the blended image
			var blendedData = contextBlended.getImageData(notes[r].area.x, notes[r].area.y, notes[r].area.width, notes[r].area.height);
			var i = 0;
			var average = 0;
			// loop over the pixels
			while (i < (blendedData.data.length * 0.25)) {
				// make an average between the color channel
				average += (blendedData.data[i*4] + blendedData.data[i*4+1] + blendedData.data[i*4+2]) / 3;
				++i;
			}
			// calculate an average between of the color values of the note area
			average = Math.round(average / (blendedData.data.length * 0.25));
			if (average > 10) {
				// over a small limit, consider that a movement is detected
				// play a note and show a visual feedback to the user
				playSound(notes[r]);
				changeColor(r+1, "blue");
				// notes[r].visual.style.display = "block";
				// $(notes[r].visual).fadeOut();
			}
			else{
				changeColor(r+1, "red");
			}
		}
	}

})();






