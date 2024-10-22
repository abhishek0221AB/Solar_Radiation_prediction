document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("prediction-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch('/predict', {
            method: 'POST',
            body: new URLSearchParams(formData)
        })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            const radiationValue = data.radiation;

            // Display the radiation value
            const radiationValueElement = document.getElementById('radiation-value');
            radiationValueElement.textContent = `Predicted Solar Radiation: ${radiationValue.toFixed(2)} W/m²`;

            // Determine the message based on the radiation value
            let message,message1;
            if (radiationValue > 150) {
                message = "Alert: High solar radiation! Take necessary precautions.";
                message1 ="Solar panels can be installed."
            } else if (radiationValue < 40) {
                message = "Low solar radiation. It might be a cloudy day.";
            } else {
                message = "Wonderful day! The solar radiation is at a normal level.";
            }

            // Display the message
            const radiationMessageElement = document.getElementById('radiation-message');
            radiationMessageElement.textContent = message;

            // Optionally, you can add classes to style the message based on the radiation level
            radiationMessageElement.className = '';  // Clear previous classes
            if (radiationValue > 150) {
                radiationMessageElement.classList.add('high-radiation');
            } else if (radiationValue < 40) {
                radiationMessageElement.classList.add('low-radiation');
            } else {
                radiationMessageElement.classList.add('normal-radiation');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});