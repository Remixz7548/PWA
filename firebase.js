// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA3YrN0gkfOEXu4Cmi2I6vKbO_AGwm4qEw",
    authDomain: "pwa-contact-5690c.firebaseapp.com",
    databaseURL: "https://pwa-contact-5690c-default-rtdb.firebaseio.com",
    projectId: "pwa-contact-5690c",
    storageBucket: "pwa-contact-5690c.appspot.com",
    messagingSenderId: "365491243506",
    appId: "1:365491243506:web:1546e7c731a3290030836b"
};

// Inicialización de Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos local (IndexedDB)
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const localDBName = "localDatabase";
const localDBVersion = 1;
let localDB;

// Inicialización de la base de datos local
const openLocalDB = () => {
    const request = indexedDB.open(localDBName, localDBVersion);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("contactForm", { autoIncrement: true });
    };

    request.onsuccess = (event) => {
        localDB = event.target.result;
    };

    request.onerror = (event) => {
        console.error("Error opening local database", event.target.error);
    };
};

// Función para guardar mensajes localmente
const saveMessagesLocally = (name, email, message) => {
    const transaction = localDB.transaction(["contactForm"], "readwrite");
    const store = transaction.objectStore("contactForm");
    store.add({ name, email, message });
};

// Función para enviar mensajes a Firebase cuando haya conexión
const saveMessages = (name, email, message) => {
    // Aquí debes poner la lógica para guardar mensajes en Firebase
    // Usarás firebase.database().ref() u otro método según tu estructura de base de datos
    // Ejemplo:
    firebase.database().ref("messages").push({
        name,
        email,
        message
    });
};

// Función para sincronizar con Firebase
const syncWithFirebase = () => {
    const transaction = localDB.transaction(["contactForm"], "readwrite");
    const store = transaction.objectStore("contactForm");

    store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
            const { name, email, message } = cursor.value;
            saveMessages(name, email, message);
            cursor.delete();
            cursor.continue();
        }
    };
};

// Inicializa la base de datos local al cargar la página
openLocalDB();

// Añade un event listener al formulario
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    saveMessagesLocally(name, email, message);

    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        timer: 3000,
        showConfirmButton: false
    });

    // Resetea el formulario
    document.getElementById("contactForm").reset();

    // Intenta sincronizar con Firebase (si hay conexión)
    if (navigator.onLine) {
        syncWithFirebase();
    }
});

// Event listener para detectar cambios en la conexión a Internet
window.addEventListener("online", () => {
    // Sincroniza con Firebase cuando hay conexión
    syncWithFirebase();
});