var numArr = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7];
var characterArr = [];





//배열을 만드는 함수
function generateArr(arr){
	for(var i = 0; i < 7; i++){
		characterArr[i] = [];
		for(var j = 0; j < 7; j++){
			//characterArr[i][j] = i * 7 + j +1;
			var r = Math.floor(Math.random() * numArr.length);
			characterArr[i][j] = numArr[r];
		}
	}
}
generateArr(characterArr);



//html화면에 뿌려주기
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

			   	//setInterval(myImg(), 5000);
		}
	}
	console.log("update", key);

}
updateHtml(characterArr);




document.getElementById("pang").addEventListener("click", clickCharacter);



//캐릭터 클릭 하면 실행되는 이벤트함수 
function clickCharacter(event){
		
	changePang(characterArr);
	updateHtml(characterArr);

}

var count = 0;
//store second click
var pos = {x: -1, y:-1};
//store first click
var key = {x: -1, y:-1};

//처음 클릭한 값과 두번째 클릭한(상하좌우)값 체인지
function changePang(arr){

	count++;
	console.log("count",count);
	//first click, save key
	if(count % 2 == 1){
		var k = getPosition(event);
		key.x = k[0];
		key.y = k[1];

		//console.log("key",key);

		changeImg(arr, key.x, key.y);

		//스킬 조건문
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

//클릭하면 이미지 체인지
function changeImg(arr, x, y){
	if(arr[x][y] == 1){
		//document.getElementById("m"+x+y).src = "img/jl02.png";
		key.image = "img/jl02.png";
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
			}
		}
	}

	for(var j = 0; j < 7; j++){
		for(var i = 0; i < 5; i++){
			var y = countCol(arr, i, j);
			if (y >= 3) {
				console.log("열 지워!", i, j, y);
				eraseCol(arr, i, j, y);
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
}
//아이템 스킬 클릭시 해당 열 0~6까지 값 지움
function itemSkillCol(arr, x, y){
	for(var i = 0; i < 7; i++){
		var r = Math.floor(Math.random() * numArr.length);
		arr[i][y] = numArr[r];					
	}
}



/*     시간      */
var sec = 0;
var click = 0;
var intervalSec;
function startBtn(){

	sec = 0;
	intervalSec = setInterval("countSec()", 1000); 

}

//게임시간  1분 카운트하는 함수
function countSec(){ 
	sec += 1;

	document.getElementById("second").innerHTML = sec; 
	document.getElementById("btn").disabled = true;

	if(sec > 60){
		document.getElementById("second").innerHTML = "gameOver"; 
		document.getElementById("btn").disabled = false;
		clearInterval(intervalSec);
		//TODO Pang Disabled 처리
	}

}







