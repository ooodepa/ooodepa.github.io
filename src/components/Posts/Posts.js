document.addEventListener("DOMContentLoaded", function () {

    let a = document.getElementsByClassName('posts__post');

    if (a.length !== 0) {

        let maxPostHeight = 0;

        for(i = 0; i < a.length; i++) {
            let h = a[i].offsetHeight;
            if(maxPostHeight < h) {
                maxPostHeight = h;
            };
        };

        for(i = 0; i < a.length; i++) {
            document.getElementsByClassName('posts__post')[i].style.height = `${maxPostHeight}px`
        };

    }

});