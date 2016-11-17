//MVC-Klasse Views
Snake.Views = {};

// Zeichnet das Spielfeld
Snake.Views.PlayingFieldView = function () {
        this.drawPlayingField = function () {
            // fügt angegegebens Bild zur Stage hinzu
            stage.addChild(playingfieldImg);

        };
        this.updatePlayingField = function () {
        };
};

// Zeichnet alles Schlangenelemente
Snake.Views.PrisonSnakeView = function () {
        var _head = new createjs.Shape();

        this.drawSnake = function (grid) {
            // durchläuft das Array und zeichnet beim Unique Value '2' den Schlangenkopf
            for(var i = 0; i< grid.length; i++){
                for(var j = 0; j< grid.length; j++){
                    if(grid[i][j] == 2){
                        dummy.x=j*CELL;
                        dummy.y=i*CELL;
                        stage.addChild(dummy);
                    }
                }
            }
        }
};

Snake.Views.ScoreView = function () {
    var _scoreContainer = new createjs.Container();
    var _scoreBg = new createjs.Shape();    //Hintergrund von Score
    var _scoreTitle = new createjs.Text("Score", "40px pixel", "white"); //Ueberschrift
    var _scoreTXT = new createjs.Text();    //Scoreanzeige
    var _b = _scoreTitle.getBounds();
    this.drawScore  = function () {
        _scoreBg.graphics.beginFill("black").drawRect(WIDTH,0,stage.canvas.width-WIDTH, stage.canvas.height);
        //Text zentrieren
        _scoreTitle.x = WIDTH + ((stage.canvas.width-WIDTH)-_b.width)/2 ;
        _scoreTitle.y = stage.canvas.height/4;
        _scoreContainer.addChild(_scoreBg, _scoreTitle);
        stage.addChild(_scoreContainer);
    }
};

Snake.Views.CollectiblesView = function () {
    var _item = new createjs.Shape();

    //zeichnet Items auf das Spielfeld beim Value 4
    this.drawItem = function (grid) {
        for(var i = 0; i< grid.length; i++){
            for(var j = 0; j< grid.length; j++){
                if(grid[i][j] == 4){
                    dummyItem.x=j*CELL;
                    dummyItem.y=i*CELL;
                    stage.addChild(dummyItem);
                }
            }
        }
    }
};