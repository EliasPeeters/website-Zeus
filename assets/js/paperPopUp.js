let popUp = document.getElementsByClassName('paperPopUp')[0];

function openPaperPopUp(event, element, name) {
    let windowWidth = window.innerWidth;
    popUp.style.display = 'block';
    let left = document.getElementsByClassName(element)[0].offsetLeft;
    
    if (left + 230 > windowWidth) {
        popUp.style.right = '20px';
    } else {
        popUp.style.left = (left - 5) + 'px';
    }

    
    popUp.style.top = (document.getElementsByClassName(element)[0].offsetTop - 5) + 'px';
    document.getElementsByClassName('paperPopUpTitle')[0].innerHTML = 'Title: ' + name;
    let heightPopUp = document.getElementsByClassName('popUp')[0].clientHeight;
    popUp.style.height = heightPopUp + 'px';
    
    //alert(event.clientX)
}

function closePaperPopUp(desktopOnly = false) {
    if (desktopOnly && window.innerWidth < 600) {
        return;
    }

    popUp.style.display = 'none';    
}