// MVC-Klasse Model
Snake.Models = {};
    
//Logik der Schlange

Snake.Models.Grid = {
    
    
    width: null,
    heigth: null,
    _grid: null,

    // initialisiert das Spielfeld Grid
    init: function (d, c, r) {
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
    set: function (val, x, y) {
        this._grid[x][y] = val;
    },

    // Getter-Methode, um von außerhalb auf das Grid zuzugreifen
    get: function (x, y) {
        return this._grid[x][y];
    }
}//end Grid

//
Snake.Models.PSnake = {

    direction: null, // Laufrichtung der Schlange
    last: null, // Pointer auf das letzte Element der Schlange
    _queue: null, // Array der Schlange als FIFO Queue

    //
    init: function (d, x, y) {
       this.direction = d;
        this._queue = [];
        this.insert(x, y);
    },

    // fügt der Schlange ein neues Element hinzu, indem dieses mit unshift an ERSTER Stelle im Array eingefügt wird --> FIFO
    insert: function (x, y) {
        this._queue.unshift({x:x, y:y});
        this.last = this._queue[0];
    },

    // Gibt das erste Element des Arrays (also der Schlangenschwanz) zurück
    remove: function () {
        return this._queue.pop();
    }
}//end PSnake

// Setzt ein einzusammelndes Schlangenelement auf das Spielfeld
function setPrisoner() {

    // Array-Variable für alle leeren Felder
    var empty = [];
    // Schleife zum Durchlauf über das gesamte Spielfeld
    for(var x = 0; x < Snake.Models.Grid.width; x++){
        for(var y = 0; y < Snake.Models.Grid.heigth; y++){
            // Über Setter-Methode wird abgeglichen ob jeweilige Position leer ist
            if(Snake.Models.Grid.get(x, y) == EMPTY){
                // wenn ja, wird Position ins Array gepusht
                empty.push({x:x, y:y});
            }
        }

    }

    // Randomizer geht durch alle leeren Felder
    var randpos = empty[Math.floor(Math.random()*empty.length)];
    // Über Setter-Methode wird ein Prisoner an eine zufällige leere Positon gesetzt
    Snake.Models.Grid.set(PRISONER, randpos.x, randpos.y);
}//end setPrisoner