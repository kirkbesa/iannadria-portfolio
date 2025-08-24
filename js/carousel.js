// Get all carousel wrappers
const carouselWrappers = document.querySelectorAll('.carousel-wrapper')

// For each carousel, apply the dragging functionality
carouselWrappers.forEach((carouselWrapper) => {
    let isDragging = false
    let startX
    let scrollLeft

    carouselWrapper.addEventListener('mousedown', (e) => {
        isDragging = true
        startX = e.pageX - carouselWrapper.offsetLeft
        scrollLeft = carouselWrapper.scrollLeft
    })

    carouselWrapper.addEventListener('mouseleave', () => {
        isDragging = false
    })

    carouselWrapper.addEventListener('mouseup', () => {
        isDragging = false
    })

    carouselWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - carouselWrapper.offsetLeft
        const walk = (x - startX) * 2 // Adjust scroll speed (2 is the multiplier)
        carouselWrapper.scrollLeft = scrollLeft - walk
    })

    // Change cursor when hovering over carousel
    carouselWrapper.addEventListener('mouseenter', () => {
        carouselWrapper.style.cursor = 'grab'
    })

    carouselWrapper.addEventListener('mouseleave', () => {
        carouselWrapper.style.cursor = 'auto'
    })
})
