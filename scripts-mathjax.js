MathJax = {
    tex: {
        macros: {
            d: "\\mathop{}\\!\\mathrm{d}", // diferencial odvoda
            p: "\\mathop{}\\!\\partial" // delta delnega odvoda
        },
        tags: 'ams'
    },
    chtml: {
        displayOverflow: 'linebreak',  // za display enačbe
        linebreaks: {
            inline: true,      // avtomatični prelom za inline enačbe
            width: '100%',     // širina za prelom
            lineleading: 0.2   // razmik med vrsticami
        }
    },
    svg: {
        displayOverflow: 'linebreak',
        linebreaks: {
            inline: true,      // avtomatični prelom za inline enačbe
            width: '100%',     // širina za prelom
            lineleading: 0.2   // razmik med vrsticami
        }
    }
}   
