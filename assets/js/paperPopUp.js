let popUp = document.getElementsByClassName('paperPopUp')[0];

function openPaperPopUp(event, element, name, elements, url) {
    let windowWidth = window.innerWidth;
    popUp.style.display = 'block';
    let left = document.getElementsByClassName(element)[0].offsetLeft;
    
    if (left + 330 > windowWidth) {
        popUp.style.right = '20px';
    } else {
        popUp.style.left = (left - 5) + 'px';
    }
    console.log(elements)

    popUp.style.top = (document.getElementsByClassName(element)[0].offsetTop - 5) + 'px';
    document.getElementsByClassName('paperPopUpTitle')[0].innerHTML = name;

    
    let popUpContentInnerHTML = '';
    for (let element in elements) {
        popUpContentInnerHTML += `<p>${elements[element]}</p>`
    }
    if (url != "undefined") {
        popUpContentInnerHTML += `<button class="buttonPopUp" onclick="openInNewTab('${url}')">Go To Website</button>`
    }
    
    document.getElementsByClassName('popUpContent')[0].innerHTML = popUpContentInnerHTML;
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