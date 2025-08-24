// Get the modal and elements
const tvElement = document.getElementById('hero-tv')
const modal = document.getElementById('video-modal')
const closeModalButton = document.getElementById('close-modal')
const iframe = document.getElementById('modal-video')

// Random YouTube Video (for demonstration)
const randomVideoLink = 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Example YouTube link

// Show the modal with the YouTube video
tvElement.addEventListener('click', () => {
    modal.style.display = 'flex' // Show the modal
    iframe.src = randomVideoLink // Set the YouTube video link
})

// Close the modal when the close button is clicked
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none' // Hide the modal
    iframe.src = '' // Stop the video by resetting the iframe source
})
