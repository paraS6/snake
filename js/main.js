    //global namespace
    var Snake = Snake || {};//NameSpacing ParaS6 (= Package, to avoid name conflicts)

    //erstellt neue Stage innerhalb des Canvas
    var stage = new createjs.Stage("myCanvas");
    const WIDTH = stage.canvas.width - 200; //Breite vom Spielfeld, 200 Pxel für Scorebereich reserviert
    const HEIGHT = stage.canvas.height - 40;   // Hoehe vom Spielfeld
    const CELL = 40;    //Zellengroesse
    const gridWidth = parseInt(WIDTH/CELL);
    const gridHeigth = parseInt(HEIGHT/CELL);
     // wenn im Grid[][] dieser Wert hinterlegt ist, befindet sich dort...
    const EMPTY = 0; // ein leeres Feld
    const SNAKE_BODY = 1; // ein Torso-Teil der Schlange
    const SNAKE_HEAD = 2; // der Kopf der Schlange
    const WALL = -1;
     // speichert den jeweiligen .keyCode der Pfeiltasten als Variable ab
    const   KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;
    
    //Variable fuer Richtungsaenderung
    var newDirection;
    var _direction;
    // lädt den Spielfeldhintergrund ins Canvas
    var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");
    // lädt die Spielfigur (Schlangenelement) ins Canvas
    var dummy = new createjs.Bitmap("img/chara_dummy1.png");

// Main-Methode, welche beim Laden der HTML-Seite getriggert wird
function Main() {
    var gameMenue = new Snake.Menue.StartMenue();
    gameMenue.addMenueView();   //Das Startfenster wird gezeichnten
}//end Main

 //das eigentliche Spiel wird hier gestartet => urspruengliche start()
function startGame() {

    //kreiere 2D Array
    var grid = new Array((gridWidth)); //grid.length = 14;
    for(var i = 0; i < gridWidth; i++)
    grid[i] = new Array(gridHeigth); //grid.length = 10;

    // erstellt Instanzen folgender Klassen
    var field = new Snake.Views.PlayingFieldView();
    var prisonSnake = new Snake.Models.PrisonSnake();
    var prisonSnakeView = new Snake.Views.PrisonSnakeView();
    var prisonSnakeScore = new Snake.Views.ScoreView();

    var gameController = new Snake.Controlls.GameController(field, prisonSnakeView, prisonSnake, grid, prisonSnakeScore);
    // setzt die Startkoordinaten des Kopfes im Grid
    prisonSnake.startCoords(grid);

    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener("tick",gameController.gameLoop);
}//end startGame

