function isVisible() {
    console.log(window.innerHeight)
}

let shadowString = '5px 5px 15px rgba(0,0,0,0.7)';
let noFadeShadow = '5px 5px 15px rgba(0,0,0,0.2)'


function fadeAllElements(scroll) {
    var fadeElements = document.getElementsByClassName('scrollFade');
    var focusElements = document.getElementsByClassName('scrollFocus');
    var elements = [];
    for (let i = 0; i < fadeElements.length; i++) {
        var rect = fadeElements[i].getBoundingClientRect();
        //console.log(rect.top);
        //fadeElements[i].innerHTML = (rect.top - window.innerHeight + 100) + '.px' + (window.innerHeight + rect.top - 250) + ', ' + (rect.top)
        if (rect.top - window.innerHeight + 100 < 0) {
            fadeElements[i].style.opacity = 1;
            //console.log('now')
        } else {
            fadeElements[i].style.opacity = 0;
        }

        if (rect.bottom < 100) {
            fadeElements[i].style.opacity = 0;
        }
        //isVisible();
        //console.log(fadeElements[i].style.top)
    }
    let used = false;
    for (let i = 0; i < focusElements.length; i++) {
        var rect = focusElements[i].getBoundingClientRect();
        focusElements[i].style.boxShadow = noFadeShadow;
        if (rect.top > 50 && !used) {
            focusElements[i].style.boxShadow = shadowString;
            used = true;
            if (focusElements[i + 1].getBoundingClientRect().top == rect.top) {
                focusElements[i + 1].style.boxShadow = shadowString;
                i++;
            }
        }  
    }
    
}

fadeAllElements(0);

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    //document.getElementById('navigationBar').style.color = 'white';
    fadeAllElements(scroll)
});    
