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
    const TUNA = 4;
    const CIGARETTES  = 5;
    const KNIFE = 6;

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

    
 //das eigentliche Spiel wird hier gestartet => urspruengliche start()
function startGame() {
    
    var gameController = new Snake.Controlls.GameController();      //Whuuup whuuup so kurz :D
    gameController.init();
    
}//end startGame

