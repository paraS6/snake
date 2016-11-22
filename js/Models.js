// MVC-Klasse Model
Snake.Models = {};

// setzt die Parameter der drei Level
Snake.Models.PlayingField = function (level, levelSpeed) {
    var _level = level;
    var _levelSpeed = levelSpeed;
    // Getter/Setter, um Koordinaten upzudaten

    this.getLevel = function () { return _level;};
    this.setLevel = function (newLevel) { return _level = newLevel; };
    this.getLevelSpeed = function () {return _levelSpeed;};
    this.setLevelSpeed = function (newLevelSpeed) {return _levelSpeed = newLevelSpeed; };
    };//end PlayingField

    //Logik der Schlange
    
    Snake.Models.PrisonSnake = function () {
        // durchläuft das Grid und setzt alle Felder auf EMPTY
        this.startCoords = function (grid) {
            
            //TODO: for schleife checken (x und y vertauscht)    
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j< grid[i].length; j++){
                grid[i][j]= EMPTY;
            }
         }

            //TODO: Konstanten benutzen!!!
            /*/ setzt Rand
            console.log("grid.length"+grid.length);
            console.log("W/cell"+WIDTH/CELL);
            console.log("h/cell"+HEIGHT/CELL);
            console.log("w"+WIDTH);
            console.log("h"+HEIGHT);*/
            for(var i = 0; i< grid.length; i++){
                grid[i][0] = WALL;
                grid[i][(gridHeigth) -1] = WALL;
            }
            //setzt Rand
            for(var i = 0; i< gridHeigth; i++){
                grid[0][i] = WALL;
                grid[(gridWidth)-1][i] = WALL;
            }
        // Setzt den Schlangenkopf fix auf Zelle 5/5
        grid[5][5]= SNAKE_HEAD;
         }//end startCoords
        //staendige Fortbewegung der Schlange
        this.move = function (newDirection, grid) {
            
            //Richtungen
            if(direction != "down" && newDirection == "up"){
                direction = "up";
            }
            else if(direction != "up" && newDirection == "down"){
                direction = "down";
            }
            else if(direction != "right" && newDirection == "left"){
                direction = "left";
            }
            else if(direction != "left" && newDirection == "right"){
                direction = "right";
            }

            //Bewegung
            var snakeHeadFound = false;     //Variable zum pruefen ob die Schlange bereits bewegt wurde

            for(var i = 0; i < grid.length; i++){
                for(var j = 0; j < grid[i].length; j++){
                    if(grid[i][j] == SNAKE_HEAD && !snakeHeadFound){     //Wenn der Schlangenkopf zum 1.Mal gefunden wurde

                        if(direction == "right"){
                            this.collision(grid[i+1][j]);
                            grid[i+1][j] = SNAKE_HEAD;          //Neuen Kopf setzen
                            grid[i][j] = EMPTY;                 //Alten Kopf loeschen
                            snakeHeadFound = true;              //Schlangenkopf wurde bewegt
                        }
                        else if(direction == "left"){
                            this.collision(grid[i-1][j]);
                            grid[i-1][j] = SNAKE_HEAD;
                            grid[i][j] = EMPTY;
                            snakeHeadFound = true;
                        }
                        else if(direction == "up"){
                            this.collision(grid[i][j-1]);
                            grid[i][j-1] = SNAKE_HEAD;
                            grid[i][j] = EMPTY;
                            snakeHeadFound = true;
                        }
                        else if(direction == "down"){
                            this.collision(grid[i][j+1]);
                            grid[i][j+1] = SNAKE_HEAD;
                            grid[i][j] = EMPTY;
                            snakeHeadFound = true;
                        }

                    }//Ende IF
                }
            }//Ende der Bewegung

        }//Ende Move Funktion
        //GameOverScreen
        this.collision = function (grid) {
            var prisonSnake = new Snake.Models.PrisonSnake();
            if(grid == WALL){

                stage.removeAllChildren();
                createjs.Ticker.paused = true;
                
            }
        }
    };//end PrisonSnake

Snake.Models.Grid = {
    width: null,
    heigth: null,
    _grid: null,
    
    init: function (d, c, r) {
        this.width = c;
        this.heigth = r;

        this._grid = [];

        for(var x = 0; x < c; x++){
            this._grid.push([]);
            for(var y = 0; y < r; y++){
                this._grid[x].push(d);
            }
        }
    },
    set: function (val, x, y) {
        this._grid[x][y] = val;
    },
    
    get: function (x, y) {
        return this._grid[x][y];
    }
}
Snake.Models.PSnake = {
    direction: null,
    last: null,
    _queue: null,
    
    init: function (d, x, y) {
       this.direction = d;
        this._queue = [];
        this.insert(x, y);
    },
    insert: function (x, y) {
        this._queue.unshift({x:x, y:y});
        this.last = this._queue[0];
    },
    remove: function () {
        return this._queue.pop();
    }
}

function setPrisoner() {
    var empty = [];
    for(var x = 0; x < Snake.Models.Grid.width; x++){
        for(var y = 0; y < Snake.Models.Grid.heigth; y++){
            if(Snake.Models.Grid.get(x, y) == EMPTY){
                empty.push({x:x, y:y});
            }
        }

    }
    var randpos = empty[Math.floor(Math.random()*empty.length)];
    Snake.Models.Grid.set(PRISONER, randpos.x, randpos.y);
}