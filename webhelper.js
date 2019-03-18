window.onload = setup;

var turn=0;
var colorsPicked=[];
var colors=[], code=[], guess=[], feedback=[];
colors = ["r","b","g","w","c","y"];
var thisTurn = [], turnRecords = [];
var board = document.getElementById("board");
var title = document.getElementById("title");
var buttonElement = document.getElementById("submit-guess");
var myPicks = document.getElementById("colors");

function setup() {
	board.removeChild(board.childNodes[0]);
	title.innerHTML = "Mastermind!";
	boardReset("<p class=\"clicker\">Click for instructions.</p><p>Press play button below to begin.</p>");
	board.setAttribute("onclick","instructions()");
	myPicks.classList.add("hide");
	buttonElement.onclick = function () {
		code=startGame();
	}
}

function instructions() {
	var howTo="Pick four colors by clicking on the four circles you'll see later, then press the Play button to get feedback.  Picking magenta on the first circle quits the game. You can choose more than one of each color, but picking all the same color is wasteful.\n\nThe game will respond with black circles for each right color in the right place, and white circles for right colors in the wrong place. The position of the black or white circles does not mean anything."
	alert(howTo);
}

function fourPicked(sid) {
	var colorPick = document.getElementById(sid);
	var included=false;
	colorPick.className = '';
	colorPick.classList.add(colorPick.value);
	for (var val=0; val<colorsPicked.length;val++){
		if (colorsPicked[val]==sid){
			included=true;
		}
	}
	if (included==false) {
		colorsPicked.push(sid)
	}	
	if (colorsPicked.length==4)
		Button=document.getElementById("submit-guess");
		Button.classList.add("fourok");
}

function startGame() {
	code=setCode(colors);
	var buttonElement = document.getElementById("submit-guess");
	board.removeChild(board.childNodes[1]);
	myPicks.className = "";
	boardReset("Code Is Set up!<br /><br />\nPick four choices.\n <span class=\"m\">Magenta</span> quits.");
	for (i=0;i<4;i++) {
		g=document.getElementById(i);
		guess[i]=g.options[g.selectedIndex].value;
	}
	buttonElement.onclick = function () {
		newGetGuess(code);
	}
	return code;
}

function newGetGuess(code) {
	var guess =[];
	var g = 0;
	turn++;
	if (turn > 6){
		document.getElementById("board").style.height = 320+(20*turn);
	}
	for (i=0;i<4;i++) {
		g=document.getElementById(i);
		guess[i]=g.options[g.selectedIndex].value;
	}
  masterMain(code,guess,turn);
}

function masterMain(code,guess,turn){
  var board = document.getElementById("board");
  board.removeChild(board.lastChild);
	var node = document.createElement('ul');
	board.appendChild(node).setAttribute("id","turns");
	feedback = testGuess(code,guess);
	thisTurn = addTurn(guess,feedback);
	turnRecords.push(thisTurn);
	if(feedback[3]=="b"){
	  boardReset("You won in "+turn+" turns!");
		board.style.backgroundImage="url('https://media.giphy.com/media/13vfiD0VBeksYE/giphy.gif')";
		newGame();
	}
	else if(guess[0]=="m"){
	  boardReset("Quitter! Play again? Press play.");
		board.style.backgroundColor = "red";
		board.style.color = "white";
		newGame();
	}
	else{
	  newFormatTurnRecords(turnRecords,turn);
	}
}

function boardReset(message){
  var board = document.getElementById("board");
  board.removeChild(board.childNodes[2]);
  var messageArea = document.createElement("p");
  messageArea.innerHTML=message;
  board.appendChild(messageArea);
}

function newGame(){
	var buttonElement = document.getElementById("submit-guess");
	buttonElement.onclick = function () {
		document.location.reload();
	}
}

function newFormatTurnRecords(turnRecords,turn){
	var thisGuess = "";
	var thisFeedback = "";
	var board=document.getElementById("board");
	for (var row=0;row<turn;row++) {
	    var turnList = document.getElementById("turns");
	    var node = document.createElement("li");
	    turnList.appendChild(node);
	    var newTurn = document.getElementById("turns").lastChild;
	    var ulNode = document.createElement("ul");
	    newTurn.appendChild(ulNode).setAttribute("class", "turn");
	    for (var peg=0;peg<turnRecords[row].length;peg++){
	      var newList = document.getElementsByClassName("turn");
	      var liNode = document.createElement("li");
	      newList[row].appendChild(liNode).setAttribute("class", turnRecords[row][peg]);
	  }
	}
}
