	const gridHeight = 400;
	const gridWidth = 400;
	let theGrid = createArray(gridWidth);
	let mirrorGrid = createArray(gridWidth);
	const c = document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
	ctx.fillStyle = "#FF0000";

	fillRandom(); 

	tick(); 

	// Цикл игры
	function tick() { 
	    drawGrid();
	    updateGrid();
	    requestAnimationFrame(tick);
	}

// Массивы для сетки
	function createArray(rows) { 
	    const arr = [];
	    for (let i = 0; i < rows; i++) {
	        arr[i] = [];
	    }
	    return arr;
	}

// Заполняем рандомно сетку
	function fillRandom() { 
	    for (let j = 100; j < gridHeight - 100; j++) { 
	        for (let k = 100; k < gridWidth - 100; k++) { 
	            theGrid[j][k] = Math.round(Math.random());
	        }
	    }
	}

// Рисуем контент сетки в canvas
	function drawGrid() { 
		ctx.clearRect(0, 0, gridHeight, gridWidth); //this should clear the canvas ahead of each redraw
		    for (let j = 1; j < gridHeight; j++) { //iterate through rows
		        for (let k = 1; k < gridWidth; k++) { //iterate through columns
		            if (theGrid[j][k] === 1) {
		                ctx.fillRect(j, k, 1, 1);
	                }
		        }
		    }
	    }

// Обновление сетки на каждой итерации
	function updateGrid() { 
        for (let j = 1; j < gridHeight - 1; j++) { 
	        for (let k = 1; k < gridWidth - 1; k++) { 
	            let totalCells = 0;
	            totalCells += theGrid[j - 1][k - 1]; //верх лево
	            totalCells += theGrid[j - 1][k]; //верх центр
	            totalCells += theGrid[j - 1][k + 1]; //верх право

	            totalCells += theGrid[j][k - 1]; //середина лево
	            totalCells += theGrid[j][k + 1]; //середина право

	            totalCells += theGrid[j + 1][k - 1]; //низ лево
	            totalCells += theGrid[j + 1][k]; //низ центр
	            totalCells += theGrid[j + 1][k + 1]; //низ право

	            // Правила для каждой клетки
	            switch (totalCells) {
	                case 2:
	                    mirrorGrid[j][k] = theGrid[j][k];
                       
	                    break;
	                case 3:
	                    mirrorGrid[j][k] = 1; 
                        
	                    break;
	                default:
	                    mirrorGrid[j][k] = 0; 
	            }
	        }
	    }

	    // Меняем сетку
	    const temp = theGrid;
	    theGrid = mirrorGrid;
	    mirrorGrid = temp;
	}