Snake.Views = {};


Snake.Views.PlayingFieldView = function () {
        this.drawPlayingField = function () {
            stage.addChild(playingfieldImg);

        };
        this.updatePlayingField = function () {
        };
    };
Snake.Views.PrisonSnakeView = function () {
        var head = new createjs.Shape();

        this.drawSnake = function (grid) {
            for(var i = 0; i< grid.length; i++){
                for(var j = 0; j< grid.length; j++){
                    if(grid[i][j] == 2){
                        //draw head
                        //head.graphics.beginFill("green").drawRect(i*CELL, j*CELL, CELL, CELL);
                        dummy.x=j*CELL;
                        dummy.y=i*CELL;
                        stage.addChild(dummy);
                    }
                }
            }
        }
    };
