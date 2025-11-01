/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) {
    header.classList.add('blur-header');
  } else {
    header.classList.remove('blur-header');
  }
};

window.addEventListener('scroll', blurHeader);
/*=============== FORM VALIDATION & EMAIL JS ===============*/
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("AUTT6iufmx2V7EbgC");

  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const submitBtn = document.getElementById("submit-btn");
  const formMessage = document.getElementById("form-message");

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");

  const messageCounter = document.getElementById("message-counter");

  const patterns = {
    name: /^[a-zA-Z\s]{3,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    subject: /^.{5,100}$/,
    message: /^.{10,500}$/
  };

  function validateName() {
    const value = nameInput.value.trim();
    
    if (value === "") {
      setError(nameInput, nameError, " Name is required");
      return false;
    } else if (!patterns.name.test(value)) {
      setError(nameInput, nameError, " Name must be 3-50 characters (letters only)");
      return false;
    } else {
      setSuccess(nameInput, nameError, "");
      return true;
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    
    if (value === "") {
      setError(emailInput, emailError, " Email is required");
      return false;
    } else if (!patterns.email.test(value)) {
      setError(emailInput, emailError, " Please enter a valid email address");
      return false;
    } else {
      setSuccess(emailInput, emailError, "");
      return true;
    }
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    
    if (value === "") {
      subjectInput.classList.remove("valid", "invalid");
      subjectError.textContent = "";
      return true;
    }
    
    if (!patterns.subject.test(value)) {
      setError(subjectInput, subjectError, " Subject must be 5-100 characters");
      return false;
    } else {
      setSuccess(subjectInput, subjectError, "");
      return true;
    }
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    
    if (value === "") {
      setError(messageInput, messageError, " Message is required");
      return false;
    } else if (!patterns.message.test(value)) {
      setError(messageInput, messageError, " Message must be 10-500 characters");
      return false;
    } else {
      setSuccess(messageInput, messageError, "");
      return true;
    }
  }

  function setError(input, errorElement, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    errorElement.textContent = message;
  }

  function setSuccess(input, errorElement, message) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    errorElement.textContent = message;
  }

  function updateCounter() {
    const length = messageInput.value.length;
    const maxLength = 500;
    messageCounter.textContent = `${length}/${maxLength}`;

    if (length > maxLength * 0.9) {
      messageCounter.classList.add("danger");
      messageCounter.classList.remove("warning");
    } else if (length > maxLength * 0.7) {
      messageCounter.classList.add("warning");
      messageCounter.classList.remove("danger");
    } else {
      messageCounter.classList.remove("warning", "danger");
    }
  }

  nameInput.addEventListener("blur", validateName);
  nameInput.addEventListener("input", () => {
    if (nameInput.classList.contains("invalid")) {
      validateName();
    }
  });

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("invalid")) {
      validateEmail();
    }
  });

  subjectInput.addEventListener("blur", validateSubject);
  subjectInput.addEventListener("input", () => {
    if (subjectInput.classList.contains("invalid")) {
      validateSubject();
    }
  });

  messageInput.addEventListener("input", () => {
    updateCounter();
    if (messageInput.classList.contains("invalid")) {
      validateMessage();
    }
  });

  messageInput.addEventListener("blur", validateMessage);

  updateCounter();

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `contact__form-message ${type}`;
    
    setTimeout(() => {
      formMessage.className = "contact__form-message";
    }, 5000);
  }

  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");
      submitBtn.querySelector(".button__text").textContent = "Sending";
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
      submitBtn.querySelector(".button__text").textContent = "Send Message";
    }
  }

  function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      showMessage(" Please fix the errors above before submitting", "error");
      
      if (!isNameValid) nameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else if (!isSubjectValid) subjectInput.focus();
      else if (!isMessageValid) messageInput.focus();
      
      return;
    }

    setLoading(true);

    let timeField = document.createElement("input");
    timeField.type = "hidden";
    timeField.name = "time";
    timeField.value = new Date().toLocaleString();
    this.appendChild(timeField);

    emailjs.sendForm("service_ph8ylgd", "template_glnrmyr", this)
      .then(() => {
        showMessage(" Message sent successfully! I'll get back to you soon.", "success");
        contactForm.reset();
        
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
          input.classList.remove("valid", "invalid");
        });
        
        [nameError, emailError, subjectError, messageError].forEach(error => {
          error.textContent = "";
        });
        
        updateCounter();
        setLoading(false);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showMessage(" Failed to send message. Please try again or contact me directly at mdshafwan14@gmail.com", "error");
        setLoading(false);
      });
  });
});

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if (this.scrollY >= 350) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id'),
          sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
});

sr.reveal('.home__data, .home__social, .contact__container, .footer__container');
sr.reveal('.home__image', { origin: 'bottom' });
sr.reveal('.about__data, .skills__data', { origin: 'left' });
sr.reveal('.about__image, .skills__content', { origin: 'right' });
sr.reveal('.services__card, .projects__card', { interval: 100 });
