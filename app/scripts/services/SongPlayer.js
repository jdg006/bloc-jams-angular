(function() {
     function SongPlayer() {
       /**
       * @desc songPlayer object
       * @type {Object}
       */
          var SongPlayer = {};

          /**
          * @desc currentSong boolean
          * @type {boolean}
          */
          var currentSong = null;
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
             currentSong.playing = null;
         }

         currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });

         currentSong = song;
      };

      /**
       * @function SongPlayer.play
       * @desc if the song selected is not the currently playing song then setSong() and playSong() are called.
        If the song selected is the currently playing song then the currentBuzzObject is paused and song.playing
        is set to false.
       * @param {Object} song
       */
          SongPlayer.play = function(song) {
            if (currentSong !== song) {
             setSong(song);
             playSong(song);
           }
            else if (currentSong === song) {
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
       currentBuzzObject.pause();
       song.playing = false;
 };
          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
