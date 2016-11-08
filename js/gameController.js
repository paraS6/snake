//NameSpacing Snake (= Package)
Snake.Controlls = {};

    // MVC-Klasse Controls
        // verarbeitet die Interaktionen des Nutzers
        Snake.Controlls.GameController=function() {
            this.gameLoop = function () {
                stage.update();
            };

            // übersetzt keyInput in direction
            this.keyInput = function(event){
                // in Bearbeitung...
                var prisonSnake = new Snake.Models.PrisonSnake();
                var direction = "right";

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
                    return direction;
                }
                
            };
        }
    

/*    // MVC-Klasse Model
    Models : {

        // setzt die Parameter der drei Level
        PlayingField: function (level, levelSpeed) {
            var _level = level;
            var _levelSpeed = levelSpeed;
            this.getLevel = function () { return _level;};
            this.setLevel = function (newLevel) { return _level = newLevel; };
            this.getLevelSpeed = function () {return _levelSpeed;};
            this.setLevelSpeed = function (newLevelSpeed) {return _levelSpeed = newLevelSpeed; };
        },
        //Logik der Schlange
        PrisonSnake: function () {
            // setzt die Koordinaten default auf 0
            var _x = 0;
            var _y = 0;

            // Getter/Setter, um Koordinaten upzudaten
            this.getX = function(){
                return _x;
            };
            this.getY = function(){
                return _y;
            };
            this.setX = function (newX) {
                return _x = newX;
            };
            this.setY = function (newY) {
                return _y = newY;
            };

            // durchläuft das Grid und setzt alle Felder auf EMPTY.
            this.startCoords = function (grid) {
                for(var i = 0; i< grid.length; i++){
                    for(var j = 0; j< grid.length; j++){
                        grid[i][j]= EMPTY;
                    }
                }
                // Setzt den Schlangenkopf fix auf Zelle 5/5
                grid[5][5]= SNAKE_HEAD;
            }
        }
    },

    //MVC-Klasse Views
    Views: {

        // Zeichnet das Spielfeld
        PlayingFieldView: function () {
            this.drawPlayingField = function () {
                // fügt angegegebens Bild zur Stage hinzu
                stage.addChild(playingfieldImg);
                
            };
            //
            this.updatePlayingField = function () {
            };
        },
        // Zeichnet alles Schlangenelemente
        PrisonSnakeView: function () {

            this.drawSnake = function (grid) {
                // durchläuft das Array und zeichnet beim Unique Value '2' den Schlangenkopf
                for(var i = 0; i< grid.length; i++){
                    for(var j = 0; j< grid.length; j++){
                        if(grid[i][j] == 2){
                            dummy.x=j*CELL;
                            dummy.y=i*CELL;
                            stage.addChild(dummy);
                        }
                    }
                }
            }
        }
    }
};*/