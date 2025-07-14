// ============================================================================
// GLOBAL STATE MANAGEMENT
// ============================================================================

// Blog data storage
let blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
let drafts = JSON.parse(localStorage.getItem('blogDrafts') || '[]');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate a unique ID for blog posts
 * @returns {string} Unique identifier
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Estimate reading time based on content length
 * @param {string} content - Blog content
 * @returns {number} Estimated reading time in minutes
 */
function estimateReadTime(content) {
    const WORDS_PER_MINUTE = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Parse markdown text to HTML
 * @param {string} text - Markdown text
 * @returns {string} HTML string
 */
function parseMarkdown(text) {
    return text
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(.*)$/gim, '<p>$1</p>')
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, '$1')
        .replace(/<p>(<pre>.*<\/pre>)<\/p>/g, '$1');
}

/**
 * Display message to user
 * @param {string} elementId - ID of message container
 * @param {string} message - Message text
 * @param {string} color - Message color
 */
function showMessage(elementId, message, color) {
    const messageDiv = document.getElementById(elementId);
    if (!messageDiv) return;
    
    messageDiv.style.display = 'block';
    messageDiv.style.color = color;
    messageDiv.innerHTML = message;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// ============================================================================
// STORAGE MANAGEMENT
// ============================================================================

/**
 * Save blog posts to localStorage
 */
function saveBlogPosts() {
    try {
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    } catch (error) {
        console.error('Failed to save blog posts:', error);
    }
}

/**
 * Save drafts to localStorage
 */
function saveDrafts() {
    try {
        localStorage.setItem('blogDrafts', JSON.stringify(drafts));
    } catch (error) {
        console.error('Failed to save drafts:', error);
    }
}

// ============================================================================
// PAGE NAVIGATION
// ============================================================================

/**
 * Show specified page and update navigation
 * @param {string} pageId - ID of page to show
 */
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// ============================================================================
// BLOG MANAGEMENT
// ============================================================================

/**
 * Load and display blog list
 */
function loadBlogList() {
    const blogList = document.getElementById('blogList');
    if (!blogList) return;
    
    const allPosts = [...blogPosts, ...drafts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (allPosts.length === 0) {
        blogList.innerHTML = '<div class="coming-soon">No blog posts yet. Click "New Post" to write your first article!</div>';
        return;
    }
    
    blogList.innerHTML = allPosts.map(post => createBlogPostHTML(post)).join('');
}

/**
 * Create HTML for a blog post item
 * @param {Object} post - Blog post object
 * @returns {string} HTML string
 */
function createBlogPostHTML(post) {
    const statusClass = post.status === 'published' ? 'status-published' : 'status-draft';
    const readButton = post.status === 'published' ? 
        `<button class="blog-action-btn" onclick="openBlogPost('${post.id}')">Read</button>` : '';
    
    return `
        <div class="blog-post">
            <div class="blog-header">
                <h3 class="blog-title">${post.title}
                    <span class="status-indicator ${statusClass}">
                        ${post.status}
                    </span>
                </h3>
                <div class="blog-meta">${formatDate(post.date)} • ${estimateReadTime(post.content)} min read</div>
            </div>
            <div class="blog-excerpt">${post.excerpt}</div>
            <div class="blog-tags">
                ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
            <div class="blog-actions">
                ${readButton}
                <button class="blog-action-btn" onclick="editPost('${post.id}')">Edit</button>
                <button class="blog-action-btn delete" onclick="deletePost('${post.id}')">Delete</button>
            </div>
        </div>
    `;
}

/**
 * Get form data from blog form
 * @returns {Object} Form data object
 */
function getBlogFormData() {
    return {
        title: document.getElementById('blogTitle').value.trim(),
        excerpt: document.getElementById('blogExcerpt').value.trim(),
        content: document.getElementById('blogContent').value.trim(),
        tags: document.getElementById('blogTags').value.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
}

/**
 * Validate blog form data
 * @param {Object} data - Form data
 * @returns {boolean} Validation result
 */
function validateBlogForm(data) {
    if (!data.title) {
        showMessage('writeMessage', 'Please enter a title.', '#f78166');
        return false;
    }
    if (!data.content) {
        showMessage('writeMessage', 'Please enter content.', '#f78166');
        return false;
    }
    return true;
}

/**
 * Publish a new blog post
 */
function publishPost() {
    const formData = getBlogFormData();
    
    if (!validateBlogForm(formData)) return;
    
    const post = {
        id: generateId(),
        ...formData,
        date: new Date().toISOString(),
        status: 'published'
    };
    
    // Remove from drafts if it was a draft
    drafts = drafts.filter(draft => draft.title !== formData.title);
    
    blogPosts.push(post);
    saveBlogPosts();
    saveDrafts();
    
    showMessage('writeMessage', 'Blog post published successfully!', '#7ee787');
    document.getElementById('blogForm').reset();
    loadBlogList();
}

/**
 * Save current form as draft
 */
function saveDraft() {
    const formData = getBlogFormData();
    
    if (!validateBlogForm(formData)) return;
    
    const draft = {
        id: generateId(),
        ...formData,
        date: new Date().toISOString(),
        status: 'draft'
    };
    
    // Remove existing draft with same title
    drafts = drafts.filter(d => d.title !== formData.title);
    drafts.push(draft);
    saveDrafts();
    
    showMessage('writeMessage', 'Draft saved successfully!', '#7ee787');
    loadBlogList();
}

/**
 * Preview current blog post
 */
function previewPost() {
    const formData = getBlogFormData();
    
    if (!validateBlogForm(formData)) return;
    
    const previewHtml = `
        <h1>${formData.title}</h1>
        <p><em>${formatDate(new Date().toISOString())} • ${estimateReadTime(formData.content)} min read</em></p>
        ${parseMarkdown(formData.content)}
        <div style="margin-top: 30px;">
            ${formData.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join(' ')}
        </div>
    `;
    
    const previewContent = document.getElementById('previewContent');
    const previewModal = document.getElementById('previewModal');
    
    if (previewContent && previewModal) {
        previewContent.innerHTML = previewHtml;
        previewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close preview modal
 */
function closePreview() {
    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
        previewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Edit existing blog post
 * @param {string} postId - Post ID to edit
 */
function editPost(postId) {
    const post = [...blogPosts, ...drafts].find(p => p.id === postId);
    if (!post) {
        showMessage('writeMessage', 'Post not found.', '#f78166');
        return;
    }
    
    // Populate form with post data
    document.getElementById('blogTitle').value = post.title;
    document.getElementById('blogExcerpt').value = post.excerpt;
    document.getElementById('blogContent').value = post.content;
    document.getElementById('blogTags').value = post.tags.join(', ');
    
    // Remove the post from both arrays (we'll re-add when saving)
    blogPosts = blogPosts.filter(p => p.id !== postId);
    drafts = drafts.filter(p => p.id !== postId);
    saveBlogPosts();
    saveDrafts();
    
    showPage('write');
    showMessage('writeMessage', 'Post loaded for editing.', '#7ee787');
}

/**
 * Delete blog post
 * @param {string} postId - Post ID to delete
 */
function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    blogPosts = blogPosts.filter(p => p.id !== postId);
    drafts = drafts.filter(p => p.id !== postId);
    saveBlogPosts();
    saveDrafts();
    loadBlogList();
    
    showMessage('writeMessage', 'Post deleted.', '#7ee787');
}

/**
 * Open blog post in modal
 * @param {string} postId - Post ID to open
 */
function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) {
        showMessage('writeMessage', 'Post not found.', '#f78166');
        return;
    }
    
    const content = `
        <h1>${post.title}</h1>
        <p><em>${formatDate(post.date)} • ${estimateReadTime(post.content)} min read</em></p>
        ${parseMarkdown(post.content)}
        <div style="margin-top: 30px;">
            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join(' ')}
        </div>
    `;
    
    const blogContent = document.getElementById('blogContent');
    const blogModal = document.getElementById('blogModal');
    
    if (blogContent && blogModal) {
        blogContent.innerHTML = content;
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close blog post modal
 */
function closeBlogPost() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ============================================================================
// CONTACT FORM
// ============================================================================

/**
 * Handle contact form submission
 * @param {Event} e - Form submit event
 */
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        subject: document.getElementById('contactSubject').value.trim(),
        message: document.getElementById('contactMessage').value.trim()
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        showContactMessage('Please fill in all required fields.', '#f78166');
        return;
    }
    
    // Simulate form submission
    showContactMessage('Message sent successfully! I\'ll get back to you soon.', '#7ee787');
    
    // Clear form
    e.target.reset();
}

/**
 * Show contact form message
 * @param {string} message - Message text
 * @param {string} color - Message color
 */
function showContactMessage(message, color) {
    const messageDiv = document.getElementById('contactFormMessage');
    if (messageDiv) {
        messageDiv.style.display = 'block';
        messageDiv.style.color = color;
        messageDiv.innerHTML = message;
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// ============================================================================
// MODAL MANAGEMENT
// ============================================================================

/**
 * Setup modal event listeners
 */
function setupModals() {
    // Blog modal
    const blogModal = document.getElementById('blogModal');
    if (blogModal) {
        blogModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBlogPost();
            }
        });
    }

    // Preview modal
    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
        previewModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closePreview();
            }
        });
    }

    // Close modals with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBlogPost();
            closePreview();
        }
    });
}

// ============================================================================
// ANIMATIONS
// ============================================================================

/**
 * Animate terminal lines with fade-in effect
 */
function animateTerminal() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.8}s forwards`;
    });

    // Add fadeIn animation if not already present
    if (!document.querySelector('#terminal-animations')) {
        const style = document.createElement('style');
        style.id = 'terminal-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================================================
// EVENT LISTENERS SETUP
// ============================================================================

/**
 * Setup blog form event listeners
 */
function setupBlogForm() {
    const blogForm = document.getElementById('blogForm');
    if (blogForm) {
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            publishPost();
        });
    }
}

/**
 * Setup contact form event listeners
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application
 */
function initializeApp() {
    loadBlogList();
    setupBlogForm();
    setupContactForm();
    setupModals();
    animateTerminal();
}

// Initialize when page loads
window.addEventListener('load', initializeApp);

// Turing Machine Simulation
class TuringMachine {
    constructor() {
        this.currentState = 'q0';
        this.headPosition = 0;
        this.stepCount = 0;
        this.tape = [];
        this.isRunning = false;
        this.interval = null;
        
        // Initialize tape with alternating 0s and 1s
        for (let i = -10; i <= 20; i++) {
            this.tape[i] = Math.abs(i) % 2;
        }
        
        // Transition function δ: (state, symbol) → (newState, writeSymbol, direction)
        this.transitions = {
            'q0': {
                '0': { state: 'q1', write: '1', move: 'R' },
                '1': { state: 'q1', write: '0', move: 'R' }
            },
            'q1': {
                '0': { state: 'q2', write: '0', move: 'L' },
                '1': { state: 'q2', write: '1', move: 'L' }
            },
            'q2': {
                '0': { state: 'q0', write: '1', move: 'R' },
                '1': { state: 'q0', write: '0', move: 'R' }
            }
        };
        
        this.updateDisplay();
        this.startSimulation();
    }
    
    step() {
        const currentSymbol = this.tape[this.headPosition];
        const transition = this.transitions[this.currentState][currentSymbol];
        
        if (!transition) {
            this.stop();
            return;
        }
        
        // Update tape
        this.tape[this.headPosition] = transition.write;
        
        // Update state
        this.currentState = transition.state;
        
        // Move head
        if (transition.move === 'R') {
            this.headPosition++;
        } else {
            this.headPosition--;
        }
        
        this.stepCount++;
        this.updateDisplay();
        this.updateTapeVisual();
    }
    
    updateDisplay() {
        document.getElementById('currentState').textContent = this.currentState;
        document.getElementById('stepCount').textContent = this.stepCount;
        document.getElementById('headPosition').textContent = this.headPosition;
        document.getElementById('currentSymbol').textContent = this.tape[this.headPosition] || '0';
        
        const currentSymbol = this.tape[this.headPosition] || '0';
        const transition = this.transitions[this.currentState][currentSymbol];
        if (transition) {
            document.getElementById('transition').textContent = 
                `δ(${this.currentState},${currentSymbol}) = (${transition.state},${transition.write},${transition.move})`;
            document.getElementById('direction').textContent = transition.move;
        }
    }
    
    updateTapeVisual() {
        const tapeElement = document.getElementById('tape');
        const cells = tapeElement.querySelectorAll('.tape-cell');
        
        cells.forEach((cell, index) => {
            const position = parseInt(cell.dataset.position);
            const symbol = this.tape[position] || '0';
            
            cell.textContent = symbol;
            cell.classList.remove('active');
            
            if (position === this.headPosition) {
                cell.classList.add('active');
            }
        });
        
        // Animate tape movement
        const offset = (this.headPosition - 7) * -32; // 30px cell width + 2px gap
        tapeElement.style.transform = `translateX(${offset}px)`;
    }
    
    startSimulation() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.step();
        }, 1000); // 1 second per step
    }
    
    stop() {
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Initialize Turing Machine when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Turing Machine
    const turingMachine = new TuringMachine();
    
    // Existing navigation code
    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        
        // Add active class to clicked nav link
        event.target.classList.add('active');
    }
    
    // Make showPage function globally available
    window.showPage = showPage;
});