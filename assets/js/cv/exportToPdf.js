function exportAsPDF() {
    var fadeElements = document.getElementsByClassName('scrollFade');
    for (let i = 0; i < fadeElements.length; i++) {
        fadeElements[i].style.opacity = 1;
    }
    var element = document. getElementById('cv');
    var opt = { margin: 0,
        filename: 'elias_peeters_cv.pdf',
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', pagesplit: true }
    };
    html2pdf().from(element).set(opt).save();

    setTimeout(function() {
        window.location.href = '/cv'
    }, 3000);
}

exportAsPDF()