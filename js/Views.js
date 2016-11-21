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
        var _snakeHeadFound = false;     //Variable zum pruefen ob die Schlange bereits bewegt wurde
        var _cntX = 0;
        var _cntY = 0;
        this.drawSnake = function (_direction, grid) {
                stage.addChild(dummy);
                console.log(_direction);
                /*if(_direction == "right"){
                    _cntX +=5;
                }
                else if(_direction == "left"){
                    _cntX -=5;
                }
                else if(_direction == "up"){
                    _cntY-=5;
                }
                else if(_direction == "down"){
                    _cntY+=5;
                }

            // durchläuft das Array und zeichnet beim Unique Value '2' den Schlangenkopf
            for(var i = 0; i< grid.length; i++){
                for(var j = 0; j< grid[i].length; j++){
                    if(grid[i][j] == SNAKE_HEAD){
                        dummy.x = i*CELL +_cntX;
                        dummy.y = j*CELL +_cntY;
                    }*/
                    //if(grid[i][j] == SNAKE_HEAD ){
                        stage.addChild(dummy);
                        console.log(_direction);
                        if(_direction == "right"){
                                dummy.x = dummy.x + 1;
                                //stage.addChild(dummy);
                                stage.update();

                        }
                        else if(_direction == "left"){
                                dummy.x = dummy.x - 1;
                                //stage.addChild(dummy);
                                stage.update();
                        }
                        else if(_direction == "up"){
                                dummy.y = dummy.y - 1;
                                //stage.addChild(dummy);
                                stage.update();
                        }
                        else if(_direction == "down"){
                                dummy.y = dummy.y +1;
                                //stage.addChild(dummy);
                                stage.update();
                        }
                        
                    console.log("x: "+dummy.x);
                    console.log("y: "+dummy.y);
                    /*if(grid[i][j] == WALL){
                        var wall = new createjs.Shape();
                        wall.graphics.beginFill("red").drawRect(i*CELL, j*CELL, CELL, CELL);
                        stage.addChild(wall);
                    }*/


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