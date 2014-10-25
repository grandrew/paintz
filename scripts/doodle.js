'use strict';

/**
 * Create a new Doodle.
 * @param {CanvasRenderingContext2D} cxt - The canvas context in which the shape is being drawn.
 * @param {Number} startX - The x-coordinate of the shape's starting point.
 * @param {Number} startY - The y-coordinate of the shape's starting point.
 * @param {Number} [lineWidth] - The width of the shape's outline.
 * @param {String} [lineCalar] - The CSS color of the shape's outline.
 */
function Doodle(cxt, startX, startY, lineWidth, lineColor) {
	Shape.call(this, cxt, startX, startY, lineWidth, lineColor, null);
	this.lastX = startX;
	this.lastY = startY;
}

Doodle.prototype = Object.create(Shape.prototype);


/**
 * Update the doodle as it is being drawn.
 * @override
 * @param {Number} newX - The current x-coordinate of the cursor.
 * @param {Number} newY - The current y-coordinate of the cursor.
 */
Doodle.prototype.updatePreview = function (newX, newY) {
	Shape.prototype.updatePreview.call(this, newX, newY);
	
	// Connect to the existing preview.
	this._cxt.beginPath();
	this._cxt.moveTo(currentShape.lastX, currentShape.lastY);
	this._cxt.lineTo(newX, newY);
	this._cxt.closePath();
	this._cxt.stroke();
	
	// Force round end caps on the path.
	this._cxt.fillStyle = this.lineColor;
	this._cxt.beginPath();
	this._cxt.arc(newX, newY, this.lineWidth / 2, 0, 2 * Math.PI, false);
	this._cxt.closePath();
	this._cxt.fill();
	
	// Store the last x and y.
	this.lastX = newX;
	this.lastY = newY;
};
