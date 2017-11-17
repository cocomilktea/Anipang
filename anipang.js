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
console.log(characterArr);



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


document.getElementById("pang").addEventListener("click", findNeighbor);

//클릭된 값의 상하좌우 값 가져오기
//arr : 캐릭배열
//return : 없음
function findNeighbor(event){
	var v = getPosition(event);
	var vx = Number(v[0]);
	var vy = Number(v[1]);

	var up, down, left, right;
	up = down = left = right = -1; //좌표중에 -1은 없는값
	if(vx !== -1){
		if(vx > 0){
			up = characterArr[vx - 1][vy];
		}
		if(vy > 0){
			left = characterArr[vx][vy - 1];
		}
		if(vx < 6){
			down = characterArr[vx + 1][vy];
		}
		if(vy < 6){
			right = characterArr[vx][vy + 1];
		}
	}
	console.log(up, down, left, right);
}


//클릭이벤트 함수
function getPosition(event){
	
	var id = event.target.id;
	var arrId = id.split("");
	arrId.shift();
	
	return arrId;
}




/*

//클릭한 값 위치 가져오기
//arr : 캐릭배열, v : 클릭한값
//return : 값이 있으면 pos리턴 없으면 null 리턴
function findPosition(arr, v){
	var pos = {x : -1, y : -1}; //-1은 없는값으로 초기화
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 7; j++){
			if(arr[i][j] ==  v ){
				pos.x = i;
				pos.y = j;
				break;
			}
		}
	}
	if(pos.x !== -1){
		console.log(pos);
		return pos;
	} else {
		return null;
	}
}

*/



