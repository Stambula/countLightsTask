"use strict"


import {message} from "./instructions"
console.log(message);

var div = document.getElementById('first-res');
let instructions = message.split(';');

const gridArray = makeGridArray();


//function creating grid 1000x1000
function makeGridArray(param1 = 1000, param2 = 1000){
	let grid = new Array(param1);

	for(let i = 0; i < grid.length; i++){
		grid[i] = new Array(grid.length);

		for(let j = 0; j < param2; j++){
			grid[i][j] = 0;
		}
	}
	return grid;
}


function turnOn( [coord1, coord2, coord3, coord4] = arrCoord, arr ){
	
	for(let i = coord1; i <= coord3; i++){
		for(let j = coord2; j <= coord4; j++){
			arr[i][j] = 1;
		}
	}
}

function turnOff([coord1, coord2, coord3, coord4] = arrCoord, arr){
	for(let i = coord1; i <= coord3; i++){
		for(let j = coord2; j <= coord4; j++){
			// debugger;
			arr[i][j] = 0;
		}
	}
}

function toggle([coord1, coord2, coord3, coord4] = arrCoord, arr){
	for(let i = coord1; i <= coord3; i++){
		for(let j = coord2; j <= coord4; j++){
			if(arr[i][j]){
				arr[i][j] = 0;
			}else{
				arr[i][j] = 1;
			}
		}
	}
}


//function which count  how many lights are lit
function countIncluded(arr = gridArray){
	let counter = 0;

	for(let i = 0; i < arr.length; i++){
		for(let j = 0; j < arr[i].length; j++){
			if(arr[i][j]){
				 counter++;
			}
		}
	}
	return counter;

	console.log(arr);
}


// cut puzzle input and get coordunates and name of function
function cutInput(str){
	let arr = str.split(' ');
	let res = []

	if(arr.length === 4){
		var coordinates = arr[1].concat(',' + arr[3]).split(',');
		var funcName = arr[0];

	}else{
		var coordinates = arr[2].concat(',' + arr[4]).split(',');
		arr[1] = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);
		var funcName = arr[0].concat(arr[1]);
	}

	res.push(coordinates);
	res.push(funcName);

	return res;

}

function getCoordinates(arr){

	let coord = arr[0];
	var coordinates = coord.map( i => i++ );

	return coordinates;
}

function getFuncName(arr){
	let funcName = arr[1];
	return funcName;
}



// function which accepts parameters of coordinates array
//and name of function and call it
function init(coordinates, funcName, arr){

	if(funcName === 'turnOn'){
		turnOn( coordinates,  arr);
	} else if (funcName === 'turnOff'){
		turnOff( coordinates, arr);
	} else if(funcName === 'toggle'){
		toggle( coordinates, arr);
	}

	var res = countIncluded();
	return res; 	
}

function getInstructions(instr){	

	var finalResult = instr.map(i => {
		var res = cutInput(i);
		var funcName = getFuncName(res);
		var coordinates = getCoordinates(res);
		return init(coordinates, funcName, gridArray) ;
	});

	div.innerHTML = `${finalResult[finalResult.length-1]}  lights are lit`;
}

window.onload = function(){
	getInstructions(instructions);
}








