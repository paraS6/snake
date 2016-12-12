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
            var _collectibles = new Snake.Models.Collectibles();
            var _prisonSnake = new Snake.Models.PrisonSnake();
            var _grid = new Snake.Models.Grid();
            
            var _frames = 0;
            var _counter = 1;
            var keySet = false;
            var minScore = _score.get();
          
            
            //hier werden alle start-Funktionen vorm Aufruf des gameLoops aufgerufen (von startGame hierhin ausgelagert)
            this.init = function () {
                var startPos = {x:Math.floor(GRIDWIDTH/2), y:(GRIDHEIGHT/2) -1};
                _grid.init(EMPTY, GRIDWIDTH, GRIDHEIGHT);
                _prisonSnake.init("right", startPos.x, startPos.y);
                _grid.set(SNAKE_HEAD, startPos.x, startPos.y);
                _collectibles.setPrisoner(_grid);
                _collectibles.setCollectibles(_grid);
                // Die Funktion handleTick wird 30 mal in der Sekunde aufgerufen
                createjs.Ticker.setFPS(5);
                createjs.Ticker.addEventListener("tick", this.handleTick);
                createjs.Ticker.paused = false;
            }//end init

            var that = this;    //Hilfsvariable, um das richtige "this" zu referenzieren

            //Ueberpruefen des Tickers
            this.handleTick = function () {
                // solange Ticker nicht pausiert wird, wird der gameLoop fortgesetzt
                if(createjs.Ticker.paused == false){
                    that.gameLoop();
                }
                // sobald pausiert wird (Schlange ist tot), wird Ticker entfernt und GameOver Screen eingeblendet
                else{
                    console.log("tot"+this+that);
                    createjs.Ticker.removeEventListener("tick", that.handleTick);
                    gameOver.addGameOverView();
                }
            }//end handleTick

            //Pro Loop wird folgendes ausgefuehrt
            this.gameLoop = function () {
                // nimmt Tastatureingabe auf
                document.onkeydown = keyInput;
                // updatet das Spielfeld, setzt Laufrichtung der Schlange neu und überprüft, ob GameOver eingetreten ist
                update();
                // führt alle View-Funktionen aus, welche die Model-Funktionen grafisch abbilden
                _field.drawPlayingField();
                _scoreView.drawScore(_score.get());
                _prisonSnakeView.drawSnake(_grid);
                stage.update();

            }; //end gameLoop
           
            // übersetzt keyInput in newDirection
            function keyInput(event){
                switch(event.keyCode) {
                    // setzt alle Richtungswechsel um, mit Ausnahme genau entgesetzter Steuerungsbefehle
                    case KEYCODE_LEFT:
                        if(_prisonSnake.direction != "right")
                            _prisonSnake.direction = "left";
                        break;
                    case KEYCODE_RIGHT:
                        if(_prisonSnake.direction != "left")
                            _prisonSnake.direction = "right";
                        break;
                    case KEYCODE_UP:
                        if(_prisonSnake.direction != "down")
                            _prisonSnake.direction = "up";
                        break;
                    case KEYCODE_DOWN:
                        if(_prisonSnake.direction != "up")
                            _prisonSnake.direction = "down";
                        break;
                }

            }; //end keyInput

        
            
            function update(event){
           
                // speichert X-/Y-Koordinaten des letzten Schlangenelements zwischen
                var nx = _prisonSnake.last.x;
                var ny = _prisonSnake.last.y;
                // zieht das Schlangenende jeweils eins hinter sich her
                switch(_prisonSnake.direction) {
                    case "left":
                        nx--;
                        break;
                    case "right":
                        nx++;
                        break;
                    case "up":
                        ny--;
                        break;
                    case "down":
                        ny++;
                        break;
                }
                    // Fall: Schlange stößt gegen Spielfeldrand --> GameOver
                    if(nx < 0 || nx > _grid.width -1 || ny < 0 || ny > _grid.heigth -1 || _grid.get(nx, ny) == SNAKE_HEAD){
                        // Canvas Stage wird geleert
                        stage.removeAllChildren();
                        // Ticker wird pausiert --> damit wird Ticker-EventListener gelöscht in main()
                        return createjs.Ticker.paused = true;
                    }
                
                
                    
                    
                    // Falls Schlange auf ein Prisoner-Collectible stößt....
                    if(_grid.get(nx, ny) == PRISONER){
                        // ...wird der Schwanz verlängert und...
                        var tail = {x:nx, y:ny};
                        // ...der Score erhöht und...
                        //_score.set(10);
                        // ...der Counter erhöht, der das Erscheinen von Items triggert und...
                        _counter++;
                        console.log(_score.get());
                        // ...automatisch ein neu einzusammelndes Prisoner-Collectible gesetzt
                        _collectibles.setPrisoner(_grid);

                        //gibt den Counter an die Collectibles weiter
                        _collectibles.setCounter(_counter);

                    }

                    else{
                        // beim Laufen über leere Felder wird das letzte Schlangenelement immer wieder gelöscht und durch die aktualisierte Endposition ersetzt
                        var tail = _prisonSnake.remove();
                        _grid.set(EMPTY, tail.x, tail.y);
                        tail.x = nx;
                        tail.y = ny;
                    }

                    //setzt ein zufälliges Item
                    _collectibles.setRandomItem( _grid);
                
                    //setzt den Score individuell für jedes Element
                    _score.setScore(_grid, nx , ny);
                    
                    var scoreKey = _score.get();
                
                   _collectibles.keySetter(scoreKey, _grid);
            

                    // Schlangenposition wird im Model aktualisiert
                     _grid.set(SNAKE_HEAD, tail.x, tail.y);
                    _prisonSnake.insert(tail.x, tail.y);
            }; //end update
            
            
        }//end GameController
    
