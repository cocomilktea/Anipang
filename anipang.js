var characterArr = [];




//배열을 만드는 함수
//arr : 캐릭배열
//return : 없음
function generateArr(arr){
	for(var i = 0; i < 7; i++){
		characterArr[i] = [];
		for(var j = 0; j < 7; j++){
			//characterArr[i][j] = i * 7 + j +1;
			var r = Math.floor(Math.random() * 8 + 1);
			characterArr[i][j] = r;
		}
	}
}
generateArr(characterArr);


//html화면에 뿌려주기
//arr : 캐릭배열
//return : 없음
function updateHtml(arr){
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 7; j++){
			var h = document.getElementById("n"+i+j);
			h.innerHTML = characterArr[i][j];
		}
	}
}
updateHtml(characterArr);


document.getElementById("pang").addEventListener("click", clickCharacter);


function clickCharacter(event){

	changePang(characterArr);
	updateHtml(characterArr);
	
}

var count = 0;
var pos = {x: -1, y:-1};
var key = {x: -1, y:-1};

//처음 클릭한 값과 두번째 클릭한(상하좌우)값 체인지
//arr : 캐릭배열
//return : 없음
function changePang(arr){

	count++;
	console.log("count",count);
	//first click, save key
	if(count % 2 == 1){
		var k = getPosition(event);
		key.x = k[0];
		key.y = k[1];
		console.log("key",key);

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

/*
	//target에 drag setAttribute 
	var set = event.target;
	console.log(set);		
	set.setAttribute("draggable", "true");
	set.setAttribute("ondragstart", "drag(event)");
*/	
}

function countRow(arr, i, j) {
	var x = arr[i][j]
	var countX = 0;
	while(j < 7) {
		//console.log("j",j);		
		if (arr[i][j] == x) {
			countX++;
		} else {
			break;
		}
		j++;
	}
	return countX;
}

function countCol(arr, i, j){
	var y = arr[i][j];
	var countY = 0;
	while(i < 7){
		//console.log("ij",i, j);
		if(arr[i][j] == y){
			countY++;
		} else {
			break;
		}
		i++;
	}
	return countY;
}

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



function eraseRow(arr, x, y, n){

	for(var i = x; i >= 0; i--){
		for(var j = 0; j < n; j++){
			if(i == 0){
				var r = Math.floor(Math.random() * 8 + 1);
				arr[i][y + j] = r;
			} else {
				arr[i][y + j] = arr[i - 1][y + j];
			}			
		}
	}
}


function eraseCol(arr, x, y, n){

	for(var i = 0; i < n; i++){
		if((x + i) - n < 0){
			var r = Math.floor(Math.random() * 8 + 1);
			arr[x + i][y] = r;
		} else {
			arr[x + i][y] = arr[(x + i) - n][y];
			var r = Math.floor(Math.random() * 8 + 1);
			arr[(x + i) - n][y] = r;			
		}
	}
}

