//Sub namespacing
Snake.Menue = {};

//StartMenue, Instructions & Fenster, Buttons
Snake.Menue.StartMenue = function() {

        var _startButton = new Snake.Menue.Buttons("start", "white", 0, 0); //Startbutton erstellen
        var _instButton = new Snake.Menue.Buttons("about", "white", 0, 100); //Instructionbutton erstellen

        //erstellt ein MenueFenster mit Ueberschrift
        this.menueWindow = function (title, x, y) {
            var _window = new createjs.Container(); //Containerelement, das dann Hintergrund und Ueberschrift enthaelt
            var _mainbg = new createjs.Shape(); //Hintergrund vom Fenster
            var _title = new createjs.Text(title, "80px pixel", "white");   //Ueberschrift
            var _x = x; //verschiebt Ueberschrift auf xAchse
            var _y = y; //verschiebt Ueberschrift auf yAchse
            //Text zentrieren
            var b = _title.getBounds();
            _title.x = (stage.canvas.width - b.width)/2 +x;
            _title.y = (stage.canvas.height/4) +y;
            _mainbg.graphics.beginFill("black").drawRect(0,0,stage.canvas.width, stage.canvas.height); //Hintergrund
             _window.addChild(_mainbg, _title);
            return _window;
        }
        //erstellt Startfenster den Spiels
        this.addMenueView = function () {
            var startWindow = this.menueWindow("PrisonSnake", 0, 0); //erstellt neues Menuefenster
            stage.addChild(startWindow, _startButton, _instButton);
            stage.update();

            // Button Listeners
            _startButton.addEventListener("click", function (event) {   //startet Spiel
                addGameView();
                stage.removeAllChildren()
            });
            _instButton.addEventListener("click", function (event) {    //fuehrt zum Instructionfenster
                var _instWindow = new Snake.Menue.Instructions;
                stage.removeAllChildren();
                _instWindow.addInstructionView();

            });
    }
    
}
//Klasse fuegt Instructionfenster hinzu
Snake.Menue.Instructions = function () {
    var _startButton = new Snake.Menue.Buttons("start", "white", 0, 0); //Startbutton erstellen
    var _instWindow = new Snake.Menue.StartMenue().menueWindow("Instructions", 0, 0); //Fenster erstellen
    var _instBack = new Snake.Menue.Buttons("back", "white",0, 100); //zurueck Button erstellen

    //Fenster, Buttons und Eventlistener fuer das Instructionfenster
    this.addInstructionView = function () {
        stage.addChild(_instWindow,_startButton, _instBack);
        stage.update();

        //Button Listeners
        _startButton.addEventListener("click", function (event) {   //startet Spiel
            stage.removeAllChildren()   //erst alle Elemente von Stage entfernen
            addGameView();  //Spielfeld wird gezeichntet

        })
        _instBack.addEventListener("click", function (event) {      //zurueck zum Startmenue
            var gameMenue = new Snake.Menue.StartMenue();
            stage.removeAllChildren() //erst alle Elemente von Stage entfernen
            gameMenue.addMenueView();

        })
    }
}


//Klasse um neue Buttons zur erstellen
Snake.Menue.Buttons = function (label, color, x, y) {
    //Button container
    var _bc = new createjs.Container(); //Containerelemnt, enthalt Hintergrund und Text
    var _label = label;
    var _color = color;
    var _x = x; //verschiebt Button auf xAchse
    var _y = y; //verschiebt Button auf yAchse
    var startB = new createjs.Shape();
    var startTxt = new createjs.Text(label, "40px pixel", "black");
    //Text zentrieren
    startTxt.x = (stage.canvas.width - startTxt.getBounds().width)/2 +x;
    startTxt.y = (stage.canvas.height/2) + y;

    startB.graphics.beginFill(color).drawRoundRect(0,0,startTxt.getBounds().width +30,startTxt.getBounds().height +20,10);
    //Button zentrieren
    startB.x = (stage.canvas.width - (startTxt.getBounds().width +30))/2 +x;
    startB.y = (stage.canvas.height/2)+y;
    _bc.addChild(startB, startTxt);
    return _bc;
}
