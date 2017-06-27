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
          SongPlayer.currentAlbum = Fixtures.getAlbum();

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
      * @function stopSong
      * @desc stops currentBuzzObject and sets SongPlayer.currentSong.playing to "null"
      */
     var stopSong = function(){
       currentBuzzObject.stop();
     SongPlayer.currentSong.playing = null;
     };

     /**
      * @function setSong
      * @desc Stops currently playing song and loads new audio file as currentBuzzObject
      * @param {Object} song
      */
     var setSong = function(song) {
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
       * @function getSongIndex
       * @desc gets the index of the currently selected song
       * @param {Object} song
       *@return returns the index of the currently selected song
       */
      var getSongIndex = function(song) {
     return SongPlayer.currentAlbum.songs.indexOf(song);
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
* @desc decrements the song index by one and plays the previous song in the queue
*
*/
 SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
     if (currentSongIndex < 0) {
         currentSongIndex= SongPlayer.currentAlbum.songs.length-1;
         var song= currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     else {
           var song = SongPlayer.currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
 };
 /**
* @function SongPlayer.next
* @desc increments the song index by one and plays the next song in the queue
*
*/
 SongPlayer.next = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex++;
     if (currentSongIndex > SongPlayer.currentAlbum.songs.length-1) {
       currentSongIndex=0;
       var song = SongPlayer.currentAlbum.songs[currentSongIndex];
       setSong(song);
       playSong(song);

       }
     else {
           var song = SongPlayer.currentAlbum.songs[currentSongIndex];
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
