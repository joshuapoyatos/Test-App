
$(document).ready(function(){

	var slots =	[[0, 0, 0, 0, 0, 0, 0],//row 0
				[0, 0, 0, 0, 0, 0, 0], //row 1
				[0, 0, 0, 0, 0, 0, 0], //row 2
				[0, 0, 0, 0, 0, 0, 0], //row 3
				[0, 0, 0, 0, 0, 0, 0], //row 4
				[0, 0, 0, 0, 0, 0, 0], //row 5
				[0, 0, 0, 0, 0, 0, 0]]; //row 6
	
	var turn = 1;
	
	var player1 = "";
	var player2 = "";
	var win = 0;
	
	/*Create board*/
	var text = "";
	for(var i=0; i<7; i++)
	{
		text += "<div class=\"column\" data-column=" + i +">"
		for(var j=0; j<7; j++)
			text += "<div class=\"block\"> </div>"
		text += "</div>"
	}
	
	$("#board").append(text);
	
		
	/*Commands*/
	
	$(".block").hover(
		function(){
			$(this.parentNode.children).css("background-color","lightgray");
				var color;
			if(turn == 1)
				color = "background:radial-gradient(black 30%, white 100%);";
			else
				color = "background:radial-gradient(white 30%, black 100%);";

			
		},
		function(){
			$(this.parentNode.children).css("background-color", "#FFFEEE");
		}
	);
	
	$(".block").click(function() {
	console.log(win);
		if( win == 0){
			var col = $(this.parentNode).data("column");
			var i;
			
			for(i=0; i<7; i++)
				if(slots[i][col]==0)
					break;
			
			slots[i][col] += turn;
			console.log("(" + i + "," + col + ")");
			var color;
			win = check(i,col);
			if(win){
				console.log(win);
				if(win==1){
					document.getElementById('p1').innerText = player1 + " win";
					document.getElementById('p2').innerText = player2 + " lose";
				}
				else{
					document.getElementById('p1').innerText = player1 + " lose";
					document.getElementById('p2').innerText = player2 + " win";
				}
				if(turn == 1) {
					color = "background:radial-gradient(black 30%, white 100%);";
				}
				else {
					color = "background:radial-gradient(white 30%, black 100%);"
				}			
			}
			else{
				if(turn == 1) {
					document.getElementById('p1').innerText = player1;
					document.getElementById('p2').innerText = player2 + "'s turn";
					color = "background:radial-gradient(black 30%, white 100%);";
					turn++;
				}
				else {
					document.getElementById('p1').innerText = player1 + "'s turn";
					document.getElementById('p2').innerText = player2;
					color = "background:radial-gradient(white 10%, black 100%);"
					turn--;
				}
			}
			var t = -535 - $(".block").height();
			var text = "<div class=\"circle\" style=\"margin-top: "  + t
			 + "px;margin-left:10px; " + color + "\"></div>"
			$(text).appendTo(this.parentNode);	
			console.log(i);
			$(this.parentNode.lastChild).animate({marginTop: -(i* $(".block").height())- $(".block").height() - (i*7.2)+'px'},"slow");
		}
	});
		
	function check(row, col) {
		var count = 0;
		/*vertical*/
		for(var i=0; i<7; i++){
			if(slots[i][col] == slots[row][col])
				count++;
			else
				count = 0;
			if(count ==4)
				return turn;
		}
		count = 0;
		/*horizontal*/
		for(var i=0; i<7; i++){
			if(slots[row][i] == slots[row][col])
				count++;
			else
				count = 0;
			if(count ==4)
				return turn;
		}
		count = 0;
		
		/*diagonal*/
		
		var r = row;
		var c = col;
		if(r < c) {
			c = c - r;
			r = 0;
		}
		else {
			r = r - c;
			c = 0;
		}		
		while(r < 7 && c < 7){
			if(slots[row][col] == slots[r][c])
				count++;
			else
				count = 0;
			if(count == 4)
				return turn;
			c++;
			r++;
		}
		count = 0;
		
		r = row;
		c = col;
		
		if(c + r < 7){
			c = c + r;
			r = 0;
		}
		else {
			r = r + c - 6;
			c = 6;		
		}
		
		while(r < 7 && c >= 0){
			if(slots[row][col] == slots[r][c])
				count++;
			else
				count = 0;
			if(count == 4)
				return turn;
			c--;
			r++;
		}
		
		return 0;
		
	}
	
	$("#start").click(function(){
		if(player2 != "" || player1 != ""){
			$("h1").animate({fontSize:"2em"});
			$("#start").remove();
			$("#board").fadeIn("slow");
			$("#restart").fadeIn("slow");
			if(turn == 1) {
				document.getElementById('p1').innerText = player1 + "'s turn";
				document.getElementById('p2').innerText = player2;
				color = "background:radial-gradient(black 30%, white 100%);";
			}
			else {
				document.getElementById('p1').innerText = player1;
				document.getElementById('p2').innerText = player2 + "'s turn";
				color = "background:radial-gradient(white 30%, black 100%);";
			}
		}
		
	});
	
	$("#1r").click( function(){
		document.getElementById('p1').innerText = document.getElementById('play1').value;
		player1 = document.getElementById('p1').innerText;
	});
	
	$("#2r").click(function(){
		document.getElementById('p2').innerText = document.getElementById('play2').value;
		player2 = document.getElementById('p2').innerText;	
	});
	
	$("#restart").click(function(){
		location.reload();
	});
	
});
