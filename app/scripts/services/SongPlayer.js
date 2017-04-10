 (function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
         
         /**
         * @desc currentAlbum selected
         * @type {Object}
         */
          var currentAlbum = Fixtures.getAlbum();

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
                stopSong();
             }    
             
            currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });
                 
            SongPlayer.currentSong = song;
         };
         
        /**
         * @function stopSong
         * @desc stops current song
         */
         
         var stopSong = function(){
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         };
         
         /**
         * @function getSongIndex
         * @desc Gets the index of the current song
         * @param {Object} song
         */
         
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
            };
         
         /**
         * @desc holds the currently playing song 
         * @type {Object}
         */
          SongPlayer.currentSong = null;
         
         
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
        * @desc Play current or new song
        * @param {Object} song
        */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
         } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
     }    
};
    
     /**
     * @function SongPlayer.pause
     * @desc Pauses current song
     * @param {Object} song
     */
         
     SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
         currentBuzzObject.pause();
         song.playing = false;
 };
          /**
     * @function SongPlayer.previous
     * @desc plays previous song
     */
         
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
         if (currentSongIndex < 0) {
            stopSong();
      } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
         
          /**
         * @function SongPlayer.next
         * @desc plays next song
         */
         SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
     
 };
          
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();