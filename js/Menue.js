//Sub namespacing
Snake.Menue = {};

//StartMenue, Instructions & Fenster, Buttons
Snake.Menue.StartMenue = function() {

        var _startButton = new Snake.Menue.Buttons("img/spiel_starten_button.png", 0, 0); //Startbutton erstellen
        var _instButton = new Snake.Menue.Buttons("img/anleitung_button.png", 0, 100); //Instructionbutton erstellen

        //erstellt ein MenueFenster mit Ueberschrift
        this.menueWindow = function (title, x, y) {
            var _window = new createjs.Container(); //Containerelement, das dann Hintergrund und Ueberschrift enthaelt
            var _mainbg = new createjs.Shape(); //Hintergrund vom Fenster
            var _title = new createjs.Text(title, "80px pixel", "white");   //Ueberschrift
            var _x = x; //verschiebt Ueberschrift auf xAchse
            var _y = y; //verschiebt Ueberschrift auf yAchse
            //Text zentrieren
            var b = _title.getBounds();
            console.log("textbreite: " + b.width);
            console.log("abstand links: " + (stage.canvas.width - b.width)/2);
            _title.x = (stage.canvas.width - b.width)/2 +x;
            _title.y = (stage.canvas.height/4) +y;
            _mainbg.graphics.beginFill("black").drawRect(0,0,stage.canvas.width, stage.canvas.height); //Hintergrund
             _window.addChild(_mainbg, _title);
            return _window;
        }//endMenueWindow
    
        //erstellt Startfenster den Spiels
        this.addMenueView = function () {

            var _level = 1;

            var startWindow = new createjs.Bitmap("img/spielstart.png"); //erstellt neues Menuefenster

            stage.addChild(startWindow, _startButton, _instButton);
            stage.update();

            // Button Listeners
            _startButton.addEventListener("click", function (event) {   //startet Spiel
                stage.removeAllChildren();
                startGame(_level);

            });
            _instButton.addEventListener("click", function (event) {    //fuehrt zum Instructionfenster
                var _instWindow = new Snake.Menue.Instructions;
                stage.removeAllChildren();
                _instWindow.addInstructionView();

            });
            //end ButtonListeners

    }//end addMenueView
    
}//end StartMenue
//Klasse fuegt Instructionfenster hinzu
Snake.Menue.Instructions = function () {
 //Fenster erstellen
    var _instBack = new Snake.Menue.Buttons("back", "white",0, 100); //zurueck Button erstellen
    var _level = 1;
    var _startButton = new Snake.Menue.Buttons("img/spiel_starten_button.png", 0, 0); //Startbutton erstellen
    var _instWindow = new Snake.Menue.StartMenue().menueWindow("about", 0, 0); //Fenster erstellen

    //Fenster, Buttons und Eventlistener fuer das Instructionfenster
    this.addInstructionView = function () {
        stage.addChild(_instWindow,_startButton);
        stage.update();

        //Button Listeners
        _startButton.addEventListener("click", function (event) {   //startet Spiel
            stage.removeAllChildren()   //erst alle Elemente von Stage entfernen
            startGame(_level);  //Spielfeld wird gezeichntet

        })
        /*_instBack.addEventListener("click", function (event) {      //zurueck zum Startmenue
            var gameMenue = new Snake.Menue.StartMenue();
            stage.removeAllChildren() //erst alle Elemente von Stage entfernen
            gameMenue.addMenueView();
        })*/
        //end Button Listeners
    }//end addInstructionsView
}//end Instructions


//Klasse um neue Buttons zur erstellen
Snake.Menue.Buttons = function (path, x, y) {
    //Button container
    //var _bc = new createjs.Container(); //Containerelemnt, enthalt Hintergrund und Text
    var _bc = new createjs.Bitmap(path);
    var _x = x; //verschiebt Button auf xAchse
    var _y = y; //verschiebt Button auf yAchse
    _bc.scaleX = 0.5;
    _bc.scaleY = 0.5;
    console.log(_bc.x);
    _bc.x = (stage.canvas.width-514*0.5)/2 + _x;
    _bc.y = (stage.canvas.height/2) + _y;
    console.log(_bc.x);
    //_bc.addChild(startB, startTxt);

    /*var startB = new createjs.Shape();
    var startTxt = new createjs.Text(label, "40px pixel", "black");
    //Text zentrieren
    startTxt.x = (stage.canvas.width - startTxt.getBounds().width)/2 +x;
    startTxt.y = (stage.canvas.height/2) + y;

    startB.graphics.beginFill(color).drawRoundRect(0,0,startTxt.getBounds().width +30,startTxt.getBounds().height +20,10);
    //Button zentrieren
    startB.x = (stage.canvas.width - (startTxt.getBounds().width +30))/2 +x;
    startB.y = (stage.canvas.height/2)+y;
    _bc.addChild(startB, startTxt);*/
    return _bc;
}//end Buttons


//GameOverScreen
Snake.Menue.GameOver = function () {
    var _restartButton = new Snake.Menue.Buttons("img/spiel_starten_button.png", 0, 0); //Startbutton erstellen
    var _gameOverWindow = new Snake.Menue.StartMenue().menueWindow("GameOver ", 0, 0); //Fenster erstellen
    var _level =1;
    var _highScore = new Snake.Menue.Buttons("img/highscore_button.png", 0, 100); //zurueck Button erstellen

    //Fenster, Buttons und Eventlistener fuer das Instructionfenster
    this.addGameOverView = function () {

        stage.addChild(_gameOverWindow,_restartButton, _highScore);
        stage.update();

        //Button Listeners
        _restartButton.addEventListener("click", function (event) {   //startet Spiel
            //console.log("restart");
            stage.removeAllChildren();   //erst alle Elemente von Stage entfernen
            startGame(_level); //Spielfeld wird gezeichntet


        })//End Button Listeners

    }//end addGameOverView
}//end GameOver
var _level = 2;
//Screen für das nächste Level
Snake.Menue.NextLevel = function () {
    var _nextLevelButton = new Snake.Menue.Buttons("img/spiel_starten_button.png", 0, 0); //Startbutton erstellen
    var _nextLevelWindow = new Snake.Menue.StartMenue().menueWindow("Level Succeeded!", 0, 0); //Fenster erstellen
    //var _highScore = new Snake.Menue.Buttons("img/highscore_button.png",0, 100); //zurueck Button erstellen
    
    
    //Fenster, Buttons und Eventlistener fuer das Instructionfenster
    this.addNextLevelView = function () {

        stage.addChild(_nextLevelWindow,_nextLevelButton);
        stage.update();

        //Button Listeners

        _nextLevelButton.addEventListener("click", function (event) {   //startet Spiel
            //console.log("restart");
            stage.removeAllChildren();   //erst alle Elemente von Stage entfernen
            startGame(_level); //Spielfeld wird 
            console.log("level"+_level);
            _level++;
        })//End Button Listeners

    }//end NextLevelView
}//end NextLevel