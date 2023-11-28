const grabar = document.getElementById("grabar");
const notas = document.getElementById("message");

// Verifica si la API de reconocimiento de voz está disponible en el navegador
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.lang = "es-Es";
    recognition.continuous = false;

    recognition.onresult = function (event) {
        const result = event.results[0][0].transcript;
        notas.value = result;
    };

    grabar.addEventListener("click", function () {
        recognition.start();
    });

    recognition.onerror = function (event) {
        console.error("Error en el reconocimiento de voz:", event.error);
    };

    recognition.onend = function () {
        console.log("Reconocimiento de voz finalizado");
    };

    recognition.onstart = function () {
        console.log("Reconocimiento de voz iniciado");
    };
} else {
    console.error("La API de reconocimiento de voz no está disponible en este navegador.");
}