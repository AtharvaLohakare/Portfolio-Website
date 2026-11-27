// ================================================================================================
// ===============================loader for website============================================

// $(document).ready(function(){
// 	$('div#loading').removeAttr('id');
// });
var preloader = document.getElementById("loader");
// window.addEventListener('load', function(){
// 	preloader.style.display = 'none';
// 	})

function loadfunction() {
    preloader.style.display = 'none';
};


// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('click').checked = false;
    });
});


// ===================typed js==================

document.addEventListener('DOMContentLoaded', () => {
    const typed = new Typed('.multiple-text', {
        strings: ['Web Designer', 'Student', //'3D Modeler'
        'Learner'],
        typeSpeed: 60,
        backSpeed: 60,
        loop: true
    });
});
// ===========================================================================================================================================================================


// ===========================================================================================================================================================================
// ===================Scroll Reveal===================

ScrollReveal({
    // reset: true,
    distance: '50px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-left-content ', { origin: 'left' });

ScrollReveal().reveal('.home-right-content ', { origin: 'right' });

ScrollReveal().reveal('', { origin: 'top' });

// ScrollReveal().reveal('.home-content h1 ', { origin: 'bottom' });


ScrollReveal({
    // reset: true,
    distance: '10px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.right-to-left  ,.contact-h2, .footer-branding', { origin: 'left' });

ScrollReveal().reveal('.left-to-right, .about-right-content, .footer-social ', { origin: 'right' });

ScrollReveal().reveal('.quick-info h4, .project h3 ,.about-right-content h3 ,.contact h3', { origin: 'top' });

ScrollReveal().reveal('.coming-soon-box ', { origin: 'bottom' });

// ===========================================================================================================================================================================
// ===================Google sheet form===================

/* ================= CONTACT FORM SUBMISSION ================= */

const scriptURL = 'https://script.google.com/macros/s/AKfycbw6DRbo0s7YM7ZIahuEbYCLGwXp8DW4gAjmTe2Gw8VOGHDNUFULNQOyCVNMg_A4TJfj7w/exec';

const form = document.getElementById('myForm');
const submitButton = document.getElementById('contactSubmit');
const formStatus = document.getElementById('formStatus');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.querySelector('span').textContent = 'Sending...';
    formStatus.textContent = '';

    try {
        await fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        });

        form.reset();
        successMessage.classList.add('show');

    } catch (error) {
        formStatus.textContent = 'Something went wrong. Please try again.';
        console.error('Contact form error:', error);

    } finally {
        submitButton.disabled = false;
        submitButton.querySelector('span').textContent = 'Send Message';
    }
});

function closePopup() {
    successMessage.classList.remove('show');
}

// ================================================================================================
// ================================================================================================
// popup Submit btn Animation
// let popup = document.getElementById('popup');
// function openPopup() {
//     popup.classList.add("open-popup");
// }
// function closePopup() {
//     popup.classList.remove("open-popup");
// }
// ================================================================================================

