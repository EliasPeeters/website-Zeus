document.getElementsByClassName('switchItemLeft')[0].addEventListener('click', ()=> {
    switchPressed('left')
})

document.getElementsByClassName('switchItemRight')[0].addEventListener('click', ()=> {
    switchPressed('right')
})

function switchPressed(side) {
    let switchElement = document.getElementsByClassName('cvSwitch')[0];
    let sortedByTime = document.getElementsByClassName('sortedByTime')[0];
    let cvSortedByCategory = document.getElementsByClassName('cvSortedByCategory')[0];

    if (side == 'left') {
        switchElement.classList.add('switchLeft');
        switchElement.classList.remove('switchRight');
        cvSortedByCategory.classList.add('visible');
        sortedByTime.classList.remove('visible');
    } else {
        switchElement.classList.add('switchRight');
        switchElement.classList.remove('switchLeft');
        sortedByTime.classList.add('visible');
        cvSortedByCategory.classList.remove('visible');
    }

    fadeAllElements(window.scrollY)
}