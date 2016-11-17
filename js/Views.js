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
                for(var j = 0; j< grid[i].length; j++){
                    if(grid[i][j] == SNAKE_HEAD){
                        dummy.x=i*CELL;
                        dummy.y=j*CELL;
                        console.log("x: "+i*CELL);
                        console.log("y: "+j*CELL);
                        stage.addChild(dummy);
                    }
                    if(grid[i][j] == WALL){
                        var wall = new createjs.Shape();
                        wall.graphics.beginFill("red").drawRect(i*CELL, j*CELL, CELL, CELL);
                        stage.addChild(wall);
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