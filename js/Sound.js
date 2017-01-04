/**
 * Created by Thomas on 03.01.2017.
 */
Snake.Sound = {};

Snake.Sound.Soundregister = function(){

   /* //Pfadbeginn als String
    var filePath = "sfx/"
    // Sound Variablen (als Manifest) für Zuordnung zu Soundtrack
    var soundFiles = [
        {src: "level_1.mp3", id: "level1"},
        {src: "level_2.mp3", id: "level2"},
        {src: "level_3.mp3", id: "level3"},

        {src: "menu.mp3", id: "menu"},
        {src: "gooditem.mp3", id: "goodItem" },
        {src: "baditem.mp3", id: "badItem"},
        {src: "keyitem.mp3", id: "keyItem"},
        {src: "winning.mp3", id: "winning"},
        {src: "gameover.mp3", id: "badItem"}
    ];*/

    this.playAndLoad = function (file) {

        //EventListener hinzufügen, wenn Dateien geladen sind
        createjs.Sound.addEventListener("fileload", playSound);
        createjs.Sound.registerSound("sfx/"+file);
    }
     // Function zum abspielen des Sounds
    function playSound (event) {

        createjs.Sound.play(event.src);

    }

    // Stop den kompletten Sound
    this.stop = function () {
        createjs.Sound.stop();
    }

}