// MVC-Klasse Controls
Snake.Controlls = {};

        // verarbeitet die Interaktionen des Nutzers
        Snake.Controlls.GameController=function(field, prisonSnakeView, scoreView, grid, prisonSnake, collectibles, score) {
            var _field = field;
            var _prisonSnakeView = prisonSnakeView;
            var _scoreView = scoreView;
            var _grid = grid;
            var _prisonSnake = prisonSnake;
            var _collectibles = collectibles;
            var _frames = 0;
            var _score = score;


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
                        _score.set(10);
                        console.log(_score.get());
                        // ...automatisch ein neu einzusammelndes Prisoner-Collectible gesetzt
                        _collectibles.setPrisoner(_grid);
                    }else{
                        // beim Laufen über leere Felder wird das letzte Schlangenelement immer wieder gelöscht und durch die aktualisierte Endposition ersetzt
                        var tail = _prisonSnake.remove();
                        _grid.set(EMPTY, tail.x, tail.y);
                        tail.x = nx;
                        tail.y = ny;
                    }
                    // Schlangenposition wird im Model aktualisiert
                     _grid.set(SNAKE_HEAD, tail.x, tail.y);
                    _prisonSnake.insert(tail.x, tail.y);
            }; //end update
        }//end GameController
    
