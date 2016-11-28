// MVC-Klasse Controls
Snake.Controlls = {};

// verarbeitet die Interaktionen des Nutzers
Snake.Controlls.GameController=function(field, prisonSnakeView, scoreView, grid, prisonSnake, collect) {
    var _field = field;
    var _prisonSnakeView = prisonSnakeView;
    var _scoreView = scoreView;
    var grid = grid;
    var prisonSnake = prisonSnake;
    var _collect = collect;
    var _frames = 0;

    //Pro Loop wird folgendes ausgefuehrt
    this.gameLoop = function () {
        document.onkeydown = keyInput;
        update();
        _field.drawPlayingField();
        _scoreView.drawScore();
        //_prisonSnake.move(newDirection,_grid);
        _prisonSnakeView.drawSnake(grid);
        stage.update();

    }; //end gameLoop

    // übersetzt keyInput in newDirection
    function keyInput(event){
        switch(event.keyCode) {
            case KEYCODE_LEFT:
                if(prisonSnake.direction != "right")
                    prisonSnake.direction = "left";
                break;
            case KEYCODE_RIGHT:
                if(prisonSnake.direction != "left")
                    prisonSnake.direction = "right";
                break;
            case KEYCODE_UP:
                if(prisonSnake.direction != "down")
                    prisonSnake.direction = "up";
                break;
            case KEYCODE_DOWN:
                if(prisonSnake.direction != "up")
                    prisonSnake.direction = "down";
                break;
        }

    }; //end keyInput
    function update(event){
        _frames++;
        var counter = null;
        if(_frames%10 == 0){
            var nx = prisonSnake.last.x;
            var ny = prisonSnake.last.y;
            switch(prisonSnake.direction) {
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

            if(nx < 0 || nx > grid.width -1 || ny < 0 || ny > grid.heigth -1){
                stage.removeAllChildren();
                createjs.Ticker.paused = true;
            }
            
            
            if(grid.get(nx, ny) == PRISONER){
                var tail = {x:nx, y:ny};
               _collect.setPrisoner(grid);

                counter++;
            }
            else{
                var tail = prisonSnake.remove();
                grid.set(EMPTY, tail.x, tail.y);
                tail.x = nx;
                tail.y = ny;
            }
        
            if (grid.get(nx, ny) == ITEM) {
                _collect.setCollectibles(grid);
            }
            
            grid.set(SNAKE_HEAD, tail.x, tail.y);
            prisonSnake.insert(tail.x, tail.y);
        }
    }; //end update
}//end GameController


    
