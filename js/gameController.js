// MVC-Klasse Controls
Snake.Controlls = {};

        // verarbeitet die Interaktionen des Nutzers
        Snake.Controlls.GameController=function(field, prisonSnakeView, scoreView) {
            var _field = field;
            var _prisonSnakeView = prisonSnakeView;
            var _scoreView = scoreView;
            var _frames = 0;
            
            //Pro Loop wird folgendes ausgefuehrt
            this.gameLoop = function () {
                // nimmt Tastatureingabe auf
                document.onkeydown = keyInput;
                // updatet das Spielfeld, setzt Laufrichtung der Schlange neu und überprüft, ob GameOver eingetreten ist
                update();
                // führt alle View-Funktionen aus, welche die Model-Funktionen grafisch abbilden
                _field.drawPlayingField();
                _scoreView.drawScore();
                _prisonSnakeView.drawSnake();
                stage.update();

            }; //end gameLoop
           
            // übersetzt keyInput in newDirection
            function keyInput(event){
                switch(event.keyCode) {
                    // setzt alle Richtungswechsel um, mit Ausnahme genau entgesetzter Steuerungsbefehle
                    case KEYCODE_LEFT:
                        if(Snake.Models.PSnake.direction != "right")
                        Snake.Models.PSnake.direction = "left";
                        break;
                    case KEYCODE_RIGHT:
                        if(Snake.Models.PSnake.direction != "left")
                        Snake.Models.PSnake.direction = "right";
                        break;
                    case KEYCODE_UP:
                        if(Snake.Models.PSnake.direction != "down")
                        Snake.Models.PSnake.direction = "up";
                        break;
                    case KEYCODE_DOWN:
                        if(Snake.Models.PSnake.direction != "up")
                        Snake.Models.PSnake.direction = "down";
                        break;
                }

            }; //end keyInput
            function update(event){
           
                // speichert X-/Y-Koordinaten des letzten Schlangenelements zwischen
                var nx = Snake.Models.PSnake.last.x;
                var ny = Snake.Models.PSnake.last.y;
                // zieht das Schlangenende jeweils eins hinter sich her
                switch(Snake.Models.PSnake.direction) {
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
                    if(nx < 0 || nx > Snake.Models.Grid.width -1 || ny < 0 || ny > Snake.Models.Grid.heigth -1 || Snake.Models.Grid.get(nx, ny) == SNAKE_HEAD){
                        // Canvas Stage wird geleert
                        stage.removeAllChildren();
                        // Ticker wird pausiert --> damit wird Ticker-EventListener gelöscht in main()
                        createjs.Ticker.paused = true;
                    }
                    
                    // Falls Schlange auf ein Prisoner-Collectible stößt....
                    if(Snake.Models.Grid.get(nx, ny) == PRISONER){
                        // ...wird der Schwanz verlängert und...
                        var tail = {x:nx, y:ny};
                        // ...automatisch ein neu einzusammelndes Prisoner-Collectible gesetzt
                        setPrisoner();
                    }else{
                        // beim Laufen über leere Felder wird das letzte Schlangenelement immer wieder gelöscht und durch die aktualisierte Endposition ersetzt
                        var tail = Snake.Models.PSnake.remove();
                        Snake.Models.Grid.set(EMPTY, tail.x, tail.y);
                        tail.x = nx;
                        tail.y = ny;
                    }
                    // Schlangenposition wird im Model aktualisiert
                    Snake.Models.Grid.set(SNAKE_HEAD, tail.x, tail.y);
                    Snake.Models.PSnake.insert(tail.x, tail.y);
            }; //end update
        }//end GameController
    
