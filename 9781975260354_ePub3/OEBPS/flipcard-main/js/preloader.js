var preloaderImageBasePath = "../flipcard-main/images/";
var imgPreloadArray = new Array(
							preloaderImageBasePath + "audio-off.svg",
							preloaderImageBasePath + "audio-on.svg",
							preloaderImageBasePath + "back-arrow.svg",
							preloaderImageBasePath + "close-btn.svg",
							preloaderImageBasePath + "flip-icon.svg",
							preloaderImageBasePath + "flip-iconBack.svg",
							preloaderImageBasePath + "next-arrow.svg",
							preloaderImageBasePath + "radio-active.svg",
							preloaderImageBasePath + "radio-inactive.svg",
							preloaderImageBasePath + "suffle-btn.svg",
							preloaderImageBasePath + "zoom-icon.svg",
							preloaderImageBasePath + "card.jpeg",
							preloaderImageBasePath + "loading.gif");
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