var numArr = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7];
var characterArr = [];
var score = 0;
var running = false;

//배열을 만드는 함수
function generateArr(arr){
	for(var i = 0; i < 7; i++){
		characterArr[i] = [];
		for(var j = 0; j < 7; j++){
			var r = Math.floor(Math.random() * numArr.length);
			characterArr[i][j] = numArr[r];
		}
	}
}
generateArr(characterArr);



//updateHtml
function updateHtml(arr){
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 7; j++){
			var h = document.getElementById("n"+i+j);
			h.innerHTML = characterArr[i][j];
			var x = document.createElement("IMG");
			x.setAttribute("id", "m"+i+j); 
			
			if(characterArr[i][j] == 1 ){		
				if (!!key && key.x== i && key.y == j && count % 2 == 1) {
   					x.setAttribute("src", "img/jl02.png");
   				} else {
   					x.setAttribute("src", "img/jl01.png");
   				}
			}
			if(characterArr[i][j] == 2){	
				if (!!key && key.x== i && key.y == j && count % 2 == 1) {
   					x.setAttribute("src", "img/jina02.png");
   				} else {
   					x.setAttribute("src", "img/jina01.png");;
   				}				
			}
			if(characterArr[i][j] == 3){	
				if (!!key && key.x== i && key.y == j && count % 2 == 1) {
   					x.setAttribute("src", "img/heana02.png");
   				} else {
   					x.setAttribute("src", "img/heana01.png");
   				}					
			}			
			if(characterArr[i][j] == 4){	
				if (!!key && key.x== i && key.y == j && count % 2 == 1) {
   					x.setAttribute("src", "img/koo02.png");
   				} else {
   					x.setAttribute("src", "img/koo01.png");
   				}								
			}
			if(characterArr[i][j] == 5){	
				if (!!key && key.x== i && key.y == j && count % 2 == 1) {
   					x.setAttribute("src", "img/jack02.png");
   				} else {
   					x.setAttribute("src", "img/jack01.png");
   				}				
			}
			if(characterArr[i][j] == 6){	
				if (!!key && key.x== i && key.y == j && count % 2 == 1) {
   					x.setAttribute("src", "img/hyun02.png");
   				} else {
   					x.setAttribute("src", "img/hyun01.png");
   				}					
			}
			if(characterArr[i][j] == 7){		
   				x.setAttribute("src", "img/honux.png");
			}			

		   	x.setAttribute("width", "45");
			x.setAttribute("height", "45");
		    x.setAttribute("alt", "Pang");
		   	h.appendChild(x);
		}
	}
}
updateHtml(characterArr);



document.getElementById("pang").addEventListener("click", clickCharacter);



//click character 
function clickCharacter(event){

	if(running) {
		changePang(characterArr);
		updateHtml(characterArr);
	} else {
		return;
	}
		


}

var count = 0;

//store first click
var key = {x: -1, y:-1};
//store second click
var pos = {x: -1, y:-1};

//처음 클릭한 값과 두번째 클릭한(상하좌우)값 체인지
function changePang(arr){

	count++;
	console.log("count",count);
	//first click, save key
	if(count % 2 == 1){
		var k = getPosition(event);
		key.x = k[0];
		key.y = k[1];

		console.log("key",key);


		//skill
		if(arr[key.x][key.y] == 7){
			itemSkillCol(arr, 0, key.y); 
			itemSkillRow(arr, 6, 0);				
			var r = Math.floor(Math.random() * numArr.length);
			arr[key.x + 1][key.y] = numArr[r];
							
			count = 0;
		}

	} else if(count % 2 == 0){ 
		//second click
		var p  = getPosition(event);	
		pos.x = p[0];
		pos.y = p[1];
		console.log("pos",pos);

		var move = false;

		// console.log("arr[key.x][key.y] = " + arr[key.x][key.y]);
		// console.log("arr[pos.x][pos.y-1] = " + arr[pos.x][pos.y-1]);
		// console.log("arr[pos.x][pos.y-2] = " + arr[pos.x][pos.y-2]);
		// console.log("arr[key.x][key.y] == " + arr[key.x][key.y] == arr[pos.x][pos.y-1]);

		// if(arr[key.x][key.y] == arr[pos.x][pos.y - 1] == arr[pos.x][pos.y - 2]) {
		// 	console.log("바꿀수있음");
		// 	move = true;
		// }		






		if(key.x == pos.x && Math.abs(key.y - pos.y) === 1) {
				move = true;
		}
		if (key.y == pos.y && Math.abs(key.x - pos.x) === 1) {
				move = true;
		}

		if (move) {
			characterSwap(arr, key.x, key.y, pos.x, pos.y);
			check(arr);
		} else {
			console.log("못바꿈");
		}
		count = 0;
	}
}



//캐릭터 스왑
function characterSwap(arr, x1, y1, x2, y2) {
	var temp = arr[x1][y1];
	arr[x1][y1] = arr[x2][y2];
	arr[x2][y2] = temp;
}


//클릭이벤트 함수
function getPosition(event){
	var id = event.target.id;
	var arrId = id.split("").map(Number);
	arrId.shift();

	return arrId;

}

//같은 캐릭이 있는 행 카운트
function countRow(arr, i, j) {
	var x = arr[i][j]
	var countX = 0;
	while(j < 7) {	
		if (arr[i][j] == x) {
			countX++;
		} else {
			break;
		}
		j++;
	}
	return countX;
}

//같은 캐릭이 있는 열 카운트
function countCol(arr, i, j){
	var y = arr[i][j];
	var countY = 0;
	while(i < 7){
		if(arr[i][j] == y){
			countY++;
		} else {
			break;
		}
		i++;
	}
	return countY;
}



//열 행 카운트한 값을 체크
function check(arr){
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 5; j++){
			var x = countRow(arr, i, j);
			if (x >= 3) {
				console.log("줄 지워!", i, j, x);	
				eraseRow(arr, i, j, x);
				score += x * 5;
				document.getElementById("score").innerHTML = score;
			}
		}
	}

	for(var j = 0; j < 7; j++){
		for(var i = 0; i < 5; i++){
			var y = countCol(arr, i, j);
			if (y >= 3) {
				console.log("열 지워!", i, j, y);			
				eraseCol(arr, i, j, y);
				score += y * 5;
				document.getElementById("score").innerHTML = score;
			} 
		}
	}		
	
}

/*     지우기      */

//행을 지우는 함수
//arr:캐릭배열 x:idx0 y:idx1 n:중복값 개수
function eraseRow(arr, x, y, n){

	for(var i = x; i >= 0; i--){
		for(var j = 0; j < n; j++){
			if(i == 0){
				var r = Math.floor(Math.random() * numArr.length);
				arr[i][y + j] = numArr[r];
			} else {
				arr[i][y + j] = arr[i - 1][y + j];
			}			
		}
	}

}

//열을 지우는 함수
//arr:캐릭배열 x:idx0 y:idx1 n:중복값 개수
function eraseCol(arr, x, y, n){

	for(var i = 0; i < n; i++){
		if((x + i) - n < 0){
			var r = Math.floor(Math.random() * numArr.length);
			arr[x + i][y] = numArr[r];
		} else {
			arr[x + i][y] = arr[(x + i) - n][y];
			var r = Math.floor(Math.random() * numArr.length);
			arr[(x + i) - n][y] = numArr[r];			
		}
	}
}


/*     스킬      */
//아이템 스킬 클릭시 마지막 열 0~6까지 값 지움
function itemSkillRow(arr, x, y){

	for(var i = x; i >= 0; i--){
		for(var j = 0; j < 7; j++){
			if(i == 0){
				var r = Math.floor(Math.random() * numArr.length);
				arr[i][y + j] = numArr[r];
			} else {
				arr[i][y + j] = arr[i - 1][y + j];
			}			
		}
	}
	score += 50;
	document.getElementById("score").innerHTML = score;
}
//아이템 스킬 클릭시 해당 열 0~6까지 값 지움
function itemSkillCol(arr, x, y){
	for(var i = 0; i < 7; i++){
		var r = Math.floor(Math.random() * numArr.length);
		arr[i][y] = numArr[r];					
	}
}



/*     시간      */
var sec = 60;
var click = 0;
var intervalSec;
function startBtn(){
	score = 0;
	sec = 60;
	running = true;
	document.getElementById("score").innerHTML = score;
	intervalSec = setInterval("countSec()", 1000); 

}

//게임시간  1분 카운트하는 함수
function countSec(){ 
	sec -= 1;

	document.getElementById("second").innerHTML = sec; 
	document.getElementById("startbtn").disabled = true;

	if(sec == 0){
		alert("GAME OVER");
		document.getElementById("startbtn").disabled = false;
		running = false;
		clearInterval(intervalSec);
		//TODO Pang Disabled 처리
	}

}

function resetBtn(){
	generateArr(characterArr);
	updateHtml(characterArr);
}






