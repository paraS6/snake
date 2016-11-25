    //global namespace
    var Snake = Snake || {};//NameSpacing ParaS6 (= Package, to avoid name conflicts)

    //erstellt neue Stage innerhalb des Canvas
    var stage = new createjs.Stage("myCanvas");
    const WIDTH = stage.canvas.width - 200; //Breite vom Spielfeld, 200 Pxel für Scorebereich reserviert
    const HEIGHT = stage.canvas.height - 40;   // Hoehe vom Spielfeld
    const CELL = 40;    //Zellengroesse
    const GRIDWIDTH= parseInt(WIDTH/CELL);
    const GRIDHEIGHT = parseInt(HEIGHT/CELL);
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

    var gameController = new Snake.Controlls.GameController(field, prisonSnakeView, prisonSnakeScore);

    //init
    Snake.Models.Grid.init(EMPTY, GRIDWIDTH, GRIDHEIGHT);
    var startPos = {x:Math.floor(GRIDWIDTH/2), y:(GRIDHEIGHT/2) -1};
    Snake.Models.PSnake.init("right", startPos.x, startPos.y);
    Snake.Models.Grid.set(SNAKE_HEAD, startPos.x, startPos.y);
    //end init
    
    setPrisoner();
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

