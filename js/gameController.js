
/*var stage = new createjs.Stage("myCanvas");

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
*/


//sub namespacing
Snake.Controlls = {};

        Snake.Controlls.GameController = function() {
            this.gameLoop = function () {
                stage.update();
            };
        }



    /*Models : {

        PlayingField: function (level, levelSpeed) {
            var _level = level;         //Andeuten der einzuhaltenden Privatheit durch Codekonvention: _name
            var _levelSpeed = levelSpeed;
            this.getLevel = function () { return _level;};
            this.setLevel = function (newLevel) { return _level = newLevel; };
            this.getLevelSpeed = function () {return _levelSpeed;};
            this.setLevelSpeed = function (newLevelSpeed) {return _levelSpeed = newLevelSpeed; };
        },
        PrisonSnake: function () {
            this.startCoords = function (grid) {
                for(var i = 0; i< grid.length; i++){
                    for(var j = 0; j< grid.length; j++){
                        grid[i][j]= EMPTY;
                    }
                }
                //Set Head
                grid[5][5]= SNAKE_HEAD;
            }
        }
    },

    Views: {

        PlayingFieldView: function () {
            this.drawPlayingField = function () {
                stage.addChild(playingfieldImg);
                
            };
            this.updatePlayingField = function () {
            };
        },
        PrisonSnakeView: function () {
            var head = new createjs.Shape();
            
            this.drawSnake = function (grid) {
                for(var i = 0; i< grid.length; i++){
                    for(var j = 0; j< grid.length; j++){
                        if(grid[i][j] == 2){
                            //draw head
                            //head.graphics.beginFill("green").drawRect(i*CELL, j*CELL, CELL, CELL);
                            dummy.x=j*CELL;
                            dummy.y=i*CELL;
                            stage.addChild(dummy);
                        }
                    }
                }
            }
        }
    }*/
