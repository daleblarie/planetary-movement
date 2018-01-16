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

function clearCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.clearRect(x - radius - 1, y - radius - 1, (radius + 1) * 2, (radius + 1) * 2);
}
const $planets = [];

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
  $planets.push(this);
}

Planet.prototype.draw = function draw() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

Planet.prototype.clear = function clear() {
  clearCircle(this.pos[0], this.pos[1], this.size + 2);
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
    this.list[i].clearCircle();
    setTimeout(this.list[i].draw(), 5);
  }
};
