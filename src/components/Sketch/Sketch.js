import React, { useState } from 'react'
import BaseSketch from 'react-p5'

const windowWidth = 500
const windowHeight = 500

let j = 0; // nest loop var, continous motion in loop
let zorbRadius = 2; //size of balls
let speedWarp = 10; //if var "N" goes up this number has to go down
let density = 5; //the higher the more compact; values: {0.25,0.5,1,2,3,4,-.25,-.5,-1,-2,-3,-4}
let spacingY = 5; //the higher the more chaotic; values: {1,2,3,4,5,-1,-2,-3,-4,-5}
let spacingX = -3; //the higher the more chaotic; values: {1,2,3,4,5,6,-1,-2,-3,-4,-5,-6}
//let noise = 0; 
let N = 0;
let K = 0;

const Sketch = ({ zorbs, zoraEvents = { length: 500 } }) => {
	const [t, setT] = useState(0)
	const [zorbArray, setZorbArray] = useState([])

	const preload = p5 => {
		const myImages = []

		for (let i = 0; i < zorbs.length; i++) {
			myImages.push(p5.loadImage(zorbs[i]))
		}

		setZorbArray(myImages)
	}

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(windowWidth, windowHeight).parent(canvasParentRef)
	}

	const draw = p5 => {

		//-------------v------trying to rework for loop into first code design------v--------------------------

		/*
		for (let i = 0; i < N; x++)
			for (j = 0; j < N; j++) {
				
				const xCoordinate = i % N * K - 1;
				const yCoordinate = i / N * K - 1;
				const s = _ => {
					return Math.sin(j * p5.TAU * / speedWarp + 8 * Math.sqrt(density + Math.sin(y * spacingY) ** 2 + (y + sin(x * spacingX)) ** 2));
				}
				const d = _ => {
					return p5.dist(0, 0, 0, xCoordinate, yCoordinate, s / 8 + 0.5)
				}


				if (zorbIndex < zoraEvents.length) {
					p5.image(zorbArray[zorbIndex], xCoordinate, yCoordinate, zorbRadius/d, zorbRadius/d)
				}
			}
		-----------------------------------------------------------------
		*/

		p5.translate(125,125); //centering zorb, hard coded 
		p5.background(0); //black
		j++;  //motion
		N = 75; // odd numbers, number of points on sphere, doesn't change after set, it's in proportion to window size and aesthetics
		K = 2 / N; 
		p5.colorMode(HSB, 1);  
		
		for (i = 0; i < (N * N); i++){ //loops to plot points in the the sphere width
			zorbMotion();
		} 
	}

	const zorbMotion = p5 => {
		const x = i % N * K - 1;
		const y = i / N * K - 1;
		const s = _ => {
			return Math.sin(j * p5.TAU / speedWarp + 8 * Math.sqrt(density + Math.sin(y * spacingY) ** 2 + (y + Math.sin(x * spacingX)) ** 2)); //see read me for expression
		}
		const d = _ => {
			return p5.dist(0, 0, 0, x, y, s / 8 + 0.5)
		}
	
		p5.image(zorbArray[zorbIndex],x / d * N + N, y / d * N + N, zorbRadius/d, zorbRadius/d);
	}

	return <BaseSketch setup={setup} draw={draw} preload={preload} />
}

export default Sketch
