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

const scriptURL = 'https://script.google.com/macros/s/AKfycbyh9eqcCqEXT6oGztgPjKAG48XdfLjqQn_YQLbe29Hw7Woe07KpHSvQvQz5-EjVn5xV/exec'
const form = document.forms['Website-Data']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(() => { window.location.reload(); })
})

//===========================================================================================================================================================================
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    // Simulate submission process (for demonstration purposes)
    setTimeout(function () {
        document.getElementById("myForm").reset(); // Reset form fields
        document.getElementById("successMessage").style.display = "block"; // Show success message
        // setTimeout(function () {
        //     document.getElementById("successMessage").style.display = "none"; // Hide success message after 3 seconds
        // }, 2000);
    }, 500); // Simulate 2 seconds of processing time
});
function closePopup() {
    document.getElementById("successMessage").style.display = "none";
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

