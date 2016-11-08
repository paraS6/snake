
var stage = new createjs.Stage("myCanvas");

var SNAKE_HEAD = 2;
const WIDTH = stage.width - 300; //Breite vom Spielfeld
const HEIGHT = stage.height - 100;   // Hoehe vom Spielfeld
const CELL = 20;    //Zellengroesse
var EMPTY = 0;  //leeres Feld
    //Schlangenkopf
const SNAKE_BODY = 1;

var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");

function start() {
    //kreiere 2D Array
    var grid = new Array(35);
    for(var i = 0; i < 35; i++)
        grid[i] = new Array(20);

    var field = new Snake.Views.PlayingFieldView();
    var prisonSnake = new Snake.Models.PrisonSnake();
    var prisonSnakeView = new Snake.Views.PrisonSnakeView();
    //Startsetting
    prisonSnake.startCoords(grid);
    field.drawPlayingField();
    prisonSnakeView.drawSnake(grid);
    stage.update();
}

//NameSpacing ParaS6 (= Package, to avoid name conflicts)
var Snake = {

    Controlls : {
        GameController: function() {
            this.gameLoop = function () {
                stage.update();
            };
        }
    },

    Models : {

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
                window.alert(grid.length);
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
                            head.graphics.beginFill("green").drawRect(i*CELL, j*CELL, CELL, CELL);
                            stage.addChild(head);
                        }
                    }
                }
            }
        }
    }
};