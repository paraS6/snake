//MVC-Klasse Views
Snake.Views = {};

// Zeichnet das Spielfeld
Snake.Views.PlayingFieldView = function () {
        this.drawPlayingField = function () {
            // fügt angegegebens Bild zur Stage hinzu
            stage.addChild(playingfieldImg);

        };
        this.updatePlayingField = function () {
        };
    };

// Zeichnet alles Schlangenelemente
Snake.Views.PrisonSnakeView = function () {
        var head = new createjs.Shape();

        this.drawSnake = function (grid) {
            // durchläuft das Array und zeichnet beim Unique Value '2' den Schlangenkopf
            for(var i = 0; i< grid.length; i++){
                for(var j = 0; j< grid.length; j++){
                    if(grid[i][j] == 2){
                        dummy.x=j*CELL;
                        dummy.y=i*CELL;
                        stage.addChild(dummy);
                    }
                }
            }
        }
    };
