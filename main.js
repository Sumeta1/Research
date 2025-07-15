
button = document.getElementById("button");
show = document.getElementById("show");
hide = document.getElementById("hide");
text = document.getElementsByClassName("text");

let is_shown = true

let is_clicked = false;
button.addEventListener("click", function(){
    if (!is_clicked){
        document.body.classList.add('clicked');
        is_clicked = true
    }else {
        if (!is_shown){
            for (let i = 0; i < text.length; i++){
                text[i].style.display = "none";
            }
        }else {
            for (let i = 0; i < text.length; i++){
                text[i].style.display = "block";
            }
        }
        document.body.classList.remove('clicked');
        is_clicked = false
    }
    /*setTimeout(()=> {
        document.body.classList.remove('clicked');
    }, 2000)*/
});

show.addEventListener("click", function(){
    is_shown = true;
    console.log("True");
});

hide.addEventListener("click", function(){
    is_shown = false;
    console.log("False")
});


