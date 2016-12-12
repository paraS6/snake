// MVC-Klasse Model
Snake.Models = {};
    
//Logik der Schlange
//TODO eignene Dateien für die jeweiligen Models
Snake.Models.Grid = function(){
    
    
    width = null;
    heigth = null;
    _grid = null;

    // initialisiert das Spielfeld Grid
    this.init = function (d, c, r) {
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
                this._grid[x].push(d);
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
            this.set(30);
        }
        else if(_grid.get(nx, ny) == CIGARETTES){
            this.set(-50);
        }
        else if(_grid.get(nx,ny) == PRISONER){
            this.set(10);
        }
        
    }//end setScore


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
        this.insert(x, y);
    },

    // fügt der Schlange ein neues Element hinzu, indem dieses mit unshift an ERSTER Stelle im Array eingefügt wird --> FIFO
    this.insert = function (x, y) {
        this._queue.unshift({x:x, y:y});
        this.last = this._queue[0];
    },

    // Gibt das erste Element des Arrays (also der Schlangenschwanz) zurück
    this.remove =function () {
        return this._queue.pop();
    }
}//end PSnake

Snake.Models.Collectibles = function () {
    
    var _counter; // erhöht sich beim Einsammeln eines Prisoners
    // var _cnt = 1;

    /*
    this.collectibleAction = function (_coll){
        switch(_coll){
            case "PRISONER":
                _score.set(10);
                _counter++;
                console.log(_score.get());
                // ...automatisch ein neu einzusammelndes Prisoner-Collectible gesetzt
                _collectibles.setPrisoner(_grid);

                _collectibles.setCounter(_counter);
        }


    }*/
    
    
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
        
    }//end setCollectibles

    //generiert ein zufälliges Item und gibt es zurück
    this.generateRandomItem = function () {
        var r = Math.floor((Math.random()*2)+4);
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
