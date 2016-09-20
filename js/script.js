"use strict"



var instrArray = message.split(';');//creating grid 1000x10
var arrayC = makeBoolArray(1000, 1000);


//function which build an array
function makeBoolArray(param1, param2){
	var grid = new Array(param1);

	for(var i = 0; i < grid.length; i++){
		grid[i] = new Array(grid.length);

		for(var j = 0; j < param2; j++){
			grid[i][j] = 0;
		}
	}

	return grid;
}



function turnOn(coord1, coord2, coord3, coord4, arr){
	
	for(var i = coord1; i <= coord3; i++){
		for(var j = coord2; j <= coord4; j++){
			arr[i][j] = 1;
		}
	}
};

function turnOff(coord1, coord2, coord3, coord4, arr){
	for(var i = coord1; i <= coord3; i++){
		for(var j = coord2; j <= coord4; j++){
			// debugger;
			arr[i][j] = 0;
		}
	}
}

function toggle(coord1, coord2, coord3, coord4, arr){
	for(var i = coord1; i <= coord3; i++){
		for(var j = coord2; j <= coord4; j++){

			if(arr[i][j]){
				arr[i][j] = 0;
			}else{
				arr[i][j] = 1;
			}
		}
	}
}


//function which count  how many lights are lit
function countIncluded(arr){
	var counter = 0;

	for(var i = 0; i < arr.length; i++){
		for(var j = 0; j < arr[i].length; j++){
			if(arr[i][j]){
				 counter++;
			}
		}
	}

	return counter;
}


// cut puzzle input and get coordunates and name of function
function cutInput(str){
	var arr = str.split(' ');
	var res = []

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

	var coordinates = arr[0];
	coordinates = coordinates.map(function(i){
		return +i;
	});

	return coordinates;
}

function getFuncName(arr){
	var funcName = arr[1];

	return funcName;
}

function getInstructions(instr){	
	for(var i = 0; i < instr.length; i++){

		var res = cutInput(instr[i]);

		var funcName = getFuncName(res);
		var coordinates = getCoordinates(res);

		var finalResult = init(coordinates, funcName, arrayC) ;
	}

	console.log(finalResult);
}

getInstructions(instrArray);



// function which accepts parameters of coordinates array
//and na,e of function and call it
function init(coordinates, funcName, arr){
	// var fn = window[funcName];
	// if (typeof fn === "function") fn.apply(null, coordinates);
	if(funcName === 'turnOn'){
		turnOn(coordinates[0], coordinates[1], coordinates[2], coordinates[3], arr);
	} else if (funcName === 'turnOff'){
		turnOff(coordinates[0], coordinates[1], coordinates[2], coordinates[3], arr);
	} else if(funcName === 'toggle'){
		toggle(coordinates[0], coordinates[1], coordinates[2], coordinates[3], arr);
	}

	var res = countIncluded(arrayC);
	return res; 	
}








