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

        this.drawSnake = function () {
            // durchläuft das Array und zeichnet beim Unique Value '2' den Schlangenkopf
            for(var i = 0; i< Snake.Models.Grid.width; i++){
                for(var j = 0; j< Snake.Models.Grid.heigth; j++){
                    switch(Snake.Models.Grid.get(i, j)){
                        case SNAKE_HEAD:
                            /*var sn = new createjs.Shape();
                            sn.graphics.beginFill("green").drawRect(i*CELL, j*CELL, CELL, CELL);
                            stage.addChild(sn);*/
                            var dummy = new createjs.Bitmap("img/chara_dummy1.png");
                            dummy.x=i*CELL;
                            dummy.y=j*CELL;
                            stage.addChild(dummy);
                            break;
                        case PRISONER:
                            var dummy = new createjs.Bitmap("img/chara_dummy1.png");
                            dummy.x=i*CELL;
                            dummy.y=j*CELL;
                            stage.addChild(dummy);
                            /*var wall = new createjs.Shape();
                            wall.graphics.beginFill("red").drawRect(i*CELL, j*CELL, CELL, CELL);
                            stage.addChild(wall);
                            break;*/
                        case EMPTY:
                            break;
                        default:
                            break;
                    }

                    /*if(grid[i][j] == SNAKE_HEAD){
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
                    }*/
                }
            }
        }//end drawSnake
    }; //end PrisonSnakeView
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
    }//end drawScore
}; //end ScoreView