    //global namespace
    var Snake = Snake || {};//NameSpacing ParaS6 (= Package, to avoid name conflicts)

    //erstellt neue Stage innerhalb des Canvas
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

    //Start Richtung der Schlange
    var direction = "right";
    //Variable fuer Richtungsaenderung
    var newDirection;

    // lädt den Spielfeldhintergrund ins Canvas
    var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");
    // lädt die Spielfigur (Schlangenelement) ins Canvas
    var dummy = new createjs.Bitmap("img/chara_dummy1.png");
    //[Title View]
    

// Main-Methode, welche beim Laden der HTML-Seite getriggert wird
function Main() {
    var gameMenue = new Snake.Menue.StartMenue();
    gameMenue.addMenueView();
}
    function addGameView() {
        var prisonSnakeScore = new Snake.Views.ScoreView();

        dummy.x=5*CELL;
        dummy.y=5*CELL;
        stage.addChild(playingfieldImg, dummy);
        prisonSnakeScore.drawScore();
        stage.update();
        //playingfieldImg.addEventListener("click", function (event) {startGame()});
        document.onkeydown = function (event) {
            if(event.keyCode == 37||38||39||40)
            startGame();
        };
    }
    
function startGame() {
    //kreiere 2D Array
    var grid = new Array(WIDTH/CELL);
    for(var i = 0; i < WIDTH/CELL; i++)
    grid[i] = new Array(HEIGHT/CELL);

    // erstellt Instanzen folgender Klassen
    var field = new Snake.Views.PlayingFieldView();
    var prisonSnake = new Snake.Models.PrisonSnake();
    var prisonSnakeView = new Snake.Views.PrisonSnakeView();
    var prisonSnakeScore = new Snake.Views.ScoreView();
    var gameController = new Snake.Controlls.GameController(field, prisonSnakeView, prisonSnake, grid, prisonSnakeScore);
    // setzt die Startkoordinaten des Kopfes im Grid
    prisonSnake.startCoords(grid);
    
    createjs.Ticker.setFPS(2);
    createjs.Ticker.addEventListener("tick",gameController.gameLoop);
}

