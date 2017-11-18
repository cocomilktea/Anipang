var characterArr = [];
var up, down, left, right;
var key;


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


document.getElementById("pang").addEventListener("click", ableToMove);

//클릭된 값의 상하좌우 값 가져오기
//arr : 캐릭배열
//return : 없음
function ableToMove(event){


	var v = getPosition(event);
	var vx = Number(v[0]);
	var vy = Number(v[1]);
	

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
	changePang(characterArr);
	updateHtml(characterArr);
	console.log(up, down, left, right);

	
	//return up, down, left, right;

}

var count = 0;


//처음 클릭한 값과 두번째 클릭한(상하좌우)값 체인지
//arr : 캐릭배열
//return : 없음
function changePang(arr){

	count++;
	console.log("count",count);
	var v, vx, vy;
	var pos, posx, posy

		/*
			문제점 상하좌우 위치를 값으로 가져와서
			중복되는 숫자면 위치에 상관없이 
			스왑이 가능해짐 
			위치를 값이 아닌 인덱스값으로 
			가져오기로 구현
		*/

	if(count % 2 == 1){
		// v = getPosition(event);
		// vx = Number(v[0]);
		// vy = Number(v[1]);
		// console.log("v, vx, vy",v, vx, vy);

		key = event.target.innerHTML;
		console.log("key",key);
	}
	if(count % 2 == 0){
		pos = getPosition(event);
		posx = Number(pos[0]);
		posy = Number(pos[1]);
		console.log("pos, posx, posy",pos, posx, posy);

		if(key == up){
			characterSwap(arr, posx, posy, posx - 1, posy);
		} else if(key == down){
			characterSwap(arr, posx, posy, posx + 1, posy);
		} else if(key == left){
			characterSwap(arr, posx, posy, posx, posy - 1);
		} else if(key == right){
			characterSwap(arr, posx, posy, posx, posy + 1);
		} else {
			console.log("못바꿈");
		}
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
	var arrId = id.split("");
	arrId.shift();


	//console.log(arrId);
/*
	//target에 drag setAttribute 
	var set = event.target;
	console.log(set);		
	set.setAttribute("draggable", "true");
	set.setAttribute("ondragstart", "drag(event)");
*/
	return arrId;
}





