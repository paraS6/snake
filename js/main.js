    //global namespace
    var Snake = Snake || {};//NameSpacing ParaS6 (= Package, to avoid name conflicts)

    //erstellt neue Stage innerhalb des Canvas
    var stage = new createjs.Stage("myCanvas");
    const WIDTH = stage.canvas.width - 200; //Breite vom Spielfeld, 200 Pxel für Scorebereich reserviert
    const CELL = 40;    //Zellengroesse

     // wenn im Grid[][] dieser Wert hinterlegt ist, befindet sich dort...
    const EMPTY = 0; // ein leeres Feld
    const WALL = 1; // Mauer, Rand
    const SNAKE_HEAD = 2; // der Kopf der Schlange
    const PRISONER = 3; // ein einzusammelndes Schlangenelement (Collectible)
    const TUNA = 4;
    const CIGARETTES  = 5;
    const KNIFE = 6;
    const KEY = 8;
    const GATE = 9;

  
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
function startGame(levelId) {

    var _level = new Snake.Levels.Level();
    //setzt die Geschwindigkeit je nach Id des Levels
    _level.setSpeed(levelId);
    var s = _level.getSpeed();
    var gameController = new Snake.Controlls.GameController();
    gameController.init(s);


}//end startGame

