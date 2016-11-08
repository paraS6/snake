
var stage = new createjs.Stage("myCanvas");
const WIDTH = stage.canvas.width - 300; //Breite vom Spielfeld
const HEIGHT = stage.canvas.height - 100;   // Hoehe vom Spielfeld
const CELL = 20;    //Zellengroesse
var grid = new Array((WIDTH/CELL)*(HEIGHT/CELL));
const EMPTY = 0;  //leeres Feld
const SNAKE_MEMBER = 1;    //Felder von Schlange besetzt
var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");

function start() {
    var field = new ParaS6.views.PlayingFieldView();
    field.drawPlayingField();

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
            this.randomStart = function () {
            }
        }
    },

    Views: {

        PlayingFieldView: function () {
            this.drawPlayingField = function () {
                stage.addChild(playingfieldImg);
                stage.update();
            };
            this.updatePlayingField = function () {
            };
        },
        PrisonSnakeView: function () {
            this.drawSnake = function () {

            }
        }
    }
};