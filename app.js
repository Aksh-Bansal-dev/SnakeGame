const SNAKE_SPEED = 200;
let snakeBody = [{x:11,y:11},
				 {x:12,y:11}
				];

//food location on board
let foodLoc = {x:15, y:15};				

			

const scoreBoard = document.querySelector(".score");
const gameBoard = document.querySelector(".board");



//loop for game
let lastRender = 0;
let gameoverVal = false;

function loop(currentTime){
	//check gameover
	if(gameoverVal){
		if(confirm("GAME OVER!!! press ok to restart"))return window.location.reload();
		return window.location.reload();
	}
	//loop speed condition
	window.requestAnimationFrame(loop);
	const millisecondsPerFrame = currentTime-lastRender;
	if(SNAKE_SPEED>millisecondsPerFrame)return;

	console.log(`${1000/SNAKE_SPEED} fps`);
	lastRender = currentTime;
	
	//Re-rendering board on each render
	draw();

	//score
	scoreBoard.innerHTML = `Score: ${snakeBody.length-2}`
}


let start = false;


//listen to keypress
window.addEventListener("keydown",function(event){
	const key = event.key;
	update(key);
	// uncomment below to start on refresh
	
	(!start && key===" ")?window.requestAnimationFrame(loop):null;
})


//all possible moves HASHMAP
const moves = new Map();
moves.set("ArrowUp", 1);
moves.set("ArrowDown", 1);
moves.set("w", 1);
moves.set("s", 1);

moves.set("ArrowRight", 0);
moves.set("ArrowLeft", 0);
moves.set("a", 0);
moves.set("d", 0);


//last Key pressed value fromo above hashmap
let lastKey = "";

//snake length
let snakeLength = 2;

//update board on each keypress
function update(key){
	if(!key){
		key = lastKey;
	}else{
		const curKey = moves.get(key);
		if(moves.get(lastKey)===curKey)return;
		
	}
	lastKey = key;
	for(let i=snakeLength-2;i>=0;i--){
		snakeBody[i+1] = {...snakeBody[i]}
	}

	if(key==="ArrowUp" || key=== "w"){
		
		if(snakeBody[0].y!==1){
			snakeBody[0].y--;
		}else{
			gameover();
		}
	}
	else if(key==="ArrowDown" || key === "s"){
		
		if(snakeBody[0].y!==21){
			snakeBody[0].y++;
		}else{
			gameover();
		}
	}
	else if(key==="ArrowLeft" || key === "a"){
		
		if(snakeBody[0].x!==1){
			snakeBody[0].x--;
		}else{
			gameover();
		}
	}
	else if(key==="ArrowRight" || key === "d"){
		
		if(snakeBody[0].x!==21){
			snakeBody[0].x++;
		}else{
			gameover();
		}
	}
}



//GAME OVER func
function gameover(){
	gameoverVal = true;
}




//draw function - rendering snake and food on board
function draw(){

	//wipes old board
	gameBoard.innerHTML = "";

	//update the board
	update();

	//draw snake
	let i = 0;
	let onSnake = false;
	snakeBody.map(cell=>{

		if(cell.x===foodLoc.x && cell.y === foodLoc.y)onSnake = true;

		const element = document.createElement("div");
		element.style.gridRowStart = cell.y;
		element.style.gridColumnStart = cell.x;
		if(i===0){
			element.classList.add("snakeHead");
		}else if(snakeBody.length>4 && snakeBody[0].x===cell.x && snakeBody[0].y===cell.y){
			gameover();
		}else
			element.classList.add("snake");
		gameBoard.appendChild(element);
		i++;
	})

	// draw food
	if((snakeBody[0].x===foodLoc.x && snakeBody[0].y===foodLoc.y) || onSnake){
		foodLoc = {x: Math.floor(Math.random()*21+1), y: Math.floor(Math.random()*21+1)};
		snakeLength++;
	}

	drawFood(foodLoc);
}


//rendering food on board
function drawFood(food){

	const element = document.createElement("div");
	element.style.gridRowStart = food.y;
	element.style.gridColumnStart = food.x;

	element.classList.add("food");
	gameBoard.appendChild(element);
}

