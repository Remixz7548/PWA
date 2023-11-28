const firebaseConfig = {
    apiKey: "AIzaSyA3YrN0gkfOEXu4Cmi2I6vKbO_AGwm4qEw",
    authDomain: "pwa-contact-5690c.firebaseapp.com",
    databaseURL: "https://pwa-contact-5690c-default-rtdb.firebaseio.com",
    projectId: "pwa-contact-5690c",
    storageBucket: "pwa-contact-5690c.appspot.com",
    messagingSenderId: "365491243506",
    appId: "1:365491243506:web:1546e7c731a3290030836b"
};

  // initialize firebase
firebase.initializeApp(firebaseConfig);

  // reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    saveMessages(name, email, message);

    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        timer: 3000, // Cerrar automáticamente después de 3 segundos
        showConfirmButton: false
    });

    //   reset the form
    document.getElementById("contactForm").reset();
}

const saveMessages = (name, email, message) => {
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        name: name,
        email: email,
        message: message,
    });
};

