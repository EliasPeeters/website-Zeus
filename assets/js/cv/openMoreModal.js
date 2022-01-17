// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

let lastOpened = -1;
let contentBefore = '';
let heigthBefore = 0;

function openMoreModal(id, content) {

    // check, if current modal is already opened
    if (id == lastOpened) {
        closeMoreModal();
        return;
    }


    // disableScroll();
    let allCVBlocks = document.getElementsByClassName('cvBlock');
    let blackBackground = document.getElementsByClassName('blackBackground')[0];
    let moreContent = document.getElementsByClassName(`moreContent${id}`)[0];
    let cvBlockContent = document.getElementsByClassName('cvBlockContent')[id];


    contentBefore = cvBlockContent.innerHTML;

    cvBlockContent.classList.add('hidden');
    setTimeout(() => {
        cvBlockContent.innerHTML = content;
        cvBlockContent.classList.remove('hidden');
        allCVBlocks[id].classList.add('cvBlockOpen');
    }, 300);

    // allCVBlocks[id].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    
    allCVBlocks[id].classList.add('cvBlockOpen2');

    heigthBefore = allCVBlocks[id].clientHeight - 60;

    // width
    let width = window.innerWidth;
    // allCVBlocks[id].style.marginLeft = marginLeft;
    // allCVBlocks[id].style.width = (width*0.6) + 'px';
    
    blackBackground.style.opacity = '1'
    blackBackground.classList.add('visible')

    // start animation depending on screen width
    if (width > 1200) {
        allCVBlocks[id].style.animation="openMoreLarge 300ms ease-in-out forwards";
    } else {
        allCVBlocks[id].style.animation="openMoreSmall 300ms ease-in-out forwards";
    }
    
    lastOpened = id;
    setTimeout(() => {
        fadeAllElements();
    }, 300);

    document.getElementsByClassName(`cvMoreButtonText${id}`)[0].innerHTML = 'Close';
}

function closeMoreModal() {
    // enableScroll();
    

    let allCVBlocks = document.getElementsByClassName('cvBlock');
    let blackBackground = document.getElementsByClassName('blackBackground')[0];
    let moreContent = document.getElementsByClassName(`moreContent${lastOpened}`)[0];
    let cvBlockContent = document.getElementsByClassName('cvBlockContent')[lastOpened];

    // allCVBlocks[lastOpened].style.height = heigthBefore + 'px';
    allCVBlocks[lastOpened].classList.remove('cvBlockOpen');

    cvBlockContent.classList.add('hidden');
    
    setTimeout(() => {
        cvBlockContent.innerHTML = contentBefore;
        cvBlockContent.classList.remove('hidden');
    }, 300);

    
    // allCVBlocks[lastOpened].style.width = '70%'
    // allCVBlocks[lastOpened].style.marginLeft = '15%';

    let width = window.innerWidth;

    if (width > 1200) {
        allCVBlocks[lastOpened].style.animation="closeMoreLarge 300ms ease-in-out forwards";
    } else {
        allCVBlocks[lastOpened].style.animation="closeMoreSmall 300ms ease-in-out forwards";
    }


    blackBackground.style.opacity = '0'
    setTimeout(() => {
        fadeAllElements();
        
    }, 300);
    setTimeout(() => {
        blackBackground.classList.remove('visible');
        allCVBlocks[lastOpened].classList.remove('cvBlockOpen2');
        lastOpened = -1
    }, 600);

    document.getElementsByClassName('cvMoreButtonText')[0].innerHTML = 'More';
    
}