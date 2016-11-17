// MVC-Klasse Controls
Snake.Controlls = {};

        // verarbeitet die Interaktionen des Nutzers
        Snake.Controlls.GameController=function(field, prisonSnakeView, prisonSnake, grid, scoreView) {
            var _field = field;
            var _prisonSnakeView = prisonSnakeView;
            var _prisonSnake = prisonSnake;
            var _grid = grid;
            var _scoreView = scoreView;
            //var _collectibles = collectibles;
            //var _collectiblesView = collectiblesView;
            
            //Pro Loop wird folgendes ausgefuehrt
            this.gameLoop = function (event) {
                //TODO: onkeydown in eigene Methode auslagern
                document.onkeydown = function (event) {
                    var keyCode = window.event.keyCode;
                        keyCode = event.keyCode;
                    switch(keyCode) {
                        case KEYCODE_LEFT:
                            newDirection = "left";
                            break;
                        case KEYCODE_RIGHT:
                            newDirection = "right";
                            break;
                        case KEYCODE_UP:
                            newDirection = "up";
                            break;
                        case KEYCODE_DOWN:
                            newDirection = "down";
                            break;
                    }
                }

                _field.drawPlayingField();
                _scoreView.drawScore();
                _prisonSnake.move(newDirection,_grid);
                _prisonSnakeView.drawSnake(_grid);
               // _collectiblesView.drawItem(_grid);
                stage.update();
            };

            // übersetzt keyInput in direction                  Kann nicht direkt aus dem Gameloop aufgerufen werden, deshalb die unbenamte Funktion(macht genau das gleiche)
 /*           this.keyInput = function(event){


                switch(event.keyCode) {
                    case KEYCODE_LEFT:
                        direction = "left";
                        break;
                    case KEYCODE_RIGHT:
                        direction = "right";
                        break;
                    case KEYCODE_UP:
                        direction = "up";
                        break;
                    case KEYCODE_DOWN:
                        direction = "down";
                        break;
                }
                console.log(event.keyCode);

            }; */
        }
    
