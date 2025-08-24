/**
 * Animation Control System
 * Manages hand smack animation and spark effects
 */

class AnimationController {
    constructor() {
        this.hand = null
        this.tv = null
        this.spark = null
        this.sparkInterval = null
        this.isInitialized = false

        // Animation timing constants
        this.HAND_ANIMATION_DURATION = 2500 // 2 seconds
        this.SPARK_DURATION = 750 // 0.6 seconds
        this.IMPACT_DELAY = 800 // 0.8 seconds (40% of 2s cycle)
    }

    /**
     * Initialize animation elements
     */
    initElements() {
        this.hand = document.getElementById('hero-hand')
        this.tv = document.getElementById('hero-tv')
        this.spark = document.getElementById('hero-spark')

        // Validate elements exist
        const missing = []
        if (!this.hand) missing.push('hero-hand')
        if (!this.tv) missing.push('hero-tv')
        if (!this.spark) missing.push('hero-spark')

        if (missing.length > 0) {
            console.error('Animation: Missing elements:', missing)
            return false
        }

        return true
    }

    /**
     * Trigger spark effect at impact moment
     */
    triggerSpark() {
        if (!this.spark) return

        // Show spark effect
        this.spark.classList.remove('spark-hidden')
        this.spark.classList.add('spark-effect')

        // Hide spark after animation completes
        setTimeout(() => {
            if (this.spark) {
                this.spark.classList.add('spark-hidden')
                this.spark.classList.remove('spark-effect')
            }
        }, this.SPARK_DURATION)
    }

    /**
     * Start the spark effect loop
     */
    startSparkLoop() {
        // Clear any existing interval
        if (this.sparkInterval) {
            clearInterval(this.sparkInterval)
        }

        // Start spark loop after initial delay to sync with first impact
        setTimeout(() => {
            // Trigger first spark
            this.triggerSpark()

            // Set up interval for subsequent sparks
            this.sparkInterval = setInterval(() => {
                this.triggerSpark()
            }, this.HAND_ANIMATION_DURATION)
        }, this.IMPACT_DELAY)
    }

    /**
     * Stop the spark effect loop
     */
    stopSparkLoop() {
        if (this.sparkInterval) {
            clearInterval(this.sparkInterval)
            this.sparkInterval = null
        }
    }

    /**
     * Add manual trigger functionality to hand
     */
    // addManualTrigger() {
    //     if (!this.hand) return

    //     this.hand.addEventListener('click', () => {
    //         this.triggerSpark()

    //         // Add temporary single animation class if needed
    //         this.hand.classList.add('hand-smack')
    //         setTimeout(() => {
    //             this.hand.classList.remove('hand-smack')
    //         }, 1500)
    //     })
    // }

    /**
     * Initialize the animation system
     */
    init() {
        if (this.isInitialized) {
            console.warn('Animation system already initialized')
            return
        }

        if (!this.initElements()) {
            console.error('Animation: Failed to initialize - missing elements')
            return
        }

        // Start the spark animation loop
        this.startSparkLoop()

        // Add manual trigger functionality
        // this.addManualTrigger()

        this.isInitialized = true
        console.log('Animation system initialized successfully')
    }

    /**
     * Destroy animation system
     */
    destroy() {
        this.stopSparkLoop()

        // Remove event listeners
        if (this.hand) {
            this.hand.replaceWith(this.hand.cloneNode(true))
        }

        this.isInitialized = false
        console.log('Animation system destroyed')
    }

    /**
     * Public methods for external control
     */

    /**
     * Manually trigger a single spark effect
     */
    manualSpark() {
        this.triggerSpark()
    }

    /**
     * Pause/resume spark loop
     */
    pauseSparkLoop() {
        this.stopSparkLoop()
    }

    resumeSparkLoop() {
        if (this.isInitialized) {
            this.startSparkLoop()
        }
    }
}

// Initialize animation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animations = new AnimationController()
    animations.init()

    // Make animation controller globally available
    window.animationController = animations
})

// Handle page visibility changes to optimize performance
document.addEventListener('visibilitychange', () => {
    if (window.animationController) {
        if (document.hidden) {
            window.animationController.pauseSparkLoop()
        } else {
            window.animationController.resumeSparkLoop()
        }
    }
})
