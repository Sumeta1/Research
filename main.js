
button = document.getElementById("button");
show = document.getElementById("show");
hide = document.getElementById("hide");
text = document.getElementsByClassName("text");
items = document.getElementsByClassName("item");


search = document.getElementById("search_but");
menu = document.getElementById("menu_but");

policy = document.getElementById("policy");
terms = document.getElementById("terms");
MENU_BAR = document.getElementById("menu_bar");

searchpanel = document.getElementById("search_panel");
search_input = document.getElementById("search_input");

const list_of_items = ["Google scholar", "Jstor", "Deepdyve", "BASE", "DOAJ", "ERIC"]

hide_menubar();

let is_shown = true;

let is_clicked = false;
button.addEventListener("click", function(){9
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


var menu_img = "menu.png";
var close_img = "close.png";
var is_menu = false;
menu.addEventListener("click", function(){
    if (!is_search) {
        if (is_menu) {
            menu.src = menu_img;
            menu.style.transform = "translateX(0px)";
            is_menu = false
            hide_menubar();
        }else {
            menu.classList.add('menu');
            menu.src = close_img;
            search.style.opacity = "0";
            menu.style.transform = "translateX(-130px) rotateZ(360deg)";
            is_menu = true
            show_menubar();
        };
    }else {//means the search button was tap twice
        menu.style.opacity = "1";
        search.style.transform = "translateX(0px)";
        search.src = "s.png"
        //searchpanel.style.display = "none";
        searchpanel.style.top = "-100px";
        is_search = false;
        search_input.value = "";
    }
});

menu.addEventListener('transitionend', () => {
    menu.classList.remove('menu');
    terms.children[1].style.whiteSpace = "wrap";
    policy.children[1].style.whiteSpace = "wrap";
    if (!is_menu) {
        search.style.opacity = "100";
    }else{
        show_copyright();
    };
});

policy.addEventListener("mouseover", function(){
    policy.style.background = "cyan";
    policy.children[1].style.color = "black";
    policy.children[0].src = "policyb.png";
});
policy.addEventListener("mouseout", function(){
    policy.style.background = "none";
    policy.children[1].style.color = "white";
    policy.children[0].src = "policyw.png";
});

terms.addEventListener("mouseover", function(){
    terms.style.background = "cyan";
    terms.children[1].style.color = "black";
    terms.children[0].src = "termsb.png";
});
terms.addEventListener("mouseout", function(){
    terms.style.background = "none";
    terms.children[1].style.color = "white";
    terms.children[0].src = "termsw.png";
});

function show_menubar() {
    //MENU_BAR.style.display = "flex";
    MENU_BAR.style.width = "180px";
    terms.children[1].style.whiteSpace = "nowrap";
    policy.children[1].style.whiteSpace = "nowrap";
};
function hide_menubar() {
    //MENU_BAR.style.display = "none";
    MENU_BAR.style.width = "0px";
    for (let i = 0; i < MENU_BAR.children[1].children.length; i++) {
        MENU_BAR.children[1].children[i].style.opacity = "0"
    };
    terms.children[1].style.whiteSpace = "nowrap";
    policy.children[1].style.whiteSpace = "nowrap";
};

function show_copyright() {
    for (let i = 0; i < MENU_BAR.children[1].children.length; i++) {
        MENU_BAR.children[1].children[i].style.opacity = "1"
    };
};

let is_search = false;
search.addEventListener("click", function() {
    if (!is_menu) {
        if (!is_search){
            menu.style.opacity = "0";
            search.style.transform = "translateX(40px)";
            search.src = "close.png";
            //searchpanel.style.display = "block";
            searchpanel.style.top = "0px";
            searchpanel.children[0].value = "";
            is_search = true;
        };
    };
});


function Search(word) {
    list_of_match = [];
    if (word == "") {return []};
    var query = word;
    for (const item of list_of_items) {
        for (let i = 0; i < item.length; i++) {
            let match_num = 0;
            let first_match;
            for (let j = 0; j < query.length; j++) {
                if (i < item.length - match_num) {
                    if (item[i + match_num].toLowerCase() == query[j].toLowerCase()) {
                        match_num += 1;
                    };
                }else {//means matched at the last letter
                    if (query.length == 1) {
                        if (item[i + match_num].toLowerCase() == query[j].toLowerCase()) {
                            match_num += 1;
                        };
                    };
                };
            };
            if (match_num == query.length) {
                list_of_match.push(item);
                break;
            };
        };
    };
    //console.log(list_of_match);
    return list_of_match;
};

function add_div() {
    const newelem = document.createElement("div");
    newelem.id = "temp";
    newelem.innerHTML = "<p>try searching Research...</p>";
    return newelem;
};

search_input.addEventListener("input", function() {
    matching_item = Search(search_input.value);
    let children = searchpanel.children.length;
    if (matching_item.length == 0) {
        for (let i = 0; i < children; i++) {
            if (i > 0) {
                searchpanel.removeChild(searchpanel.children[1]);
            };
            //console.log(searchpanel.children.length); 
        };
        searchpanel.appendChild(add_div());
        //searchpanel.innerHTML = "<input id='search_input' type='search' placeholder='Search'>"  + "<div id='temp'><p>try searching Journals...</p></div>"
    }else {
        let list_of_elements = [];
        for (const item of matching_item) {
            value = "<p>" + item + "</p>";
            const newelement = document.createElement("div");
            newelement.innerHTML = value;
            list_of_elements.push(newelement);
        };
        
        for (let i = 0; i < children; i++) {
            if (i > 0) {
                searchpanel.removeChild(searchpanel.children[1]);
            };
        };
        for (const element of list_of_elements) {
            searchpanel.appendChild(element);
        };
        //searchpanel.innerHTML = "<input id='search_input' type='search' placeholder='Search'>" + value;
    };
    //console.log(search_input.value);
    for (const child of searchpanel.children){//responsible for scrolling to the item in the searchbar.
        if (child.id == ""){
            child.addEventListener("click", function(){
                const index = list_of_items.indexOf(child.children[0].innerHTML);
                window.scrollTo({
                    top: items[index].children[0].getBoundingClientRect().top + window.scrollY - 100,
                    behavior: 'smooth'
                });
            });
            child.addEventListener("mouseover", function(){
                this.style.background = "cyan";
                this.children[0].style.color = "black";
            });
            child.addEventListener("mouseout", function () {
                this.style.background = "none";
                this.children[0].style.color = "grey";
            })
        };
    };
});



