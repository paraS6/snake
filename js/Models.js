// MVC-Klasse Model
Snake.Models = {};

//Logik der Schlange

Snake.Models.Grid = function(){

    width = null;
    heigth = null;
    _grid = null;

    //Spielfeld initialisieren
    this.init = function (d, colums, rows) {
        this.width = colums;
        this.heigth = rows;

        this._grid = [];

        for(var x = 0; x < colums; x++){
            //push() fügt ein oder mehrere Elemente am Ende eines Arrays hinzu
            this._grid.push([]);
            for(var y = 0; y < rows; y++){
                this._grid[x].push(d);
            }
        }
    };

    this.set = function (value, x, y) {
        this._grid[x][y] = value;
    };

    this.get =  function (x, y) {
        return this._grid[x][y];
    };
}//end Grid

Snake.Models.PrisonSnake = function(){
    direction =null;
    last = null;
    _queue = null;

    this.init = function (d, x, y) {
        this.direction = d;
        this._queue = [];
        this.insert(x, y);
    };
    this.insert = function (x, y) {
        //unshift() fügt ein oder mehrere Elemente am Anfang des Arrays hinzu
        this._queue.unshift({x:x, y:y});
        this.last = this._queue[0];
    };

    this.remove = function () {
        //pop() entfernt das letzte Element eines Arrays
        return this._queue.pop();
    };
}//end PSnake

Snake.Models.Collectibles = function () {


    this.setPrisoner = function(grid) {
        
        
        var empty = [];
        for(var x = 0; x < grid.width; x++){
            for(var y = 0; y < grid.heigth; y++){
                if(grid.get(x, y) == EMPTY){

                    empty.push({x:x, y:y});
                }
            }
    
        }
        var randpos = empty[Math.floor(Math.random()*empty.length)];
        
        grid.set(PRISONER, randpos.x, randpos.y);
    }//end setPrisoner

}