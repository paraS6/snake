// MVC-Klasse Model
Snake.Models = {};
    
//Logik der Schlange

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


// Setzt ein einzusammelndes Schlangenelement auf das Spielfeld
    this.setPrisoner = function (grid){
        
        var _grid = grid;
        // Array-Variable für alle leeren Felder
        var empty = [];
        // Schleife zum Durchlauf über das gesamte Spielfeld
        for (var x = 0; x < _grid.width; x++) {
            for (var y = 0; y < _grid.heigth; y++) {
                // Über Setter-Methode wird abgeglichen ob jeweilige Position leer ist
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
}//end Snake.Models.Collectibles