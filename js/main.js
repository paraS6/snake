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
    const PRISONER = 3; // ein einzusammelndes Schlangenelement (Collectible)
     // speichert den jeweiligen .keyCode der Pfeiltasten als Variable ab
    //TODO Konstanten in GameController
    const KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;

    // lädt den Spielfeldhintergrund ins Canvas
    var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");

/*/ Main-Methode, welche beim Laden der HTML-Seite getriggert wird
function Main() {
    var gameMenue = new Snake.Menue.StartMenue();
    gameMenue.addMenueView();   //Das Startfenster wird gezeichnten
}//end Main*/

    // Main-Methode, welche beim Laden der HTML-Seite getriggert wird
    function Main() {
        var gameMenue = new Snake.Menue.StartMenue();
        gameMenue.addMenueView();
        var loadWebFont = function() {
            var request = new XMLHttpRequest();
            request.open('GET', './css/index.css', true);
            request.send(null);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var headNode = document.getElementsByTagName('head')[0];
                        var newNode = document.createElement('link');
                        newNode.setAttribute('href', './css/index.css');
                        newNode.setAttribute('rel', 'stylesheet');
                        newNode.setAttribute('type', 'text/css');
                        headNode.appendChild(newNode);
                        console.log("erfolgreich");
                        createjs.Ticker.on("tick", stage);
                    }
                    else {
                        alert("Die angegebene Schriftart existiert nicht! Bitte versuchen sie es erneut!");
                    }
                }
            }
        }
        loadWebFont();
    }//end Main
    //TODO startGame() in Controller auslagern
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
    var collectibles = new Snake.Models.Collectibles();
    var score = new Snake.Models.Score();
    var gameController = new Snake.Controlls.GameController(field, prisonSnakeView, prisonSnakeScore, grid, prisonSnake, collectibles, score);


    //init
    grid.init(EMPTY, GRIDWIDTH, GRIDHEIGHT);
    var startPos = {x:Math.floor(GRIDWIDTH/2), y:(GRIDHEIGHT/2) -1};
    prisonSnake.init("right", startPos.x, startPos.y);
    grid.set(SNAKE_HEAD, startPos.x, startPos.y);
    //end init
    
    collectibles.setPrisoner(grid);
    // Die Funktion handleTick wird 30 mal in der Sekunde aufgerufen
    createjs.Ticker.setFPS(5);
    createjs.Ticker.addEventListener("tick",handleTick);
    createjs.Ticker.paused = false;
    
    //Ueberpruefen des Tickers
    function handleTick(){
        // solange Ticker nicht pausiert wird, wird der gameLoop fortgesetzt
        if(createjs.Ticker.paused == false){
            gameController.gameLoop();
        }
        // sobald pausiert wird (Schlange ist tot), wird Ticker entfernt und GameOver Screen eingeblendet
        else{
            console.log("tot");
            createjs.Ticker.removeEventListener("tick",handleTick);
            gameOver.addGameOverView();
        }
    }//end handleTick
    
}//end startGame

