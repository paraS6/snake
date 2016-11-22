// MVC-Klasse Model
Snake.Models = {};
    
//Logik der Schlange

Snake.Models.Grid = {
    width: null,
    heigth: null,
    _grid: null,
    
    init: function (d, c, r) {
        this.width = c;
        this.heigth = r;

        this._grid = [];

        for(var x = 0; x < c; x++){
            this._grid.push([]);
            for(var y = 0; y < r; y++){
                this._grid[x].push(d);
            }
        }
    },
    set: function (val, x, y) {
        this._grid[x][y] = val;
    },
    
    get: function (x, y) {
        return this._grid[x][y];
    }
}
Snake.Models.PSnake = {
    direction: null,
    last: null,
    _queue: null,
    
    init: function (d, x, y) {
       this.direction = d;
        this._queue = [];
        this.insert(x, y);
    },
    insert: function (x, y) {
        this._queue.unshift({x:x, y:y});
        this.last = this._queue[0];
    },
    remove: function () {
        return this._queue.pop();
    }
}

function setPrisoner() {
    var empty = [];
    for(var x = 0; x < Snake.Models.Grid.width; x++){
        for(var y = 0; y < Snake.Models.Grid.heigth; y++){
            if(Snake.Models.Grid.get(x, y) == EMPTY){
                empty.push({x:x, y:y});
            }
        }

    }
    var randpos = empty[Math.floor(Math.random()*empty.length)];
    Snake.Models.Grid.set(PRISONER, randpos.x, randpos.y);
}