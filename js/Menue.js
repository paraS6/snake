//Sub namespacing
Snake.Menue = {};

//[Menue]
Snake.Menue.startMenue = function() {
        var _TitleView = new createjs.Container();
        var _startButton = new Snake.Menue.Buttons("start", "white"); //Startbutton erstellen
        var _mainbg = new createjs.Shape();//Hintergrund vom Startmenue
        var _titleCaption = new createjs.Text("PrisonSnake", "80px pixel", "white");
        this.addMenueView = function () {
            _mainbg.graphics.beginFill("black").drawRect(0,0,stage.canvas.width, stage.canvas.height);
            //Text zentrieren
            var b = _titleCaption.getBounds();
            _titleCaption.x = (stage.canvas.width - b.width)/2;
            _titleCaption.y = (stage.canvas.height/3);
            _TitleView.addChild(_mainbg, _titleCaption);

            stage.addChild(_TitleView, _startButton);
            stage.update();

        // Button Listeners
        _startButton.addEventListener("click", function (event) {
            addGameView();
        })
    }
}



//Funktion um neue Buttons zur erstellen
Snake.Menue.Buttons = function (label, color) {
    //Button container
    var _bc = new createjs.Container();
    var _label = label;
    var _color = color;


    var startTxt = new createjs.Text(label, "40px pixel", "black");
    startTxt.x = (stage.canvas.width - startTxt.getBounds().width)/2;
    startTxt.y = (stage.canvas.height/2);
    var startB = new createjs.Shape();
    startB.graphics.beginFill(color).drawRoundRect(0,0,startTxt.getBounds().width +30,startTxt.getBounds().height +20,10);
    //Button zentrieren
    startB.x = (stage.canvas.width - (startTxt.getBounds().width +30))/2;
    startB.y = (stage.canvas.height/2);
    _bc.addChild(startB, startTxt);
    return _bc;
}
