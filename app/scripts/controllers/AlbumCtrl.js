(function() {
     function AlbumCtrl() {
      this.songData = angular.copy(albumPicasso);
      this.songItem=[];
      for (var i=0; i <this.songData.songs.length ; i++) {
          this.songItem.push(this.songData.songs[i]);
      }
     }
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();
