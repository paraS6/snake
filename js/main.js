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

    // lädt den Spielfeldhintergrund ins Canvas
    var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");
    // lädt die Spielfigur (Schlangenelement) ins Canvas
    var dummy = new createjs.Bitmap("img/chara_dummy1.png");
    //[Title View]
    

// Main-Methode, welche beim Laden der HTML-Seite getriggert wird
function Main() {
    var gameMenue = new Snake.Menue.startMenue();
    gameMenue.addMenueView();
}
    function addGameView() {
        stage.addChild(playingfieldImg);
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
    
