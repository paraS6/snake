var stage = new createjs.Stage("myCanvas");

var SNAKE_HEAD = 2;//Schlangenkopf
const WIDTH = stage.canvas.width - 300; //Breite vom Spielfeld
const HEIGHT = stage.canvas.height - 100;   // Hoehe vom Spielfeld
const CELL = 50;    //Zellengroesse
var EMPTY = 0;  //leeres Feld

const SNAKE_BODY = 1;

//graphics
var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");
var dummy = new createjs.Bitmap("img/chara_dummy1.png");

//global namespace
var Snake = Snake || {};//NameSpacing ParaS6 (= Package, to avoid name conflicts)

function start() {
    //kreiere 2D Array
    var grid = new Array(WIDTH/CELL);
    for(var i = 0; i < WIDTH/CELL; i++)
        grid[i] = new Array(HEIGHT/CELL);

    var field = new Snake.Views.PlayingFieldView();
    var prisonSnake = new Snake.Models.PrisonSnake();
    var prisonSnakeView = new Snake.Views.PrisonSnakeView();
    //Startsetting
    prisonSnake.startCoords(grid);
    field.drawPlayingField();
    prisonSnakeView.drawSnake(grid);
    stage.update();
}