//MVC-Klasse Views
Snake.Views = Snake.Views || {};

// Zeichnet alles Schlangenelemente
Snake.Views.PrisonSnakeView = function () {
    //einzelne Grafiken in Variablen speichern
    var prisonerIMG = new createjs.Bitmap("img/prisoner.png");
    var tunaIMG = new createjs.Bitmap("img/items_tuna.png");
    var cigIMG = new createjs.Bitmap("img/item_cigarettes.png");
    var knifeIMG = new createjs.Bitmap("img/item_knife.png");
    var keyIMG = new createjs.Bitmap("img/key.png");
    var openDoor = new createjs.Bitmap("img/opendoor.png");

    //initialisiet die Spritesheets
    this.createSprites = function (url) {
        //Spritesheet data
        var data = {
            images: [url],
            frames: {width: 40, height: 40},
            animations: {
                down: [0, 2],
                left: [9, 11],
                right: [4, 6],
                up: [12, 14],
                down2: [1, 3],
                left2: [8, 10],
                right2: [5, 7],
                up2: [13, 15]
            }
        };
        var ss = new createjs.SpriteSheet(data);
        return ss;//Spritesheet zusammen bauen
    };//end createSprites
    
    //Erstellung des Schlangenkopfs
    var dummy = [];
        dummy[0]={s: new createjs.Sprite(this.createSprites("img/sprites.png"), "right"), d: "right"};

    //hinzufügen der Sprites für jedes Element der Schlange
    this.addPrisonerSprite = function(prisonSnake, counter, dummyImg){
        var _prisonSnake = prisonSnake;
        var _counter = counter;
        var _dummyImg = dummyImg;
        dummy[_counter] = {s: new createjs.Sprite(this.createSprites(_dummyImg), _prisonSnake._queue[_counter].d), d:_prisonSnake._queue[_counter].d};
    };//end addPrisonerSprite
    
        //zeichnet die Schlange auf das Grid    
        this.drawSnake = function (grid, prisonSnake) {

            var _grid = grid;
            var _prisonSnake = prisonSnake;
            // durchläuft das Array und gleicht ab, welches Feld wie besetzt ist
            for(var i = 0; i< _grid.width; i++){
                for(var j = 0; j< _grid.heigth; j++){
                    switch(_grid.get(i, j)){
                        // lädt die Bitmap des Schlangenkopfs und setzt es auf das Spielfeld
                        case SNAKE_HEAD:
                            // Es muss überprüft werden, welches Element der Schlange grade auf dem aktuellen Grid liegt
                            for(var dummyCounter = 0; dummyCounter < _prisonSnake._queue.length; dummyCounter++){
                                //Dazu werden die X/Y-Koordinaten des Grids mit denen der Queue abgeglichen
                                if(i == _prisonSnake._queue[dummyCounter].x && j == _prisonSnake._queue[dummyCounter].y){
                                    //Wenn das richtige Queue Element gefunden ist, wird zu diesem Count ein Sprite in Blickrichtung erstellt
                                    if(_prisonSnake._queue[dummyCounter].d != dummy[dummyCounter].d){
                                        var spriteVariation = "2";
                                        if(dummyCounter%2===0){  //jeder zweite Prisoner in der Schlange benutzt versetzte Sprites, dadurch entsteht Bewegung
                                            spriteVariation = "";
                                        }
                                        dummy[dummyCounter].s.gotoAndPlay(_prisonSnake._queue[dummyCounter].d+spriteVariation);
                                        dummy[dummyCounter].d = _prisonSnake._queue[dummyCounter].d+spriteVariation;
                                    }
                                    dummy[dummyCounter].s.x=i*CELL;
                                    dummy[dummyCounter].s.y=j*CELL;
                                    stage.addChild(dummy[dummyCounter].s);
                                }
                            }
                            break;
                        // lädt die Bitmap des Schlangenelements und setzt es auf das Spielfeld
                        case PRISONER:
                            var dummy2 = new createjs.Bitmap();
                            dummy2 = prisonerIMG.clone();
                            dummy2.x=i*CELL;
                            dummy2.y=j*CELL;
                            stage.addChild(dummy2);
                            break;
                        // lädt die Bitmaps der Items

                        case KEY:
                            var key = new createjs.Bitmap();
                            key = keyIMG.clone();
                            key.x = i*CELL;
                            key.y = j*CELL;
                            stage.addChild(key);  
                            break;
                        case GATE:
                            var gate = new createjs.Bitmap();
                            gate = openDoor.clone();
                            gate.x = i*CELL;
                            gate.y = j*CELL;
                            stage.addChild(gate);
                            break;
                        case EMPTY:
                            break;
                        default:
                            break;
                    }
                        switch (_grid.get(i, j).ITEM){
                            case TUNA:
                                var item = new createjs.Bitmap();
                                item = tunaIMG.clone();
                                item.x = i*CELL;
                                item.y = j*CELL;
                                stage.addChild(item);
                                break;
                            case CIGARETTES:
                                var item = new createjs.Bitmap();
                                item = cigIMG.clone();
                                item.x = i*CELL;
                                item.y = j*CELL;
                                stage.addChild(item);
                                break;
                            case KNIFE:
                                var item = new createjs.Bitmap;
                                item = knifeIMG.clone();
                                item.x = i*CELL;
                                item.y = j*CELL;
                                stage.addChild(item);
                                break;
                        }

                }
            }
        };//end drawSnake
}; //end PrisonSnakeView
Snake.Views.ScoreView = function () {
    var _scoreContainer = new createjs.Container();
    var _scoreTitle = new createjs.Text("Score", "50px pixel", "white"); //Ueberschrift
    var _scoreTXT;    // Scoreanzeige



    var _scoreTime;
    var _b = _scoreTitle.getBounds(); // gibt Breite des Textfeldes der Überschrift zurück
    var _b2; // gibt Breite des Textfeldes des Scores zurück
    var s = 0;
    var m = 0;


    this.drawScore  = function (score, playingFieldImg) {
        var _score = score.get();
        var _time = score.getTime(new Date());
        var _playingFieldImg = playingFieldImg;

        _scoreTime = new createjs.Text(_time, "40px pixel", "white");
        _scoreTime.x = WIDTH + ((stage.canvas.width-WIDTH)-_scoreTime.getBounds().width)/2 ;
        _scoreTime.y = stage.canvas.height * 0.75;
        //Text zentrieren
        _scoreTitle.x = WIDTH + ((stage.canvas.width-WIDTH)-_b.width)/2 ;
        _scoreTitle.y = stage.canvas.height/4;
        // Dynamisch den Score angeben
        _scoreTXT = new createjs.Text(_score, "40px pixel","white");
        //Score zentrieren
        _b2 = _scoreTXT.getBounds();
        // Score platzieren
        _scoreTXT.x = WIDTH + ((stage.canvas.width-WIDTH)-_b2.width)/2 ;
        _scoreTXT.y = stage.canvas.height/4+60;
        // Background, Titel und Score zum Canvas hinzufügen

        _scoreContainer.addChild(_playingFieldImg, _scoreTitle, _scoreTXT, _scoreTime);
        stage.addChild(_scoreContainer);
    };//end drawScore
 
}; //end ScoreView