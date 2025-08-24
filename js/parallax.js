/**
 * Parallax Effect System
 * Creates mouse-based parallax movement for hero elements
 */

class ParallaxController {
    constructor() {
        this.container = document.getElementById('hero-container')
        this.elements = new Map()
        this.isInitialized = false
    }

    /**
     * Register an element for parallax movement
     * @param {string} id - Element ID
     * @param {number} multiplier - Movement intensity
     * @param {string} type - Element type: 'default', 'earth', 'container'
     */
    registerElement(id, multiplier, type = 'default') {
        const element = document.getElementById(id)
        if (!element) {
            console.warn(`Parallax: Element with ID '${id}' not found`)
            return
        }

        this.elements.set(id, {
            element,
            multiplier,
            type,
        })
    }

    /**
     * Calculate movement based on mouse position
     * @param {Event} e - Mouse event
     */
    calculateMovement(e) {
        const rect = this.container.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Calculate offset from center (-1 to 1)
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const offsetX = (mouseX - centerX) / centerX
        const offsetY = (mouseY - centerY) / centerY

        return { offsetX, offsetY }
    }

    /**
     * Apply movement to element based on type
     * @param {Object} elementData - Element configuration
     * @param {number} moveX - X movement amount
     * @param {number} moveY - Y movement amount
     */
    applyMovement(elementData, moveX, moveY) {
        const { element, type } = elementData

        switch (type) {
            case 'earth':
                // Earth only moves horizontally, stays bottom-centered
                element.style.transform = `translateX(calc(-50% + ${moveX}px))`
                break

            case 'container':
                // TV and Hand container moves together
                element.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`
                break

            case 'default':
            default:
                // Background and other elements
                element.style.transform = `translate(${moveX}px, ${moveY}px)`
                break
        }
    }

    /**
     * Handle mouse movement
     * @param {Event} e - Mouse event
     */
    handleMouseMove(e) {
        const { offsetX, offsetY } = this.calculateMovement(e)

        this.elements.forEach((elementData) => {
            const moveX = offsetX * elementData.multiplier
            const moveY = offsetY * elementData.multiplier
            this.applyMovement(elementData, moveX, moveY)
        })
    }

    /**
     * Initialize parallax system
     */
    init() {
        if (this.isInitialized) {
            console.warn('Parallax system already initialized')
            return
        }

        if (!this.container) {
            console.error('Parallax: Container element not found')
            return
        }

        // Bind event listener
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e))
        this.isInitialized = true

        console.log('Parallax system initialized with', this.elements.size, 'elements')
    }

    /**
     * Destroy parallax system
     */
    destroy() {
        window.removeEventListener('mousemove', this.handleMouseMove)
        this.elements.clear()
        this.isInitialized = false
    }
}

// Initialize parallax system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const parallax = new ParallaxController()

    // Register elements with their movement multipliers and types
    parallax.registerElement('tv-hand-container', 150, 'container')
    parallax.registerElement('hero-bg', 25, 'default')
    parallax.registerElement('hero-earth', 100, 'earth')

    // Initialize the system
    parallax.init()

    // Make parallax controller globally available for debugging
    window.parallaxController = parallax
})
