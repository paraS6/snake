//Sub namespacing
Snake.Menue = {};

//[Menue]
Snake.Menue.StartMenue = function() {

        var _startButton = new Snake.Menue.Buttons("start", "white", 0, 0); //Startbutton erstellen
        var _instButton = new Snake.Menue.Buttons("about", "white", 0, 100); //Instructionbutton erstellen

        //erstellt ein MenueFenster mit Ueberschrift
        this.menueWindow = function (title, x, y) {
            var _window = new createjs.Container();
            var _mainbg = new createjs.Shape();//Hintergrund vom Startmenue
            var _title = new createjs.Text(title, "80px pixel", "white");
            var _x = x;
            var _y = y;
            //Text zentrieren
            var b = _title.getBounds();
            _title.x = (stage.canvas.width - b.width)/2 +x;
            _title.y = (stage.canvas.height/3) +y;

            _mainbg.graphics.beginFill("black").drawRect(0,0,stage.canvas.width, stage.canvas.height);
             _window.addChild(_mainbg, _title);
            return _window;
        }
        this.addMenueView = function () {
            //erstellt neues Menuefenster
            var startWindow = this.menueWindow("PrisonSnake", 0, 0);
            stage.addChild(startWindow, _startButton, _instButton);
            stage.update();
        // Button Listeners
        _startButton.addEventListener("click", function (event) {
            addGameView();
            stage.removeAllChildren()
        })
            _instButton.addEventListener("click", function (event) {
                var _instWindow = new Snake.Menue.Instructions;
                stage.removeAllChildren();
                _instWindow.addInstructionView();

            })
    }
    
}
Snake.Menue.Instructions = function () {
    var _startButton = new Snake.Menue.Buttons("start", "white", 0, 0); //Startbutton erstellen
    var _instWindow = new Snake.Menue.StartMenue().menueWindow("Instructions", 0, 0);
    var _instBack = new Snake.Menue.Buttons("back", "white",0, 100); //zurueck Button erstellen
    this.addInstructionView = function () {
        stage.addChild(_instWindow,_startButton, _instBack);
        stage.update();

        //Button Listeners
        _startButton.addEventListener("click", function (event) {
            stage.removeAllChildren()
            addGameView();

        })
        _instBack.addEventListener("click", function (event) {
            var gameMenue = new Snake.Menue.StartMenue();
            stage.removeAllChildren()
            gameMenue.addMenueView();

        })
    }
}


//Funktion um neue Buttons zur erstellen
Snake.Menue.Buttons = function (label, color, x, y) {
    //Button container
    var _bc = new createjs.Container();
    var _label = label;
    var _color = color;
    var _x = x;
    var _y = y;
    var startTxt = new createjs.Text(label, "40px pixel", "black");
    startTxt.x = (stage.canvas.width - startTxt.getBounds().width)/2 +x;
    startTxt.y = (stage.canvas.height/2) + y;
    var startB = new createjs.Shape();
    startB.graphics.beginFill(color).drawRoundRect(0,0,startTxt.getBounds().width +30,startTxt.getBounds().height +20,10);
    //Button zentrieren
    startB.x = (stage.canvas.width - (startTxt.getBounds().width +30))/2 +x;
    startB.y = (stage.canvas.height/2)+y;
    _bc.addChild(startB, startTxt);
    return _bc;
}
