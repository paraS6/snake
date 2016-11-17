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
    };

    //Logik der Schlange
    Snake.Models.PrisonSnake = function () {
        // durchläuft das Grid und setzt alle Felder auf EMPTY
        //TODO: for schleife checken (x und y vertauscht)
        this.startCoords = function (grid) {
        for(var i = 0; i< grid.length; i++){
            for(var j = 0; j< grid.length; j++){
                grid[i][j]= EMPTY;
            }
         }
            //TODO: Konstanten benutzen!!!
           //setzt Rand
            for(var i = 0; i< grid.length; i++){
                grid[i][0] = 3;
                grid[i][13] = 3;
            }
            //setzt Rand
            for(var i = 0; i< 10; i++){
                grid[0][i] = 3;
                grid[9][i] = 3;
            }
        // Setzt den Schlangenkopf fix auf Zelle 5/5
        grid[5][5]= SNAKE_HEAD;
         }
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
                for(var j = 0; j < grid.length; j++){
                    if(grid[i][j] == 2 && !snakeHeadFound){     //Wenn der Schlangenkopf zum 1.Mal gefunden wurde

                        if(direction == "right"){
                            this.collision(grid[i][j+1]);
                            grid[i][j+1] = SNAKE_HEAD;          //Neuen Kopf setzen
                            grid[i][j] = EMPTY;                 //Alten Kopf loeschen
                            snakeHeadFound = true;              //Schlangenkopf wurde bewegt
                        }
                        else if(direction == "left"){
                            this.collision(grid[i][j-1]);
                            grid[i][j-1] = SNAKE_HEAD;
                            grid[i][j] = EMPTY;
                            snakeHeadFound = true;
                        }
                        else if(direction == "up"){
                            this.collision(grid[i-1][j]);
                            grid[i-1][j] = SNAKE_HEAD;
                            grid[i][j] = EMPTY;
                            snakeHeadFound = true;
                        }
                        else if(direction == "down"){
                            this.collision(grid[i+1][j]);
                            grid[i+1][j] = SNAKE_HEAD;
                            grid[i][j] = EMPTY;
                            snakeHeadFound = true;
                        }

                    }//Ende IF
                }
            }//Ende der Bewegung

        }//Ende Move Funktion
        //GameOverScreen
        this.collision = function (grid) {
            var gameOver = new Snake.Menue.GameOver();
            var prisonSnake = new Snake.Models.PrisonSnake();
            if(grid == 3){

                stage.removeAllChildren();
                gameOver.addGameOverView();
                prisonSnake.startCoords(grid);
                Ticker.off;
            }

        }
    };

    //Model der Klasse Collectibles
    Snake.Models.Collectibles = function () {

        //Variablen
        var _id, _type, _disappear, _collision;

        //setzt die ID auf die aktuelle ID
        this.setCollectiblesId = function(id){
            _id = id;
        }

        //gibt die aktuelle ID zurück
        this.getCollectiblesId = function () {
            return _id;
        }

        //gibt die aktuelle Collision zurück
        this.getCollectiblesCollision= function () {
            return _collision;
        }

        //setzt die Variable disappear
        this.setCollectiblesDisappear = function (disappear) {
            _disappear = disappear;
        }

        //setzt Collectibles auf eine zufällige Position
        this.randomPosition = function () {
            var randX = Math.floor(Math.random()*13);
            var randY = Math.floor(Math.random()*9);
            
            if(grid[randX][randY] == ITEM){

                grid[randX][randY];
            }
        }

    }; //Ende Snake.Models.Collectibles