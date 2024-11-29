// YouTube API Integration
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: 'YOUR_VIDEO_ID', // Replace with your YouTube video ID
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'playlist': 'YOUR_VIDEO_ID', // Required for looping
            'controls': 1,
            'rel': 0,
            'showinfo': 0,
            'mute': 1 // Required for autoplay
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

// Comparison Slider Class
class ComparisonSlider {
    constructor(element) {
        this.element = element;
        this.before = element.querySelector('.before');
        this.beforeImage = this.before.querySelector('img');
        this.handle = element.querySelector('.slider-handle');
        this.isDragging = false;
        
        this.setPositionTo(50); // Set initial position to 50%
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Mouse events
        this.handle.addEventListener('mousedown', this.startDragging.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDragging.bind(this));
        
        // Touch events
        this.handle.addEventListener('touchstart', this.startDragging.bind(this));
        document.addEventListener('touchmove', this.drag.bind(this));
        document.addEventListener('touchend', this.stopDragging.bind(this));
    }
    
    startDragging(e) {
        this.isDragging = true;
        this.element.classList.add('active');
    }
    
    stopDragging(e) {
        this.isDragging = false;
        this.element.classList.remove('active');
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        
        const rect = this.element.getBoundingClientRect();
        const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const position = ((x - rect.left) / rect.width) * 100;
        
        this.setPositionTo(position);
    }
    
    setPositionTo(position) {
        const limitedPosition = Math.min(Math.max(position, 0), 100);
        
        this.handle.style.left = `${limitedPosition}%`;
        this.before.style.width = `${limitedPosition}%`;
    }
}

// Responsive Handler
function checkResponsive() {
    const width = window.innerWidth;
    // Add specific responsive behaviors here if needed
    // This can be used for custom responsive behaviors beyond CSS
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize comparison sliders
    const sliders = document.querySelectorAll('.comparison-slider');
    sliders.forEach(slider => new ComparisonSlider(slider));
    
    // Initialize responsive handling
    checkResponsive();
});

// Responsive resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkResponsive, 250);
});