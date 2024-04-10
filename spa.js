// create an object that encapsulates the functionality and behavior of the single-page application
const app = {
    pages: [],
    show: new Event('show'),
    init: function () {     
        // Initialize the spa       
        const loginBtn = document.getElementById('btnsignin');  // save the login button
        app.pages = document.querySelectorAll('.page');         // for each page add event of show
        app.pages.forEach((pg) => {
            pg.addEventListener('show', app.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach((link) => {   //add click event for the links
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'LOGIN', '#login');               // change url
        window.addEventListener('popstate', app.poppin);           // popstate event is triggered when the user navigates through the session history 
        loginBtn.addEventListener('click', app.log);
    },
    // handles navigation within the SPA when users click on navigation links.
    nav: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');       // get the attribute which is also the id of the page (the link we click on)
        document.querySelector('.active').classList.remove('active');  // remove the active class from the page that was active
        document.getElementById(currentPage).classList.add('active');  // add the active to the current page we clicked on

        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);  //trigger an event on the selected DOM element
    },
    pageShown: function (ev) {
        ev.preventDefault();
        const contactPageLink = document.getElementById('contact-page');  // select the contact page link element
        // Initially disable the contact page link
        contactPageLink.classList.add('disabled');

        console.log('Page', ev.target.id, 'just shown');
        let submitBtn = ev.target.querySelector('.submit');  // selected the element in page with submit button class
        console.log('Submit button:', submitBtn);
        if (submitBtn && submitBtn.value == "Register") {
            submitBtn.addEventListener('click', app.regist)
        }
        else if (submitBtn && submitBtn.value == "Sign In") {
            submitBtn.addEventListener('click', app.log)
        }
        else {
            contactPageLink.classList.remove('disabled');
        }

    },
    poppin: function (ev) {
        // handles navigation when users navigate back or forward
        console.log(location.hash, 'popstate event');               //responsible for updating the application state and UI to reflect the new location
        let hash = location.hash.replace('#', '');                  // extracts hash -> the part after the # symbol , indicates the current "state" or location.
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
    
}
document.addEventListener('DOMContentLoaded', app.init)
