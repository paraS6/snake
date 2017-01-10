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

    var scoreTime = 0;
    // lädt den Spielfeldhintergrund ins Canvas
    var playingfieldImg = new createjs.Bitmap("img/spielfeld_finals_plus_score.png");


/*/ Main-Methode, welche beim Laden der HTML-Seite getriggert wird
function Main() {
    var gameMenue = new Snake.Menue.StartMenue();
    gameMenue.addMenueView();   //Das Startfenster wird gezeichnten
}//end Main*/


    // Main-Methode, welche beim Laden der HTML-Seite getriggert wird
    function Main() {
        var gameMenue = new Snake.Menue.StartMenue();
        gameMenue.addMenueView();
        var menuSoundneu = new Snake.Sound.Soundregister();
        menuSoundneu.playAndLoad("menu.mp3");

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
    createjs.Sound.stop();

    if (levelId == 1) {
        scoreTime = 0;
        var level1Sound = new Snake.Sound.Soundregister();
        level1Sound.playAndLoad("level_1.mp3");
    }
    if (levelId == 2) {
        var level2Sound = new Snake.Sound.Soundregister();
        level2Sound.playAndLoad("level_2.mp3");
    }
    if (levelId == 3) {
        var level3Sound = new Snake.Sound.Soundregister();
        level3Sound.playAndLoad("level_3.mp3");
    }
    //setzt die Geschwindigkeit je nach Id des Levels
    _level.setSpeed(levelId);
    var s = _level.getSpeed();
    var gameController = new Snake.Controlls.GameController();
    gameController.init(s);

}//end startGame

    function addHighScoreToForm() {
        document.getElementById('highscore-container').style.display = "block";
        document.getElementById("highscore").style.display = "block";
        document.getElementById("score").value = ""+scoreTime;

        document.getElementById("highscore").onsubmit = function () {
            if (window.XMLHttpRequest) {
                // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
                xmlhttp = new XMLHttpRequest();
            }
            else {
                // AJAX mit IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.onreadystatechange = function() {
                //
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("highscore-container").style.display = "none";
                    document.getElementById("highscore").style.display = "none";
                    writeHighscore(xmlhttp.responseText);
                }
            }

            xmlhttp.open("POST","http://janabo.de/prison-snake/highscore.php", true);
            // Request-Header für Formulardaten
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("name=" + document.getElementById("name").value + "&punkte=" + document.getElementById("score").value);

            // Sumbit-Event überschreiben
            this.onsubmit = function() {
                return false;
            }

            return false;
        }
    }