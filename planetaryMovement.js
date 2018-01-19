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

function force(mass1, mass2, pt1, pt2) {
  const G = -.5
  const x1 = pt1[0];
  const x2 = pt2[0];
  const y1 = pt1[1];
  const y2 = pt2[1];
  const dist = Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));

  if (dist < 50) {
    return [0, 0];
  }
  const xHat = (x2 - x1) / dist;
  const yHat = (y2 - y1) / dist;
  const forceMagnitude = (-G * mass1 * mass2) / (dist ** 2);
  const forceXVector = xHat * forceMagnitude;
  const forceYVector = yHat * forceMagnitude;
  return [forceXVector, forceYVector];
}

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
    const planet1 = this.list[i];
    const totalForceOnPlanet1 = [0, 0];
    for (let j = 0; j < this.list.length; j += 1) {
      const planet2 = this.list[j];
      if (planet1 !== planet2) {
        const currentForce = force(planet1.mass, planet2.mass, planet1.pos, planet2.pos);
        totalForceOnPlanet1[0] += currentForce[0];
        totalForceOnPlanet1[1] += currentForce[1];
      }
    }
    planet1.vel[0] += totalForceOnPlanet1[0] / planet1.mass;
    planet1.vel[1] += totalForceOnPlanet1[1] / planet1.mass;
  }

  for (let i = 0; i < this.list.length; i += 1) {
    this.list[i].move();
  }
};

const earth = new Planet('earth', 1000, 10, 0, 'blue', 60, 1500, 0);
// const mars = new Planet('mars', 5, 18, 0, 'red', 40, 1500, 700);
// const venus = new Planet('venus', 5, 18, 0, 'green', 55, 1500, 600);
// const a = new Planet('saturn', 5, 14, -0, 'orange', 55, 1500, 500);
// const b = new Planet('pluto', 5, 13, 0, 'purple', 55, 1500, 400);
// const c = new Planet('uranus', 5, 12, 0, 'yellow', 55, 1500, 300);
const moon = new Planet('moon', 0.1, 10 + 2.88, 0, 'red', 25, 1500, 60);
const d = new Planet('sun', 200000, -0.001, 0, 'yellow', 30, 1500, 1000);

PLANET_LIST.push(earth, moon, d);


const ss = new SolarSystem(PLANET_LIST);

setInterval(() => {
  ss.clear();
  ss.move();
  ss.draw();
}, 0.01);
