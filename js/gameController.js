// MVC-Klasse Controls
Snake.Controlls = {};

        // verarbeitet die Interaktionen des Nutzers
        Snake.Controlls.GameController=function(field, prisonSnakeView, prisonSnake, grid, scoreView, gameController) {
            var _field = field;
            var _prisonSnakeView = prisonSnakeView;
            var _prisonSnake = prisonSnake;
            var _grid = grid;
            var _scoreView = scoreView;
            var _gameOver = new Snake.Menue.GameOver();
            var _direction;
            //Pro Loop wird folgendes ausgefuehrt
            this.gameLoop = function () {

                if(createjs.Ticker.paused == false){
                    document.onkeydown = keyInput;
                    _direction = _prisonSnake.nextDirection(newDirection, dummy.x, dummy.y);
                    _field.drawPlayingField();
                    _scoreView.drawScore();
                    _prisonSnake.move(_direction, _grid);
                    _prisonSnakeView.drawSnake(_direction,_grid);


                    stage.update();

                }else{
                    createjs.Ticker.paused = true;
                    _gameOver.addGameOverView();
                    console.log("tick");
                }
            }; //end gameLoop
           
            // übersetzt keyInput in newDirection
            function keyInput(event){

                switch(event.keyCode) {
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

            }; //end keyInput
        }//end GameController
    
