// erstellt neue Stage innerhalb des Canvas
var stage = new createjs.Stage("myCanvas");



const WIDTH = stage.canvas.width - 300; //Breite vom Spielfeld
const HEIGHT = stage.canvas.height - 100;   // Hoehe vom Spielfeld
const CELL = 50;    //Zellengroesse

// wenn im Grid[][] dieser Wert hinterlegt ist, befindet sich dort...
const EMPTY = 0; // ein leeres Feld
const SNAKE_BODY = 1; // ein Torso-Teil der Schlange
const SNAKE_HEAD = 2; // der Kopf der Schlange

// speichert den jeweiligen .keyCode der Pfeiltasten als Variable ab
const   KEYCODE_LEFT = 37,
        KEYCODE_RIGHT = 39,
        KEYCODE_UP = 38,
        KEYCODE_DOWN = 40;

// lädt den Spielfeldhintergrund ins Canvas
var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");
// lädt die Spielfigur (Schlangenelement) ins Canvas
var dummy = new createjs.Bitmap("img/chara_dummy1.png");

// Main-Methode, welche beim Laden der HTML-Seite getriggert wird
function start() {
    //kreiere 2D Array
    var grid = new Array(WIDTH/CELL);
    for(var i = 0; i < WIDTH/CELL; i++)
        grid[i] = new Array(HEIGHT/CELL);

    // erstellt Instanzen folgender Klassen
    var field = new Snake.Views.PlayingFieldView();
    var prisonSnake = new Snake.Models.PrisonSnake();
    var prisonSnakeView = new Snake.Views.PrisonSnakeView();
    var gameController = new Snake.Controlls.GameController();
    // setzt die Startkoordinaten des Kopfes im Grid
    prisonSnake.startCoords(grid);
    // zeichnet Spielfeld und Schlange auf die Stage
    field.drawPlayingField();
    prisonSnakeView.drawSnake(grid);
    stage.update();

    // nimmt die Tastaturbefehle entgegen und löst weitere Aktionen aus
    this.document.onkeydown = gameController.keyInput(event);

}

//NameSpacing Snake (= Package)
var Snake = {

    // MVC-Klasse Controls
    Controlls : {
        // verarbeitet die Interaktionen des Nutzers
        GameController: function() {
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
    },

    // MVC-Klasse Model
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
};