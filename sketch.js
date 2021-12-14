var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var myResponse = new p5.Speech();
var eliza = new ElizaBot(true);
var listenFlag;
var bgcol;
var face;
var mic;

function setup(){
    mic = new p5.AudioIn();
    mic.start();
    // myRec.continuous = false;

// background graphic:
    createCanvas(windowWidth, windowHeight);
    bgcol = color(255);
    background(bgcol);
    noStroke();
    fill(100, 100, 100);
    
// instructions:
    textSize(28);
    textAlign(CENTER);
    textFont('Trebuchet MS');
    text("Welcome to the tree world", width/2, height/8);
    fill(80, 155, 180);
    text("Click & hold", width/2, height/8 + 100)
    myResponse.onLoad = checkVoice;
    myRec.onStart = function(){
      console.log("Started!");
    	listenFlag = true;
    };
    myRec.onResult = showResult;
    myRec.onEnd = function(){
      console.log("Ended!");
    	listenFlag = false;
    };
    myRec.onError = function() {
      console.log("Error!")};
	}

function draw()	{
    var vol = mic.getLevel();
    if(vol > 0.1){
      vol = 0.1
    }
        
// drawing Emoji face
// face
    fill(242, 220, 100);
    ellipse(width/2, height/2 + 50, 230 + vol*200, 240 + vol*200);
//shadow
    fill(200, 200, 200, 5);
    ellipse(width/2 , height/2 + 200, 150, 30);
// eyes
    fill(255);
    ellipse(width/2 - 43, height/2 +30, 40, 50);
    ellipse(width/2 + 43, height/2 +30, 40, 50);
    fill(0)
    ellipse(width/2 - 40, height/2 +30, 25, 30);
    ellipse(width/2 + 40, height/2 +30, 25, 30);
// cheeks
    fill(200, 100, 100, 100);
    ellipse(width/2 - 60, height/2 +70, 35, 20);
    ellipse(width/2 + 60, height/2 +70, 35, 20);   
 mouth
    fill(200,0,0);
    if(listenFlag == false){
      ellipse(width/2, height/2 + 110, 60 + vol*400, 5 + vol*1000);
    }	else{
      ellipse(width/2, height/2 + 110, 60, 5);
		}
  }

//set voice from 'Alex Alice Anna Carmit Daniel Fiona Fred Karen Kyoko Lekha Maged Mei-Jia Melina Moira Samantha Sin-ji Tessa Ting-Ting Veena Victoria Yuna'
function checkVoice() {
    myResponse.setVoice("Karen");
}

function showResult() {
    if(myRec.resultValue==true) {
        var mytxt = myRec.resultString;
        var reply = eliza.transform(myRec.resultString);
        background(192, 255, 192);
        fill(80, 180, 125);
        text("You: " + mytxt , width/2, height/8);
        text(reply, width/2, height/4);
        console.log(myRec.resultString);
        myResponse.speak(reply);
        listenFlag = true;
		}
	}

function mousePressed() {
    bgcol = color(255, 200, 200);
    background(bgcol);
    fill(255, 80, 80);
	text("Listening...", width/2, height/8);
    myRec.start();
}

function mouseReleased() {
    bgcol = color(192, 255, 192);
}

