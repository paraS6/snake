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
        document.onkeydown = keyInput;
        update();
        _field.drawPlayingField();
        _scoreView.drawScore();
        //_prisonSnake.move(newDirection,_grid);
        _prisonSnakeView.drawSnake();
        stage.update();

    }; //end gameLoop

    // übersetzt keyInput in newDirection
    function keyInput(event){
        switch(event.keyCode) {
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
        _frames++;
        if(_frames%10 == 0){
            var nx = Snake.Models.PSnake.last.x;
            var ny = Snake.Models.PSnake.last.y;
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

            if(nx < 0 || nx > Snake.Models.Grid.width -1 || ny < 0 || ny > Snake.Models.Grid.heigth -1){
                stage.removeAllChildren();
                createjs.Ticker.paused = true;
            }

            if(Snake.Models.Grid.get(nx, ny) == PRISONER){
                var tail = {x:nx, y:ny};
                setPrisoner();
            }else{
                var tail = Snake.Models.PSnake.remove();
                Snake.Models.Grid.set(EMPTY, tail.x, tail.y);
                tail.x = nx;
                tail.y = ny;
            }
            Snake.Models.Grid.set(SNAKE_HEAD, tail.x, tail.y);
            Snake.Models.PSnake.insert(tail.x, tail.y);
        }
    }; //end update
}//end GameController


    
