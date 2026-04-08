        var audioElement;
        var srcFile;
        $(document).ready(function() {
            audioElement = document.createElement('audio');

            audioElement.setAttribute('src', 'images/sample_audio_clip.mp3');

            $.get();
            var count = 0;
            $('.cont').click(function() {
                 count=0;
                 var duration = audioElement.duration;
                 var currentTime1 = audioElement.currentTime;
                 var tempSLi = $('.sliderline').width()/duration;
                 
                audioElement.addEventListener("timeupdate", progressBar, true);

                function progressBar(e)
                {
                     var currentStep = tempSLi * Number(e.target.currentTime);
                    console.log(e.target.currentTime,currentStep);
                    $('.sliderdot').css('left', currentStep+'%');
                }
                var cont = $(this).attr('class');
                if(cont == 'cont play'){
                    console.log('cont play');
                    $(this).removeClass( "cont play" ).addClass( "cont pause" );
                    $(".replay").removeClass( "replay active" ).addClass( "replay inactive" );
                     audioElement.play();
                }
                if(cont == 'cont pause'){
                    console.log('cont pause');
                    $(this).removeClass( "cont pause" ).addClass( "cont play" );
                     audioElement.pause();
                }
            });

            $('.replay').click(function() {
                 $(".replay").removeClass( "replay active" ).addClass( "replay inactive" );
                 $('.cont').removeClass( "cont play" ).addClass( "cont pause" );
                 audioElement.play();
            });
                
            $(audioElement).bind("ended", function(){ 
                $(".replay").removeClass( "replay inactive" ).addClass( "replay active" );
                $('.cont').removeClass( "cont pause" ).addClass( "cont play" );
                $('.sliderdot').css('left','0');
                count=0;

             });        

        });