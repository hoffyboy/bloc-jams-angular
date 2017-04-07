 (function() {
     function SongPlayer() {
          var SongPlayer = {};
         
         /**
         * @desc holds the currently playing song in a variable
         * @type {Object}
         */
          var currentSong = null;
         
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
          var currentBuzzObject = null;
         
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
         var setSong = function(song){
             if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
             }    
             
            currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });
                 
            currentSong = song;
         };
         
          /**
        * @function playSong
        * @desc Start playing song and sets the variable 'playing' to true
        * @param {Object} song
        */
         var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
         };
         
        /**
        * @function SongPlayer.play
        * @desc if current playing song is not the selected song, stop playing current playing song and play the selected song
        * else if current paused/playing song is selected song and the currentBuzzObject is also paused, play currentBuzzObject
        * @param {Object} song
        */
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                setSong(song);
                playSong(song);
         } else if (currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
     }    
};
    
     /**
     * @function playSong
     * @desc Pauses currently playing song and sets the variable 'playing' to false
     * @param {Object} song
     */
         
     SongPlayer.pause = function(song) {
     currentBuzzObject.pause();
     song.playing = false;
 };
             
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();