//Sub namespacing
Snake.Menue = Snake.Menue || {};

//Variable für Level
var _level = 1;
//StartMenue, Instructions & Fenster, Buttons
Snake.Menue.StartMenue = function() {

        var _startButton = new Snake.Menue.Buttons("img/spiel_starten_button.png", 0, 0); //Startbutton erstellen
        var _instButton = new Snake.Menue.Buttons("img/anleitung_button.png", 0, 100); //Instructionbutton erstellen

        //erstellt ein MenueFenster mit Ueberschrift
        this.menueWindow = function (title, x, y) {
            var _window = new createjs.Container(); //Containerelement, das dann Hintergrund und Ueberschrift enthaelt
            var _mainbg = new createjs.Shape(); //Hintergrund vom Fenster
            var _title = new createjs.Text(title, "80px pixel", "white");   //Ueberschrift
           //Text zentrieren
            var b = _title.getBounds();
            _title.x = (stage.canvas.width - b.width)/2 +x;
            _title.y = (stage.canvas.height/4) +y;
            _mainbg.graphics.beginFill("black").drawRect(0,0,stage.canvas.width, stage.canvas.height); //Hintergrund
             _window.addChild(_mainbg, _title);
            return _window;
        };//endMenueWindow

        //erstellt Startfenster den Spiels
        this.addMenueView = function () {

            

            var startWindow = new createjs.Bitmap("img/spielstart.png"); //erstellt neues Menuefenster

            stage.addChild(startWindow, _startButton, _instButton);
            stage.update();
            //mit Spacebar weiter
            document.onkeydown = function (event) {
                if(event.keyCode == 32){
                    //console.log("space");
                    var _levelWindow = new Snake.Menue.Level();
                    stage.removeAllChildren();
                    _levelWindow.addLevelView(_level);
                }
            };
            // Button Listeners
            _startButton.addEventListener("click", function (event) {   //startet Spiel
                var _levelWindow = new Snake.Menue.Level();
                stage.removeAllChildren();
                _levelWindow.addLevelView(_level);

            });
            _instButton.addEventListener("click", function (event) {    //fuehrt zum Instructionfenster
                var _instWindow = new Snake.Menue.Instructions();
                stage.removeAllChildren();
                _instWindow.addInstructionView();

            });

            //end ButtonListeners

    };//end addMenueView
    
};//end StartMenue
//Klasse fuegt Instructionfenster hinzu
Snake.Menue.Instructions = function () {
 //Fenster erstellen

    var _instClose = new Snake.Menue.Buttons("img/close.png", 540, -250); //zurueck Button erstellen

    //Fenster, Buttons und Eventlistener fuer das Instructionfenster
    this.addInstructionView = function () {

        var _instWindow = new createjs.Bitmap("img/instructions.png"); //Fenster erstellen

        stage.addChild(_instWindow,_instClose);
        stage.update();

        //Button Listeners
        _instClose.addEventListener("click", function (event) {   //startet Spiel
            stage.removeChild(_instWindow, _instClose);   //erst alle Elemente von Stage entfernen
            var gameMenue = new Snake.Menue.StartMenue();
            gameMenue.addMenueView();
        });

        //end Button Listeners
    };//end addInstructionsView
};//end Instructions

//Klasse fuegt Level Intro Screen ein
Snake.Menue.Level = function () {
    //Fenster erstellen
    var _levelStarten = new Snake.Menue.Buttons("img/level_starten.png", 0, 0); //Level starten Button erstellen


    //Fenster, Buttons und Eventlistener fuer das Instructionfenster
    this.addLevelView = function (_levelId) {

        var _levelWindow1 = new createjs.Bitmap("img/tower_of_london_intro.png"); //Fenster erstellen
        var _levelWindow2 = new createjs.Bitmap("img/alcatraz_intro.png"); //Fenster erstellen
        var _levelWindow3 = new createjs.Bitmap("img/guantanamo_intro.png"); //Fenster erstellen
        //console.log("LEVEL:" + _levelId);
        if(_levelId==1){
            stage.addChild(_levelWindow1,_levelStarten);
            stage.update();
        }
        else if(_levelId==2){
            stage.addChild(_levelWindow2,_levelStarten);
            stage.update();
        }
        else if(_levelId==3){
            stage.addChild(_levelWindow3,_levelStarten);
            stage.update();
        }

        document.onkeydown = function (event) {
            if(event.keyCode == 32){
                stage.removeAllChildren();
                startGame(_levelId);
                _level++; 
            }
        };
        //Button Listeners
        _levelStarten.addEventListener("click", function (event) {   //startet Spiel
            stage.removeAllChildren();

            startGame(_levelId);
            _level++;


        });

        //end Button Listeners
    };//end addInstructionsView
};//end Instructions

//Klasse um neue Buttons zur erstellen
Snake.Menue.Buttons = function (path, x, y) {
     var _bc = new createjs.Bitmap(path);
    var _x = x; //verschiebt Button auf xAchse
    var _y = y; //verschiebt Button auf yAchse
    _bc.scaleX = 0.5;
    _bc.scaleY = 0.5;
    _bc.x = (stage.canvas.width-514*0.5)/2 + _x;
    _bc.y = (stage.canvas.height/2) + _y;
   return _bc;
};//end Buttons


//GameOverScreen
Snake.Menue.GameOver = function () {
    var _gameOverWindow = new createjs.Bitmap("img/gameover_screen.png"); //erstellt neues Menuefenster //Fenster erstellen
    var _restartButton = new Snake.Menue.Buttons("img/spiel_neu_starten.png", 0, 20); //Startbutton erstellen
    var _highScore = new Snake.Menue.Buttons("img/highscore_button.png", 0, 100); //zurueck Button erstellen

    //Fenster, Buttons und Eventlistener fuer das Instructionfenster
    this.addGameOverView = function () {

        stage.addChild(_gameOverWindow,_restartButton, _highScore);
        stage.update();


        var gameOverSong = new Snake.Sound.Soundregister();
        gameOverSong.playAndLoad("gameover_song.mp3");
        //mit spacebar weiter
        document.onkeydown = function (event) {
            if(event.keyCode == 32){
                stage.removeAllChildren();   //erst alle Elemente von Stage entfernen
                _level = 1;
                var _levelWindow = new Snake.Menue.Level();
                _levelWindow.addLevelView(_level);
            }
        };
        //Button Listeners
        _highScore.addEventListener("click", function (event) {   //startet Spiel
            Snake.Menue.Highscore();
        });
        _restartButton.addEventListener("click", function (event) {   //startet Spiel
            stage.removeAllChildren();   //erst alle Elemente von Stage entfernen
            _level = 1;
            var _levelWindow = new Snake.Menue.Level();
            _levelWindow.addLevelView(_level);


        });//End Button Listeners

    };//end addGameOverView
};//end GameOver



//Screen für das nächste Level
Snake.Menue.NextLevel = function () {
    var _nextLevelButton = new Snake.Menue.Buttons("img/naechstes_level.png", 0, 0); //Startbutton erstellen
    var _nextLevelWindow = new Snake.Menue.StartMenue().menueWindow("Ausbruch erfolgreich!", 0, 0); //Fenster erstellen für Zwischensequenzen der Levels
    var _firstLevelButton = new Snake.Menue.Buttons("img/spiel_neu_starten.png", 0, 0); //Startbutton erstellen um von vorne beginnen zu können
    var _victoryWindow = new Snake.Menue.StartMenue().menueWindow("Du bist ein \rAusbrecherkönig!", 0, 0); //Fenster erstellen für Sieg-Screen

    var _highScore = new Snake.Menue.Buttons("img/highscore_button.png",0, 100); //zurueck Button erstellen


    //Fenster, Buttons und Eventlistener fuer das Instructionfenster
    this.addNextLevelView = function () {

        createjs.Sound.stop();

        
        // wenn die drei Level noch nicht durchgespielt wurden...
        if (_level<4){
            // ...werden nextLevelWindow und nextLevelButton angezeigt
            // !!! neuer Button mit neuem Text (zB "Next Level") erforderlich !!!
            stage.addChild(_nextLevelWindow,_nextLevelButton);
            //Menuemusik abspielen
            var menuSound = new Snake.Sound.Soundregister();
            menuSound.playAndLoad("menu.mp3");

            //Button Listeners

            _nextLevelButton.addEventListener("click", function (event) {   //startet Spiel
                stage.removeAllChildren();   //erst alle Elemente von Stage entfernen

                var _levelWindow = new Snake.Menue.Level();
                _levelWindow.addLevelView(_level);


            });
            //mit Spacebar weiter
            document.onkeydown = function (event) {
                if(event.keyCode == 32){
                    stage.removeAllChildren();   //erst alle Elemente von Stage entfernen

                    var _levelWindow = new Snake.Menue.Level();
                    _levelWindow.addLevelView(_level);

                }
            };
        }
        // wenn das Spiel siegreich beendet wurde...
        else {
            // Highscore-Button muss noch hinzugefügt werden
            stage.addChild(_victoryWindow, _firstLevelButton, _highScore);

            var winningSound = new Snake.Sound.Soundregister();
            winningSound.playAndLoad("winning_complete.mp3");
            var endsong = new Snake.Sound.Soundregister();
            endsong.playAndLoad("gameover_song.mp3");

            //mit Spacebar weiter
            document.onkeydown = function (event) {
                if(event.keyCode == 32){
                    stage.removeAllChildren();   //erst alle Elemente von Stage entfernen
                    _level = 1;

                    //console.log("LEVEL:" + _level);
                    var _levelWindow = new Snake.Menue.Level();
                    _levelWindow.addLevelView(_level);
                }
            };
            //End Button Listeners
            _highScore.addEventListener("click", function (event) {   //startet Spiel
                Snake.Menue.Highscore();
            });
            _firstLevelButton.addEventListener("click", function (event) {   //startet Spiel
                stage.removeAllChildren();   //erst alle Elemente von Stage entfernen
                _level = 1;

                console.log("LEVEL:" + _level);
                var _levelWindow = new Snake.Menue.Level();
                _levelWindow.addLevelView(_level);
                //startGame(_level); //Spielfeld wird neu geladen mit erstem Level
                //console.log("level "+_level);

            });//End Button Listeners

            addHighScoreToForm();
        }
        stage.update();
    };//end NextLevelView
};//end NextLevel

Snake.Menue.Highscore = function() {
    //Erzeugung eines XMLHttpRequest-Objekts mit Fallback für IE 5-6
    if (window.XMLHttpRequest) {
        // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // AJAX mit IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //wenn response von Server kommt, wird Highscorefenster mit Tabelle angezeigt
    xmlhttp.onreadystatechange = function() {
        //
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            writeHighscore(xmlhttp.responseText);
        }
    };
    //PHP-Script von Server aufrufen
    xmlhttp.open("GET","http://janabo.de/prison-snake/highscore.php");
    xmlhttp.send();
};
//
function writeHighscore(json) {
    //wandelt JSON-Objekt in JavsScript-Objekt um
    var liste = JSON.parse(json);

    //durchläuft Listeneinträge
    var tbody = '';
    for(i = 0; i < liste.length; i++) {
        tbody += '<tr>' +
            '<td>' + (i + 1) + '.</td>' +
            '<td>' + liste[i].name + '</td>' +
            '<td>' + liste[i].punkte + '</td>' +
            '</tr>';
    }
    //fügt Daten der Highscore-Tabelle hinzu
    document.getElementsByTagName("tbody")[0].innerHTML = tbody;
    //Tabelle und Highscore-Seite sichtbar machen
    document.getElementsByTagName("table")[0].style.display = 'block';
    document.getElementById('highscore-container').style.display = 'block';
}
