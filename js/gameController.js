// MVC-Klasse Controls
Snake.Controlls = {};

        // verarbeitet die Interaktionen des Nutzers
        Snake.Controlls.GameController=function() {
            // speichert den jeweiligen .keyCode der Pfeiltasten als Variable ab
            const KEYCODE_LEFT = 37,
                KEYCODE_RIGHT = 39,
                KEYCODE_UP = 38,
                KEYCODE_DOWN = 40;
            
            // erstellt Instanzen folgender Klassen
            var _field = new Snake.Views.PlayingFieldView();
            var _prisonSnakeView = new Snake.Views.PrisonSnakeView();
            var _scoreView = new Snake.Views.ScoreView();
            var _score = new Snake.Models.Score();
            var gameOver = new Snake.Menue.GameOver();
            var nextLevel = new Snake.Menue.NextLevel();
            var _collectibles = new Snake.Models.Collectibles();
            var _prisonSnake = new Snake.Models.PrisonSnake();
            var _grid = new Snake.Models.Grid();
        
            var hitWall = false;
            var levelSuceeded = false;
            var _frames = 0;
            var _counter = 1;
            var keySet = false;
            var minScore = _score.get();

            var prisonCounter = 1;
            var isNext = false;

            //hier werden alle start-Funktionen vorm Aufruf des gameLoops aufgerufen (von startGame hierhin ausgelagert)
            this.init = function (speed) {
                var startPos = {x:Math.floor(GRIDWIDTH/2), y:(GRIDHEIGHT/2) -1};
                _grid.init(WALL, EMPTY, GRIDWIDTH, GRIDHEIGHT);
                _prisonSnake.init("right", startPos.x, startPos.y);
                _grid.set(SNAKE_HEAD, startPos.x, startPos.y);
                _collectibles.setPrisoner(_grid);
                _collectibles.setCollectibles(_grid);
                // Die Funktion handleTick wird 30 mal in der Sekunde aufgerufen
                  createjs.Ticker.setFPS(speed);
                createjs.Ticker.addEventListener("tick", this.handleTick);
                createjs.Ticker.RAF = true;
                createjs.Ticker.paused = false;
            }//end init
            
            
            
            this.initTicker = function (_fps) {
                // Die Funktion handleTick wird 30 mal in der Sekunde aufgerufen
                createjs.Ticker.setFPS(_fps);
                createjs.Ticker.addEventListener("tick", this.handleTick);
                createjs.Ticker.paused = false;
            }

            this.initLevel = function(){
                var lF = this.levelFinished(_grid,_prisonSnake);

                lF = false;
                console.log(lF);
                
                createjs.Ticker.setFPS(5);
                createjs.Ticker.addEventListener("tick", this.handleTick);
                createjs.Ticker.paused = false;

                if(lF = true){
                    createjs.Ticker.setFPS(10);
                    createjs.Ticker.addEventListener("tick", this.handleTick);
                    createjs.Ticker.paused = false;
                    console.log(lF);
                }
              
            }

            this.levelFinished = function (_grid,_prisonSnake) {
                var lF = false;
                
                var score = _score.get();
                
                if (_prisonSnake.last == GATE && score > 500){
                    lF = true;
                }
                return lF;
            }

            
            var that = this;    //Hilfsvariable, um das richtige "this" zu referenzieren

            //Ueberpruefen des Tickers
            this.handleTick = function () {
                // solange Ticker nicht pausiert wird, wird der gameLoop fortgesetzt
                if(createjs.Ticker.paused == false){
                    that.gameLoop();
                }
                // sobald pausiert wird (Schlange ist tot), wird Ticker entfernt und GameOver Screen eingeblendet
                else{
                    //Anzeige des GameOverScreens falls Wand getroffen wird
                    if(hitWall) {
                        console.log("tot" + this + that);
                        createjs.Ticker.removeEventListener("tick", that.handleTick);
                        gameOver.addGameOverView();
                    }
                    //Level geschafft dann wird Start-Screen für das nächste Level angezeigt    
                    else if(levelSuceeded){
                        console.log("Geschafft!" + this + that);
                        createjs.Ticker.removeEventListener("tick", that.handleTick);
                        nextLevel.addNextLevelView();
                    }
                }
            }//end handleTick

            //Pro Loop wird folgendes ausgefuehrt
            this.gameLoop = function () {
                // nimmt Tastatureingabe auf
                document.onkeydown = keyInput;
                // updatet das Spielfeld, setzt Laufrichtung der Schlange neu und überprüft, ob GameOver eingetreten ist
                //if(createjs.Ticker.getTicks(true)%2 == 0)
                update();
                // führt alle View-Funktionen aus, welche die Model-Funktionen grafisch abbilden
                _field.drawPlayingField();
                _scoreView.drawScore(_score.get());
                _prisonSnakeView.drawSnake(_grid, _prisonSnake);
                stage.update();

            }; //end gameLoop
           
            // übersetzt keyInput in newDirection
            function keyInput(event){
                switch(event.keyCode) {
                    // setzt alle Richtungswechsel um, mit Ausnahme genau entgesetzter Steuerungsbefehle
                    case KEYCODE_LEFT:
                        if(_prisonSnake.direction != "right" && isNext)
                            _prisonSnake.direction = "left";
                        isNext = false;
                        break;
                    case KEYCODE_RIGHT:
                        if(_prisonSnake.direction != "left" && isNext)
                            _prisonSnake.direction = "right";
                        isNext = false;
                        break;
                    case KEYCODE_UP:
                        if(_prisonSnake.direction != "down" && isNext)
                            _prisonSnake.direction = "up";
                        isNext = false;
                        break;
                    case KEYCODE_DOWN:
                        if(_prisonSnake.direction != "up" && isNext)
                            _prisonSnake.direction = "down";
                        isNext = false;
                        break;
                }

            }; //end keyInput

        
            
            function update(event){


                // speichert X-/Y-Koordinaten des letzten Schlangenelements zwischen
                var nx = _prisonSnake.last.x;
                var ny = _prisonSnake.last.y;
                //console.log(this._grid.get(nx,ny));

                // zieht das Schlangenende jeweils eins hinter sich her
                switch(_prisonSnake.direction) {
                    case "left":
                        nx--;
                        isNext = true;
                        break;
                    case "right":
                        nx++;
                        isNext = true;
                        break;
                    case "up":
                        ny--;
                        isNext = true;
                        break;
                    case "down":
                        ny++;
                        isNext = true;
                        break;
                }
                    // Fall: Schlange stößt gegen Spielfeldrand oder Schlange selbst--> GameOver
                    if(_grid.get(nx, ny) == WALL || _grid.get(nx, ny) == SNAKE_HEAD){
                        hitWall = true;
                        // Canvas Stage wird geleert
                        stage.removeAllChildren();
                        // Ticker wird pausiert --> damit wird Ticker-EventListener gelöscht in main()
                        return createjs.Ticker.paused = true;
                    }

                    //Fall: Schlange verlässt das Spielfeld durch das Gate
                    if(_grid.get(nx, ny)== GATE){
                        levelSuceeded = true;
                        // Canvas Stage wird geleert
                        stage.removeAllChildren();
                        // Ticker wird pausiert --> damit wird Ticker-EventListener gelöscht in main()
                        return createjs.Ticker.paused = true;
                        console.log("Level-Ticker:"+Ticker.paused);
                    }

                    // trackt, welche Items auf dem Grid liegen und entfernt diese nach vorgegebener Zeit
                    _collectibles.trackItems(_grid);
                

                    // Falls Schlange auf ein Prisoner-Collectible stößt....
                    if(_grid.get(nx, ny) == PRISONER){
                        // ...wird der Schwanz verlängert und...
                        var tail = {x:nx, y:ny, d: _prisonSnake.direction};
                        // ...der Score erhöht und...
                        //_score.set(10);
                        // ...der Counter erhöht, der das Erscheinen von Items triggert und...
                        _counter++;
                        console.log(_score.get());
                        // ...automatisch ein neu einzusammelndes Prisoner-Collectible gesetzt
                        _collectibles.setPrisoner(_grid);

                        //gibt den Counter an die Collectibles weiter
                        _collectibles.setCounter(_counter);

                        _prisonSnake.insert(tail.x, tail.y, tail.d);
                        _prisonSnakeView.addPrisonerSprite(_prisonSnake, prisonCounter);
                        prisonCounter++;
                    }

                    else{
                        // beim Laufen über leere Felder wird das letzte Schlangenelement immer wieder gelöscht und durch die aktualisierte Endposition ersetzt
                        var tail = _prisonSnake.remove();
                        _grid.set(EMPTY, tail.x, tail.y);
                        tail.x = nx;
                        tail.y = ny;
                        tail.d = _prisonSnake.direction;

                        _prisonSnake.insert(tail.x, tail.y, tail.d);
                    }

                    //setzt ein zufälliges Item
                    _collectibles.setRandomItem( _grid);
                
                    //setzt den Score individuell für jedes Element
                    _score.setScore(_grid, nx , ny);
                    
                    
                    var scoreKey = _score.get();
                    // setzt den Schlüssel auf das Grid, sobald der erforderliche scoreKey erreicht wird
                   _collectibles.keySetter(scoreKey, _grid);

                    // Überprüft ob Schlüssel eingesammelt wurde. True --> Tor wird auf das Grid gesetzt
                    if (_score.getKeyStatus()){
                        // setzt Tor auf die feste Stelle
                        _grid.set(GATE,9,0);
                        console.log("Gate open!");
                    }
            

                    // Schlangenposition wird im Model aktualisiert
                     _grid.set(SNAKE_HEAD, tail.x, tail.y);

            }; //end update
            
            
        }//end GameController
    
