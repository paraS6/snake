// MVC-Klasse Model
Snake.Models = {};
    
//Logik der Schlange
//TODO eignene Dateien für die jeweiligen Models
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
                if(x ==0 || y == 0 || x == c-1 || y == r-1){
                    this._grid[x].push(w);
                }
                else{
                    this._grid[x].push(d);
                }

            }
        }
    },

    // Setter-Methode, um von außerhalb das Grid zu bearbeiten
    this.set = function (val, x, y) {
        this._grid[x][y] = val;
    }, 
        
    // Getter-Methode, um von außerhalb auf das Grid zuzugreifen
    this.get = function (x, y) {
        return this._grid[x][y];
    }
}//end Grid

// Logik der Spielstandberechnung
Snake.Models.Score = function() {

    // initialer Spielstand
    // TODO: über Variable initialisieren
    var _score = 0;
    var _keyCollected = false;

    // erhöht den Spielstand nach speziellen Ereignissen im gameController
    // TODO: Funktion ermöglichen, um unterschiedliche Collectibles unterschiedlich zu bewerten
    this.set = function (newScore) {
        _score += newScore;
    },
        
    // Setter-Funktion, um Spielstand in anderen Klassen abzufragen
    this.get = function () {
        return _score;
    }

    //setzt den Score in Abhängigkeit des Collectibles
    this.setScore = function(_grid, nx, ny){
        

        if(_grid.get(nx, ny) == TUNA){
            var tunaSound = new Snake.Sound.Soundregister();
            tunaSound.playAndLoad("good_item.wav");
            this.set(30);
        }
        else if(_grid.get(nx, ny) == CIGARETTES){
            var cigaSound = new Snake.Sound.Soundregister();
            cigaSound.playAndLoad("good_item.wav");
            this.set(20);
        }
        else if(_grid.get(nx,ny) == PRISONER){
            var prisonerSound = new Snake.Sound.Soundregister();
            prisonerSound.playAndLoad("good_item.wav");
            this.set(10);
        }
        else if(_grid.get(nx,ny) == KNIFE) {
            var knifeSound = new Snake.Sound.Soundregister();
            knifeSound.playAndLoad("bad_item.wav");
            this.set(-50);
        }
        // Sonderfall Schlüssel
        else if(_grid.get(nx,ny) == KEY) {
            //this.set(0);
            // gibt an, dass der Schlüssel eingesammelt wurde --> Tor soll sich öffnen
            _keyCollected = true;
            console.log("Key Collected");

            //Ton für geöfnetes Tor
            var keySound = new Snake.Sound.Soundregister();
            keySound.playAndLoad("key.mp3");
        }
        
        
    }//end setScore

    // Getter-Methode, gibt an, ob der Schlüssel schon eingesammelt wurde
    this.getKeyStatus = function (){
        return _keyCollected;
    }

}// end Score



// 
Snake.Models.PrisonSnake = function () {

    direction =null; // Laufrichtung der Schlange
    last = null; // Pointer auf das letzte Element der Schlange
    _queue = null; // Array der Schlange als FIFO Queue

    //
    this.init = function (d, x, y) {
       this.direction = d;
        this._queue = [];
        this.insert(x, y, d);
    },

    // fügt der Schlange ein neues Element hinzu, indem dieses mit unshift an ERSTER Stelle im Array eingefügt wird --> FIFO
    this.insert = function (x, y, d) {
        this._queue.unshift({x:x, y:y, d:d });
        this.last = this._queue[0];
    },

    // Gibt das erste Element des Arrays (also der Schlangenschwanz) zurück
    this.remove =function () {
        return this._queue.pop();
    }
}//end PSnake

Snake.Models.Collectibles = function () {
    
    var _counter; // erhöht sich beim Einsammeln eines Prisoners
    var _cnt = 1; // Zähler für die Präsenzdauer eines Items
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
   
       
    }//end setKey
    
    //ruft die Funktion zum Setzen des Keys auf sobald der Score über 500 ist
    this.keySetter = function (score, grid) {
        // !!zu Testzwecken wird der Wert auf 40 gesetzt!!
        if(_keySetOnGrid == false && score >= 40){
            this.setKey(grid);
            // true = der Schlüssel wurde auf das Grid gesetzt
            _keySetOnGrid = true;
        }
    }
    
    
    
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
    }//end setPrisoner
    
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
        var randomItem = this.generateRandomItem();
        //Item wird an zufällige leer Position gesetzt
        grid.set(randomItem, randpos.x, randpos.y);
      
        //this.remove(randomItem,randpos.x, randpos.y, grid);
        
    }//end setCollectibles

    // Durchläuft das Grid und löscht Items nach definierter Zeit vom Grid
    this.trackItems = function(grid) {
        // verschachtelte Schleife durchläuft das Feld
        for (var x = 0; x < grid.width; x++){
            for (var y = 0; y < grid.heigth; y++){
                // Wenn ein Feld von einem Item belegt ist, wird folgende Aktion ausgeführt
                switch(grid.get(x,y)){
                    case CIGARETTES:
                        // Counter wird im Takt der framerate hochgezählt
                        _cnt++;
                        // nach x update-Durchläufen im Controller...
                        if(_cnt%35 == 0){
                            //... wird die Zelle wieder auf leer gesetzt
                            grid.set(EMPTY,x,y);
                            //... und der Counter wieder auf Anfangswert gesetzt
                            _cnt = 1;
                        }
                        break;
                    case TUNA:
                        _cnt++;
                        if(_cnt%35 == 0){
                            grid.set(EMPTY,x,y);
                            _cnt = 1;
                        }
                    case KNIFE:
                        _cnt++;
                        if(_cnt%75 == 0){
                            grid.set(EMPTY,x,y);
                            _cnt = 1;
                        }
                    default:
                        break;
                }
            }
         }
    };
    
    
    /*
    this.remove = function (randomItem, x, y,grid) {

            _cnt++;
            console.log("Remove Counter: "+_cnt);
            if(_cnt >= 3){
                    
                grid.set(EMPTY,x,y);
            }
        

    }*/
    
    //generiert ein zufälliges Item und gibt es zurück
    this.generateRandomItem = function () {
        var r = Math.floor((Math.random()*3)+4);
        return r;
    }
    
    this.getCounter = function (_counter) {
        return _counter;
    }//end getCounter


    this.setCounter = function (counter) {
        _counter = counter;
    }//end setCounter

    //ruft nachdem eine bestimmte Anzahl von Prisonern eingesammelt wurde die Funktion
    //zum Setzten eines zufälligen Items auf
    this.setRandomItem = function (grid) {
        this.getCounter(_counter);
        if(_counter%6 == 0){
            _counter = 1;
            this.setCollectibles(grid);
        }

    }//end setRandomItem

    /*
    //bewirkt, dass jeweiliges Item zeitlich begrenzt auf dem Spielfeld erscheint
    this.trackItem = function () {


        if(grid.get(x,y) == TUNA){
            _cnt++;
            if(_cnt%25 == 0){
                grid.set(x,y) == TUNA;
            }
        }
    }*/
}//end Snake.Models.Collectibles
