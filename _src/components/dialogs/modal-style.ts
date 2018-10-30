var customStyles: any;
if (window.outerWidth > 500) {
    customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            maxWidth              : '400px',
            transform             : 'translate(-50%, -50%)'
        }
    };
} else {
    customStyles = {
        content : {
            top     : 0,
            left    : 0,
            right   : 0,
            bottom  : 'auto',
        }
    };
}

export default customStyles;
