
window.alert("Welcome to PrisonSnake! Start game");
var stage = new createjs.Stage("myCanvas");
var playingfieldImg = new createjs.Bitmap("img/dummyGround.jpg");

function start() {
    var field = new ParaS6.views.PlayingFieldView();
    field.drawPlayingField();

}

//NameSpacing ParaS6 (= Package, to avoid name conflicts)
var ParaS6 = {
    
    models : {

        PlayingField: function (level, levelSpeed) {
            var _level = level;         //Andeuten der einzuhaltenden Privatheit durch Codekonvention: _name
            var _levelSpeed = levelSpeed;
            this.getLevel = function () { return _level;};
            this.setLevel = function (newLevel) { return _level = newLevel; };
            this.getLevelSpeed = function () {return _levelSpeed;};
            this.setLevelSpeed = function (newLevelSpeed) {return _levelSpeed = newLevelSpeed; };
        },
        PrisonSnake: function () {

        }
    },
    
    views: {
        
        PlayingFieldView: function () {
            this.drawPlayingField = function () {
                stage.addChild(playingfieldImg);
                stage.update();
            };
            this.updatePlayingField = function () {
            };
        },
        PrisonSnakeView: function () {
        }
    }
};