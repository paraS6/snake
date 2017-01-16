Snake.Sound = {};

Snake.Sound.Soundregister = function(){

    //Pfadbeginn als String
    var filePath = "sfx/";
    // Sound Variablen (als Manifest) für Zuordnung zu Soundtrack
    var soundFiles = [
        {src: "level_1.mp3", id: "level1"},
        {src: "level_2.mp3", id: "level2"},
        {src: "level_3.mp3", id: "level3"},

        {src: "menu.mp3", id: "menu"},
        {src: "good_item.wav", id: "goodItem" },
        {src: "bad_item.wav", id: "badItem"},
        {src: "key.mp3", id: "key"},
        {src: "win.mp3", id: "winning"},
        {src: "winning_complete.mp3", id: "winning_complete"},
        {src: "gameover_sound.mp3", id: "gameover_sound"},
        {src: "gameover_song.mp3", id: "gameover_song"}
    ];
    //Sounds müssen registriert werden bevor sie abgespielt werden können
    createjs.Sound.registerSounds(soundFiles, filePath);

    //Funktion zum Abspielen der Sounds
    this.playAndLoad = function (file) {
            createjs.Sound.play("sfx/"+file);
    };//end playAndLoad

    // Stopep alle Sounds
    this.stop = function () {
        createjs.Sound.stop();
    };//end Stop

};//end Snake.Sound.Soundregister