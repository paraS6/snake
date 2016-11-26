//global namespace
var Snake = Snake || {};//NameSpacing ParaS6 (= Package, to avoid name conflicts)

//erstellt neue Stage innerhalb des Canvas
var stage = new createjs.Stage("myCanvas");

//Konstanten
const WIDTH = stage.canvas.width - 200; //Breite vom Spielfeld, 200 Pixel für Scorebereich reserviert
const HEIGHT = stage.canvas.height - 40;   // Hoehe vom Spielfeld
const CELL = 40;    //Zellengroesse
const GRIDWIDTH= parseInt(WIDTH/CELL); //Breite des Grids
const GRIDHEIGHT = parseInt(HEIGHT/CELL); //Höhe des Grids

// wenn im Grid[][] dieser Wert hinterlegt ist, befindet sich dort...
const EMPTY = 0; // ein leeres Feld
const SNAKE_HEAD = 2; // der Kopf der Schlange
const PRISONER = 3;

// speichert den jeweiligen .keyCode der Pfeiltasten als Variable ab
const KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;

// lädt den Spielfeldhintergrund ins Canvas
var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");

// Main-Methode, welche beim Laden der HTML-Seite getriggert wird
function Main() {
    var gameMenue = new Snake.Menue.StartMenue();
    gameMenue.addMenueView();   //Das Startfenster wird gezeichnten
}//end Main

//das eigentliche Spiel wird hier gestartet => urspruengliche start()
function startGame() {


    //GameOverScreen erstellen
    var gameOver = new Snake.Menue.GameOver();

    // erstellt Instanzen folgender Klassen
    var field = new Snake.Views.PlayingFieldView();
    var prisonSnakeView = new Snake.Views.PrisonSnakeView();
    var prisonSnakeScore = new Snake.Views.ScoreView();
    var grid = new Snake.Models.Grid();
    var prisonSnake = new Snake.Models.PrisonSnake();
    var collect = new Snake.Models.Collectibles();
    var gameController = new Snake.Controlls.GameController(field, prisonSnakeView, prisonSnakeScore);

    //init
    grid.init(EMPTY, GRIDWIDTH, GRIDHEIGHT);
    var startPos = {x:Math.floor(GRIDWIDTH/2), y:(GRIDHEIGHT/2) -1};
    prisonSnake.init("right", startPos.x, startPos.y);
    grid.set(SNAKE_HEAD, startPos.x, startPos.y);
    //end init

    collect.setPrisoner();
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick",handleTick);
    createjs.Ticker.paused = false;
    //Ueberpruefen des Tickers
    function handleTick(){
        if(createjs.Ticker.paused == false){
            gameController.gameLoop();
        }
        else{
            console.log("tot");
            createjs.Ticker.removeEventListener("tick",handleTick);
            gameOver.addGameOverView();
        }
    }//end handleTick

}//end startGame


