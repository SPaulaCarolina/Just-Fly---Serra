$(window).on('load',function () {    
        $("#title").fadeIn(2000).fadeOut(1000, function() {
               $("#formWelcome").show() 
        });
});

$("#btnWelcome").on("click", function () {
        let userName=document.getElementById('userName');
        sessionStorage.setItem('name',userName.value);
});