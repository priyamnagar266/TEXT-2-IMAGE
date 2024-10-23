const token = "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"; // Replace with your actual token
const image = document.getElementById("image");
const button = document.getElementById("btn");
const downloadBtn = document.getElementById("downloadBtn");
const themeToggleButton = document.getElementById("themeToggle");
const loadingImage = document.getElementById("loading"); // Reference to the loading image
const descriptionInput = document.getElementById("descriptionInput"); // New input for description

// Function to query the API and generate an image
async function query(data) {
    loadingImage.style.display = "block"; // Show loading image
    image.style.display = "none"; // Hide the generated image initially

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error('Error fetching image:', error);
    } finally {
        loadingImage.style.display = "none"; // Hide loading image when done
    }
}

// Function to handle image generation based on user input
async function handleImageGeneration() {
    const description = descriptionInput.value; // Get the user input
    if (!description) {
        alert("Please enter a description."); // Alert if no description is entered
        return;
    }

    const data = { inputs: description }; // Use the user input
    try {
        const imageBlob = await query(data); // Pass the data to query
        const imageUrl = URL.createObjectURL(imageBlob); // Create a URL for the blob
        image.src = imageUrl; // Set the image source to the generated image
        image.style.display = "block"; // Show the generated image
        downloadBtn.style.display = "block"; // Show download button
        downloadBtn.href = imageUrl; // Set download link to generated image
    } catch (error) {
        console.error('Error processing image generation:', error);
    }
}

// Button click event listener
button.addEventListener('click', handleImageGeneration);

// Enter key event listener for description input
descriptionInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleImageGeneration(); // Call the image generation function on Enter
    }
});

// Theme toggle functionality
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    document.querySelector('.container').classList.toggle('light-theme');
});
