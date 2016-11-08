Snake.Models = {};

Snake.Models.PlayingField = function (level, levelSpeed) {
    var _level = level;         //Andeuten der einzuhaltenden Privatheit durch Codekonvention: _name
    var _levelSpeed = levelSpeed;
    this.getLevel = function () { return _level;};
    this.setLevel = function (newLevel) { return _level = newLevel; };
    this.getLevelSpeed = function () {return _levelSpeed;};
    this.setLevelSpeed = function (newLevelSpeed) {return _levelSpeed = newLevelSpeed; };
    };
    Snake.Models.PrisonSnake = function () {
        this.startCoords = function (grid) {
        for(var i = 0; i< grid.length; i++){
            for(var j = 0; j< grid.length; j++){
                grid[i][j]= EMPTY;
            }
         }
            //Set Head
        grid[5][5]= SNAKE_HEAD;
         }
    };