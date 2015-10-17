'use strict'

// Representation of Rectangles
var xmin = [0];
var xmax = [800];
var ymin = [0];
var ymax = [600];
var elementOfRect = [];

var mousedownx;
var mousedowny;

function mousedown(event) {

	// Store mouse down coordinates in variables until mouse release
	var c = document.getElementById("canv");
    var pos = getMousePos(c, event);
    var x1 = pos.x;
    var y1 = pos.y;

	mousedownx = x1;
	mousedowny = y1;
}

function mouseup(event) {

	// Store mouse down coordinates in variables until mouse release
	var c = document.getElementById("canv");
    var pos = getMousePos(c, event);
    var x1 = pos.x;
    var y1 = pos.y;

    var xminVal = Math.min(x1, mousedownx);
    var xmaxVal = Math.max(x1, mousedownx);
    var yminVal = Math.min(y1, mousedowny);
    var ymaxVal = Math.max(y1, mousedowny);

    // Check if rectangle intersects
    var indexOfRectangleWithSmallestAreaFit = -1;
    var areaOfRectangelWithSmallestAreaFit = 100000000;
    for (var i = 0; i < xmin.length; i++) {

    	if (intersectRect(xminVal, xmaxVal, yminVal, ymaxVal, xmin[i], xmax[i], ymin[i], ymax[i])) {

    		// Prefer rectangles with smallest area
    		var area = (xmax[i] - xmin[i]) * (ymax[i] - ymin[i]);

    		if (area < areaOfRectangelWithSmallestAreaFit) {
    			areaOfRectangelWithSmallestAreaFit = area;
    			indexOfRectangleWithSmallestAreaFit = i;
    		}
    	}
    };

    if (indexOfRectangleWithSmallestAreaFit == -1) {
    	return;
    }

    // Add the rectangle
    xmin.push(xminVal);
    xmax.push(xmaxVal);
    ymin.push(yminVal);
    ymax.push(ymaxVal);

    // Add the div
    var div = document.createElement('div');
    div.xmin = xminVal;
    div.ymin = yminVal;
    div.xmax = xmaxVal;
    div.ymax = ymaxVal;
    var showerDiv = document.getElementById("html-shower");
    showerDiv.appendChild(div);
    elementOfRect.push(div);

    // Draw the rectangle
    var c = document.getElementById("canv");
    var ctx = c.getContext("2d");
    ctx.rect(xminVal,yminVal,xmaxVal - xminVal, ymaxVal - yminVal);
	ctx.stroke();
	console.log("here");
}

function canvas(event) {
    var c = document.getElementById("canv");
    var ctx = c.getContext("2d");
    ctx.drawImage(event.result, 0, 0, 800, 600);
}

function loadImage() {
  var preload = new createjs.LoadQueue();
  preload.loadFile("http://www.hdwalley.com/wp-content/uploads/2015/10/landscape_wallpaper_picture_2013_hd_background.jpg");
  preload.addEventListener("fileload", canvas);
}

// *** Helper functions ***

// Convert to canvas coordinates
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Checks if 1 is contained entirely in 2
function intersectRect(xmin1, xmax1, ymin1, ymax1, xmin2, xmax2, ymin2, ymax2) {
	
	if (xmin1 > xmin2 && xmin1 < xmax2 &&
		xmax1 > xmin2 && xmax1 < xmax2 &&
		ymin1 > ymin2 && ymin1 < ymax2 &&
		ymax1 > ymin2 && ymax1 < ymax2) {

		return true;
	}
	return false;
}

// *** JQuery listeners ***

$(document).ready(loadImage);
   
$('#canv').on('mousedown', mousedown);
$('#canv').on('mouseup', mouseup);



//http://www.hdwalley.com/wp-content/uploads/2015/10/landscape_wallpaper_picture_2013_hd_background.jpg