// MVC-Klasse Controls
Snake.Controlls = {};

        // verarbeitet die Interaktionen des Nutzers
        Snake.Controlls.GameController=function() {
            this.gameLoop = function () {
                stage.update();
            };

            // übersetzt keyInput in direction
            this.keyInput = function(event){
                // in Bearbeitung...
                var prisonSnake = new Snake.Models.PrisonSnake();
                // default-Wert für direction bei Start
                var direction = "right";

                switch(event.keyCode) {
                    case KEYCODE_LEFT:
                        direction = "left";
                        break;
                    case KEYCODE_RIGHT:
                        direction = "right";
                        break;
                    case KEYCODE_UP:
                        direction = "up";
                        break;
                    case KEYCODE_DOWN:
                        direction = "down";
                        break;
                    return direction;
                }
                
            };
        }
    
