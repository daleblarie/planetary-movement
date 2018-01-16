/* global document */
/**
 * 1. Planet objects
 * 2. solar system object

 * 1. planets will ahve size mass, color, velocity, etc
 * 2. functions like draw, move, etc

 * 1. Solar system draw will draw each one of the planets
 * 2. update plants velocities
 */

// Helper Class
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;
const PLANET_LIST = [];

// making Planet()
/**
add
mass
velocity
color
size
position

create functions
draw
move
maybe do getter and setter functions
*/
// Planet Class
function Planet(name, mass, Xvel, Yvel, color, size, Xpos, Ypos) {
  this.mass = mass;
  this.vel = [Xvel, Yvel];
  this.color = color;
  this.size = size;
  this.pos = [Xpos, Ypos];
  this.name = name;
}

Planet.prototype.draw = function draw() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

Planet.prototype.move = function move() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};
// Making Solar system
/**
add Planets

move
draw
interact between Planets (update veolocities etc)

run loop
*/
// Solar System Class
function SolarSystem(list) {
  this.list = list;
}

SolarSystem.prototype.draw = function draw() {
  for (let i = 0; i < this.list.length; i += 1) {
    this.list[i].draw();
  }
};
SolarSystem.prototype.clear = function clear() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

SolarSystem.prototype.move = function move() {
  for (let i = 0; i < this.list.length; i += 1) {
    this.list[i].move();
  }
};

const earth = new Planet('earth', 1, 1, 1, 'blue', 60, 65, 65);
PLANET_LIST.push(earth);

const ss = new SolarSystem(PLANET_LIST);

setInterval(() => {
  ss.clear();
  ss.move();
  ss.draw();
}, 10);
