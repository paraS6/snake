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
    var playingFieldImg;
    
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
            };
        };
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
        playingFieldImg = new createjs.Bitmap("img/spielfeld_level1.png"); //Level 1 Spielfeld erzeugen
    }
    if (levelId == 2) {
        var level2Sound = new Snake.Sound.Soundregister();
        level2Sound.playAndLoad("level_2.mp3");
        playingFieldImg = new createjs.Bitmap("img/spielfeld_level2.png"); //Level 2 Spielfeld erzeugen
    }
    if (levelId == 3) {
        var level3Sound = new Snake.Sound.Soundregister();
        level3Sound.playAndLoad("level_3.mp3");
        playingFieldImg = new createjs.Bitmap("img/spielfeld_level3.png"); //Level 3 Spielfeld erzeugen
    }
    //setzt die Geschwindigkeit je nach Id des Levels
    _level.setSpeed(levelId);
    var s = _level.getSpeed();
    var gameController = new Snake.Controlls.GameController();
    gameController.init(s, playingFieldImg);

}//end startGame

    function addHighScoreToForm() {
        //Highscore-Fenster und Formular sichtbar machen
        document.getElementById('highscore-container').style.display = "block";
        document.getElementById("highscore").style.display = "block";

        //bei abschicken der Formulardaten
        document.getElementById("highscore").onsubmit = function () {
            //Erzeugung eines XMLHttpRequest-Objekts mit Fallback für IE 5-6
            if (window.XMLHttpRequest) {
                // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
                xmlhttp = new XMLHttpRequest();
            }
            else {
                // AJAX mit IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            //wenn readyState-Attibut des xmlhttp-objects sich verändert, wird das readystatechange-EVENT gefeuert
            xmlhttp.onreadystatechange = function() {
                //readyState: 4: request finished and response is ready; status: 200: "OK"; When readyState is 4 and status is 200, the response is ready
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    //Highscore-Seite verbergen
                    document.getElementById("highscore-container").style.display = "none";
                    document.getElementById("highscore").style.display = "none";
                    //gibt einen DOMString zurück, der die response zu einem request enthält
                    writeHighscore(xmlhttp.responseText);
                }
            };
            //mittels POST-Objekt Formulardaten übermitteln
            xmlhttp.open("POST","http://janabo.de/prison-snake/highscore.php", true);
            // Request-Header für Formulardaten
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("name=" + document.getElementById("name").value + "&punkte=" + scoreTime);

            // Sumbit-Event überschreiben, damit man nicht bei mehrfachem Klick die gleichen Daten abschickt
            this.onsubmit = function() {
                return false;
            };

            return false;
        };//end onSubmit
    }//end addHighscoreToForm