let mobileState;
let cvImage = document.getElementsByClassName('imageCVPortrait')[0];

function loadImages(state) {
    if (state) {
        // moible
        cvImage.src = 'assets/images/portraits/withCapMobile2.png';
        cvImage.classList.add('mobileImage')
        cvImage.classList.remove('desktopImage')
    } else {
        // desktop
        let image = Math.round(Math.random() * 3) + 1

        cvImage.src = `/assets/images/portraits/portrait${image}.png`;
        cvImage.classList.add('desktopImage')
        cvImage.classList.remove('mobileImage')
    }
}

function getState() {
    if (window.innerWidth > 600) {
        return false;
    } else {
        return true;
    }
}

window.addEventListener('resize', () => {
    let newState = getState();
    if (newState != mobileState) {
        loadImages(newState);
        mobileState = newState;
    }
});

loadImages(getState());