Snake.Levels= {};

//Eigenschaften der einzelnen Level
Snake.Levels.Level = function () {
    
    var _speed = 0;
    var _id;
    var _img;
    
    this.getId = function () {
        return _id;
    }//end getId
    
    this.setId = function (id) {
        _id = id;
    }//end setId
    
    
    //setzt fps in Abhängigkeit der Level über eine ID
    this.setSpeed = function(_id){
        
        //über Id wird die Geschwindigkeit reguliert
        if(_id == 1){
            _speed = 5;
        }
        else if(_id == 2){
            _speed = 7;
        }
        else if(_id == 3){
            _speed = 9;
        }
    }//end setSpeed
    
    //gibt die akutelle Geschwindigkeit zurück
    this.getSpeed = function () {
        return _speed;
    }//end getSpeed
}
