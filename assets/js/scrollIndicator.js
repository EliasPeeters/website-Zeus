let scrollInFill = document.getElementsByClassName('scrollIndicatorFill')[0];

function fillScrollIndicator(scroll) {
    var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    scrollInFill.style.width = ((scroll/(limit - window.innerHeight))*100) + '%'
}

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    //document.getElementById('navigationBar').style.color = 'white';
    fillScrollIndicator(scroll)
});    