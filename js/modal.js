// Get the modal and elements
const tvElement = document.getElementById('hero-tv')
const modal = document.getElementById('video-modal')
const closeModalButton = document.getElementById('close-modal')
const iframe = document.getElementById('modal-video')

const videoLink = 'https://www.youtube.com/embed/l3MUKgWs0N0?si=gqN8tBSEJNFjDCW1' // Example YouTube link

// Show the modal with the YouTube video
tvElement.addEventListener('click', () => {
    modal.style.display = 'flex' // Show the modal
    iframe.src = videoLink // Set the YouTube video link
})

// Close the modal when the close button is clicked
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none' // Hide the modal
    iframe.src = '' // Stop the video by resetting the iframe source
})

// Close the modal if the user clicks outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        // Check if the click is on the background (not the modal content)
        modal.style.display = 'none' // Hide the modal
        iframe.src = '' // Stop the video
    }
})
