(function() {
     function SongPlayer(Fixtures) {
       /**
       * @desc songPlayer object
       * @type {Object}
       */
          var SongPlayer = {};
        /**
         * @desc currentAlbum object
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
     /**
      * @function playSong
      * @desc plays currentBuzzObject and sets song.playing to "true"
      * @param {Object} song
      */
     var playSong = function(song){
       currentBuzzObject.play();
       song.playing = true;
     };

     /**
      * @function setSong
      * @desc Stops currently playing song and loads new audio file as currentBuzzObject
      * @param {Object} song
      */
     var setSong = function(song) {
         if (currentBuzzObject) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         }

         currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });

         SongPlayer.currentSong = song;
      };

      /**
       * @function getSongIndex
       * @desc gets the index of the currently selected song
       * @param {Object} song
       *@return returns the index of the currently selected song
       */
      var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
   };

      /**
      * @desc Activate song object from list of songs
      * @type {object}
      */
      SongPlayer.currentSong = null;

      /**
       * @function SongPlayer.play
       * @desc if the song selected is not the currently playing song then setSong() and playSong() are called.
        If the song selected is the currently playing song then the currentBuzzObject is paused and song.playing
        is set to false.
       * @param {Object} song
       */
          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);
           }
            else if (SongPlayer.currentSong === song) {
           if (currentBuzzObject.isPaused()) {
               playSong(song);
           }
       }
     };
      /**
     * @function SongPlayer.pause
     * @desc pauses currentBuzzObject and sets song.playing to false
     * @param {Object} song
     */
     SongPlayer.pause = function(song) {
       song = song || SongPlayer.currentSong;
       currentBuzzObject.pause();
       song.playing = false;
 };
 /**
* @function SongPlayer.previous
* @desc gets the index of the song prior to the currently playing song and sets the song index to the previous song
*
*/
 SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
     if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       }
     else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
 };
          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
