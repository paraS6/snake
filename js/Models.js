// MVC-Klasse Model
Snake.Models = Snake.Models || {};

// Festgelegter Wert, ab welchem Score der Schlüssel auf dem Feld erscheint
const MINIMUMSCOREKEYAPPEAR = 400;

//Logik der Schlange
Snake.Models.Grid = function(){

    
    width = null;
    heigth = null;
    _grid = null;

    // initialisiert das Spielfeld Grid
    this.init = function (w, d, c, r) {
        this.width = c;
        this.heigth = r;
        // Grid als einfaches Array
        this._grid = [];

        // baut 2d Array zusammen
        for(var x = 0; x < c; x++){
            // Spalten auf X-Achse als 1. Dimension im Array
            this._grid.push([]);
            // Zeilen auf Y-Achse als 2. Dimension im Array
            for(var y = 0; y < r; y++){
                if(x === 0 || y === 0 || x == c-1 || y == r-1){
                    this._grid[x].push(w);
                }
                else{
                    this._grid[x].push(d);
                }

            }
        }
    },

    // Setter-Methode, um von außerhalb das Grid zu bearbeiten
    this.set = function (id, x, y) {
        this._grid[x][y] = id;
    }, 
        
    // Getter-Methode, um von außerhalb auf das Grid zuzugreifen
    this.get = function (x, y) {
        return this._grid[x][y];
    };
};//end Grid

// Logik der Spielstandberechnung
Snake.Models.Score = function() {

    // initialer Spielstand
    // TODO: über Variable initialisieren
    var _score = 0;
    var _keyCollected = false;
    var startTime = new Date();

    // erhöht den Spielstand nach speziellen Ereignissen im gameController
    this.set = function (newScore) {
        _score += newScore;
    };//end set
        
    // Getter-Funktion, um Spielstand in anderen Klassen abzufragen
    this.get = function () {
        return _score;
    };//end get

    //setzt den Score in Abhängigkeit des Collectibles
    this.setScore = function(_grid, nx, ny){
        

        if(_grid.get(nx, ny).ITEM == TUNA){
            var tunaSound = new Snake.Sound.Soundregister();
            tunaSound.playAndLoad("good_item.mp3");
            this.set(30);
        }
        else if(_grid.get(nx, ny).ITEM == CIGARETTES){
            var cigaSound = new Snake.Sound.Soundregister();
            cigaSound.playAndLoad("good_item.mp3");
            this.set(20);
        }
        else if(_grid.get(nx,ny) == PRISONER){
            var prisonerSound = new Snake.Sound.Soundregister();
            prisonerSound.playAndLoad("good_item.mp3");
            this.set(10);
        }
        else if(_grid.get(nx,ny).ITEM == KNIFE) {
            var knifeSound = new Snake.Sound.Soundregister();
            knifeSound.playAndLoad("bad_item.wav");
            this.set(-50);
        }
        // Sonderfall Schlüssel
        else if(_grid.get(nx,ny) == KEY) {
            // gibt an, dass der Schlüssel eingesammelt wurde --> Tor soll sich öffnen
            _keyCollected = true;

            //Ton für geöfnetes Tor
            var keySound = new Snake.Sound.Soundregister();
            keySound.playAndLoad("key.mp3");
        }
        
        
    };//end setScore

    // Getter-Methode, gibt an, ob der Schlüssel schon eingesammelt wurde
    this.getKeyStatus = function (){
        return _keyCollected;
    };//end getKeyStatus
    
    //gibt die Zeit zurück, die ein Collectible auf dem Grid erscheint
    this.getTime = function (ende){
        var t = parseInt((ende - startTime)/1000);
        s = t%60;
        m = parseInt(t/60);
        if(s < 10){
            var time = m+":0"+s;
        }else{
            var time = m+":"+s;
        }
        return time;
    };//end getTime
    
    this.getScoreTime = function (ende) {
        return parseInt((ende - startTime)/1000);
    };//end getScoreTime
};// end Score

//verarbeitet die Logik der Schlange
Snake.Models.PrisonSnake = function () {

    direction =null; // Laufrichtung der Schlange
    last = null; // Pointer auf das letzte Element der Schlange
    _queue = null; // Array der Schlange als FIFO Queue

    //initialisiert die Schlange
    this.init = function (d, x, y) {
       this.direction = d;
        this._queue = [];
        this.insert(x, y, d);
    };// end init

    // fügt der Schlange ein neues Element hinzu, indem dieses mit unshift an ERSTER Stelle im Array eingefügt wird --> FIFO
    this.insert = function (x, y, d) {
        this._queue.unshift({x:x, y:y, d:d });
        this.last = this._queue[0];
    };//end insert

    // Gibt das erste Element des Arrays (also der Schlangenschwanz) zurück
    this.remove =function () {
        return this._queue.pop();
    };//end remove
};//end PSnake

//verarbeitet die Logik der Collectibles
Snake.Models.Collectibles = function () {

    var _counter; // erhöht sich beim Einsammeln eines Prisoners
    var _keySetOnGrid = false; // wurde der Schlüssel bereits aufs Grid gesetzt?
    
    // Setzt den Schlüssel auf das Spielfeld
    this.setKey = function (grid){
        
        var _grid = grid;
        // Array-Variable für alle leeren Felder
        var empty = [];
        // Schleife zum Durchlauf über das gesamte Spielfeld
        for (var x = 0; x < _grid.width; x++) {
            for (var y = 0; y < _grid.heigth; y++) {
                // Über Getter-Methode wird abgeglichen ob jeweilige Position leer ist
                if (_grid.get(x, y) == EMPTY) {
                    // wenn ja, wird Position ins Array gepusht
                    empty.push({x: x, y: y});
                }
            }

        }
        
        // Randomizer geht durch alle leeren Felder
        var randpos = empty[Math.floor(Math.random() * empty.length)];
        // Über Setter-Methode wird ein Prisoner an eine zufällige leere Positon gesetzt
        _grid.set(KEY, randpos.x, randpos.y);
   
       
    };//end setKey
    
    //ruft die Funktion zum Setzen des Keys auf sobald der Score über 500 ist
    this.keySetter = function (score, grid) {
        // !!zu Testzwecken wird der Wert auf 40 gesetzt!!
        if(_keySetOnGrid === false && score >= MINIMUMSCOREKEYAPPEAR){
            this.setKey(grid);
            // true = der Schlüssel wurde auf das Grid gesetzt
            _keySetOnGrid = true;
        }
    };//end keySetter
    
    
    
    // Setzt ein einzusammelndes Schlangenelement auf das Spielfeld
    this.setPrisoner = function (grid){

        var _grid = grid;
        // Array-Variable für alle leeren Felder
        var empty = [];
        // Schleife zum Durchlauf über das gesamte Spielfeld
        for (var x = 0; x < _grid.width; x++) {
            for (var y = 0; y < _grid.heigth; y++) {
                // Über Getter-Methode wird abgeglichen ob jeweilige Position leer ist
                if (_grid.get(x, y) == EMPTY) {
                    // wenn ja, wird Position ins Array gepusht
                    empty.push({x: x, y: y});
                }
            }
        }

        // Randomizer geht durch alle leeren Felder
        var randpos = empty[Math.floor(Math.random() * empty.length)];
        // Über Setter-Methode wird ein Prisoner an eine zufällige leere Positon gesetzt
        _grid.set(PRISONER, randpos.x, randpos.y);
    };//end setPrisoner
    
    //setzt ein zufälliges Item auf das Spielfeld
    this.setCollectibles = function(grid) {
        //Array-Variable für alle leeren Felder
        var empty = [];
        //Schleife zum Durchlauf über das gesamte Spielfeld
        for(var x = 0; x < grid.width; x++){
            for(var y = 0; y < grid.heigth; y++){
                //Über Getter-Methode wird abgeglichen ob jeweilige Position leer ist
                if(grid.get(x, y) == EMPTY){
                    //wenn ja wird eine Position ins Array gepusht
                    empty.push({x:x, y:y});
                }

            }

        }


       //Variable speichert zufällige Position
        var randpos = empty[Math.floor(Math.random()*empty.length)];
        //zufälliges Item wird aufgerufen
        var randomItem = {ITEM:this.generateRandomItem(), timer: new Date()};
        //Item wird an zufällige leer Position gesetzt
        grid.set(randomItem, randpos.x, randpos.y);
        
    };//end setCollectibles
    
    // Durchläuft das Grid und löscht Items nach definierter Zeit vom Grid
    this.trackItems = function(grid) {
        // verschachtelte Schleife durchläuft das Feld
        for (var x = 0; x < grid.width; x++){
            for (var y = 0; y < grid.heigth; y++){

                // Wenn ein Feld von einem Item belegt ist, wird folgende Aktion ausgeführt
                switch(grid.get(x,y).ITEM){
                    case CIGARETTES:
                        endTime = new Date();
                        // Counter wird im Takt der framerate hochgezählt
                        // nach x update-Durchläufen im Controller...
                        if(((endTime - grid.get(x,y).timer) /1000) >= 7){
                            //... wird die Zelle wieder auf leer gesetzt
                            grid.set(EMPTY,x,y);
                        }
                        break;
                    case TUNA:
                        endTime = new Date();
                        if(((endTime - grid.get(x,y).timer) /1000) >= 7){
                            grid.set(EMPTY,x,y);
                        }
                        break;
                    case KNIFE:
                        endTime = new Date();
                        if(((endTime - grid.get(x,y).timer) /1000) >= 15){
                            grid.set(EMPTY,x,y);
                        }
                        break;
                    default:
                        break;
                }
            }
         }
    };//end trackItems
    
    //generiert ein zufälliges Item und gibt es zurück
    this.generateRandomItem = function () {
        var r = Math.floor((Math.random()*3)+4);
        return r;
    };//end generateRandomItem
    
    //gibt den Counter zurück
    this.getCounter = function (_counter) {
        return _counter;
    };//end getCounter

    //setzt den Counter
    this.setCounter = function (counter) {
        _counter = counter;
    };//end setCounter

    //ruft nachdem eine bestimmte Anzahl von Prisonern eingesammelt wurde die Funktion
    //zum Setzten eines zufälligen Items auf
    this.setRandomItem = function (grid) {
        this.getCounter(_counter);
        if(_counter%6 === 0){
            _counter = 1;
            this.setCollectibles(grid);
        }

    };//end setRandomItem
};//end Snake.Models.Collectibles
