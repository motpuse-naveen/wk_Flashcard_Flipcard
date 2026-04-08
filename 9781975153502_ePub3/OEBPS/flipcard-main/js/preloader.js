var imgPreloadArray = new Array(
							"images/audio-off.svg",
							"images/audio-on.svg",
							"images/back-arrow.svg",
							"images/close-btn.svg",
							"images/flip-icon.svg",
							"images/flip-iconBack.svg",
							"images/next-arrow.svg",
							"images/radio-active.svg",
							"images/radio-inactive.svg",
							"images/suffle-btn.svg",
							"images/zoom-icon.svg",
							"images/card.jpeg",
							"images/loading.gif");
var imagePreCount = 0;
for(var pId = 0; pId < imgPreloadArray.length; pId++)
{
	var img = new Image();
	img.onload = imagePreloaded;
	img.src = imgPreloadArray[pId];
}
function imagePreloaded()
{
	imagePreCount++;
}
/*console.log(imgPreloadArray);*/