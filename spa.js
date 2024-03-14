const app = {
    pages: [],
    show: new Event('show'),
    init: function () {
        app.pages = document.querySelectorAll('.page');   //for each page add event of show
        app.pages.forEach((pg) => {
            pg.addEventListener('show', app.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach((link) => {   //add click event for the links
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'LOGIN', '#login');               //change url
        window.addEventListener('popstate', app.poppin);
    },
    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');       // get the attribute which is also the id of the page (the link we click on)
        document.querySelector('.active').classList.remove('active');  // remove the active class from the page that was active
        document.getElementById(currentPage).classList.add('active');  // add the active to the current page we clicked on

        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function (ev) {
        ev.preventDefault();
        console.log('Page', ev.target.id, 'just shown');
        let submitBtn = ev.target.querySelector('.submit');
        console.log('Submit button:', submitBtn);
        if (submitBtn && submitBtn.value == "Register") {
            submitBtn.addEventListener('click', app.regist)
        }
        else if (submitBtn && submitBtn.value == "Sign In") {
            submitBtn.addEventListener('click', app.log)
        }

    },
    poppin: function (ev) {
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#', '');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        document.getElementById(hash).dispatchEvent(app.show);
    },
    log: function (ev) {
        ev.preventDefault();       // get the attribute which is also the id of the page (the link we click on)
        if (!errorConnection) {
            document.querySelector('.active').classList.remove('active');  // remove the active class from the page that was active
            document.getElementById('contact').classList.add('active');  // add the active to the current page we clicked on
            history.pushState({}, 'CONTACT', '#contact');
            document.getElementById('contact').dispatchEvent(app.show);
            showAllContact();
        }
    },
    regist: function (ev) {
        ev.preventDefault();       // get the attribute which is also the id of the page (the link we click on)
        if (!errorConnection) {
            document.querySelector('.active').classList.remove('active');  // remove the active class from the page that was active
            document.getElementById('login').classList.add('active');  // add the active to the current page we clicked on
            history.pushState({}, 'LOGIN', '#login');
            document.getElementById('login').dispatchEvent(app.show);
        }
    },
    checkLogin: function (ev) {
        ev.preventDefault();

    }
}
document.addEventListener('DOMContentLoaded', app.init)
