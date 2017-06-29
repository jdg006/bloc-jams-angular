(function() {
     function timecode() {
         return function(seconds) {
           var seconds = Number.parseFloat(seconds);
           if (Number.isNaN(seconds)) {
       return '-:--';
   }

           var minutes= Math.floor(seconds/60);
           var secondsTens= Math.floor((seconds%60)/10);
           var secondsOnes= Math.floor((seconds%60)%10);
           return minutes+":"+secondsTens+secondsOnes;
         };
     }

     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();
