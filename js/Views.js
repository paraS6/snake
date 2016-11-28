//MVC-Klasse Views
Snake.Views = {};
var prisonerIMG = new createjs.Bitmap("img/chara_dummy1.png");


// Zeichnet das Spielfeld
Snake.Views.PlayingFieldView = function () {
        this.drawPlayingField = function () {
            // fügt angegegebens Bild zur Stage hinzu
            stage.addChild(playingfieldImg);

        };
        this.updatePlayingField = function () {
        };
}; //end PlayingFieldView

// Zeichnet alles Schlangenelemente
Snake.Views.PrisonSnakeView = function () {
        var _head = new createjs.Shape();
        
    
        this.drawSnake = function (grid) {
            
            var _grid = grid;
            // durchläuft das Array und gleicht ab, welches Feld wie besetzt ist
            for(var i = 0; i< _grid.width; i++){
                for(var j = 0; j< _grid.heigth; j++){
                    switch(_grid.get(i, j)){
                        // lädt die Bitmap des Schlangenkopfs und setzt es auf das Spielfeld
                        case SNAKE_HEAD:
                            var dummy = new createjs.Bitmap;
                            dummy = prisonerIMG.clone(); 
                            dummy.x=i*CELL;
                            dummy.y=j*CELL;
                            stage.addChild(dummy);
                            break;
                        // lädt die Bitmap des Schlangenelements und setzt es auf das Spielfeld
                        case PRISONER:
                            var dummy = new createjs.Bitmap;
                            dummy = prisonerIMG.clone();
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

                }
            }
        }//end drawSnake
}; //end PrisonSnakeView
Snake.Views.ScoreView = function () {
    var _scoreContainer = new createjs.Container();
    var _scoreBg = new createjs.Shape();    //Hintergrund von Score
    var _scoreTitle = new createjs.Text("Score", "50px pixel", "white"); //Ueberschrift
    var _scoreTXT;    // Scoreanzeige
    var _b = _scoreTitle.getBounds(); // gibt Breite des Textfeldes der Überschrift zurück
    var _b2; // gibt Breite des Textfeldes des Scores zurück

    this.drawScore  = function (score) {
        _scoreBg.graphics.beginFill("black").drawRect(WIDTH,0,stage.canvas.width-WIDTH, stage.canvas.height);
        //Text zentrieren
        _scoreTitle.x = WIDTH + ((stage.canvas.width-WIDTH)-_b.width)/2 ;
        _scoreTitle.y = stage.canvas.height/4;
        // Dynamisch den Score angeben
        _scoreTXT = new createjs.Text(score, "40px pixel","white");
        //Score zentrieren
        _b2 = _scoreTXT.getBounds();
        // Score platzieren
        _scoreTXT.x = WIDTH + ((stage.canvas.width-WIDTH)-_b2.width)/2 ;
        _scoreTXT.y = stage.canvas.height/4+60;
        // Background, Titel und Score zum Canvas hinzufügen
        _scoreContainer.addChild(_scoreBg, _scoreTitle, _scoreTXT);
        stage.addChild(_scoreContainer);
    }//end drawScore
}; //end ScoreView