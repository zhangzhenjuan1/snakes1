window.onload=function(){
	var game=document.getElementsByClassName('game');
	var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}],
	LEFT=37,RIGHT=39,UP=38,DOWN=40,
	MAXSNAKE=100,
	row=10,
	defaultDirection=RIGHT,
	SNAKECOLOR='#0E0E7C',FOODCOLOR='red',DEFAULTCOLOR='white',

	isInSnake=function(x,y){    //可以优化 用字典
		for(var j=0;j<snake.length;j++){
			if(snake[j].x==x && snake[j].y==y){return true;}
		}
		return false;
	},
	random=function(){
	    return Math.floor( Math.random()*row );
	},
	dropFood=function(){
		var x=random(),y=random();
		if(snake.length==MAXSNAKE){return null;}
		while(isInSnake(x,y)){
			x=random();
			y=random();
		}
		// document.getElementById(x+'_'+y).style.backgroundColor=FOODCOLOR;
		document.getElementById(x+'_'+y).style.backgroundImage='url(./img/food.jpg)';
		// document.getElementById(x+'_'+y).style.zIndex='0.1';

		return {foodx:x,foody:y};
	},
	food=dropFood(),

	zou=function(){
		// defaultDirection=dir;
		var last=snake.length-1;
		var newhead;
		if(defaultDirection==LEFT){
			// while(snake[last].y>0){
			newhead={x:snake[last].x,y:snake[last].y-1};//}
		}
		if(defaultDirection==RIGHT){
			newhead={x:snake[last].x,y:snake[last].y+1};
		}
		if(defaultDirection==DOWN){
		    newhead={x:snake[last].x+1,y:snake[last].y};
		}
		if(defaultDirection==UP){
		    newhead={x:snake[last].x-1,y:snake[last].y};
		}
		if(newhead.x>9||newhead.x<0||newhead.y>9||newhead.y<0){
			
			// alert('GAME OVER');
			game[0].style.display='block';
			clearInterval(t);
			return; 
		}
		if(isInSnake(newhead.x,newhead.y)){
			alert('咬自己干嘛');
			// clearInterval(t);
			return;
		}
		if(newhead.x==food.foodx&&newhead.y==food.foody){
			snake.push(newhead);
			document.getElementById(food.foodx+'_'+food.foody).style.backgroundColor=SNAKECOLOR;
			// document.getElementById(food.foodx+'_'+food.foody).style.zIndex='0.2';
			document.getElementById(food.foodx+'_'+food.foody).style.backgroundImage='none';

			food=dropFood();
			return null; 
		}

		var weiba=snake.shift();
		snake.push(newhead);
		document.getElementById( weiba.x+'_'+weiba.y ).style.backgroundColor='white';
		document.getElementById( weiba.x+'_'+weiba.y ).style.backgroundImage='none';
		document.getElementById(newhead.x+'_'+newhead.y).style.backgroundColor=SNAKECOLOR;
		return null;
	};

// setInterval(zou,100);

//-----------------------------------逻辑部分------------------------------------
	(function(){
		for(var i=0;i<snake.length;i++){
			document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundColor=SNAKECOLOR;
		}		
	})(),
	// drawSnake();
	document.onkeydown=function(e){
		var direction=e.keyCode;
		if(direction==LEFT||direction==UP||direction==RIGHT||direction==DOWN){
			if(Math.abs(direction-defaultDirection)!==2){
				defaultDirection=direction;
				zou();
			}
		}
	};
	// setInterval(zou(direction),100);
	var sd1=document.getElementById('sd1');
	var sd2=document.getElementById('sd2');
	var sd3=document.getElementById('sd3');
	// var t=setInterval(zou,100);
	var t;
	sd1.onclick=function(){
		t=setInterval(zou,800);
	};
	sd2.onclick=function(){
		t=setInterval(zou,400);
	};	
	sd3.onclick=function(){
		t=setInterval(zou,100);
	};
	var cxks=document.getElementsByClassName('cxks');
	cxks[0].onclick=function(){
		location.reload();
	}
};