/* ===================================
   Jay Gati Link - JavaScript
   =================================== */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
});

// ===================================
// Pincode Checker
// ===================================
function checkPincode() {
    const pincode = document.getElementById('pincode-input').value;
    const resultDiv = document.getElementById('pincode-result');
    
    if (!pincode || pincode.length !== 6) {
        resultDiv.innerHTML = '<p style="color: #e74c3c;">Please enter a valid 6-digit pincode</p>';
        return;
    }
    
    // Simulated serviceable pincodes (in real app, this would be an API call)
    const serviceableRanges = [
        { start: 110000, end: 119999 }, // Delhi
        { start: 400000, end: 400999 }, // Mumbai
        { start: 560000, end: 560999 }, // Bangalore
        { start: 600000, end: 600999 }, // Chennai
        { start: 700000, end: 700999 }, // Kolkata
        { start: 500000, end: 500999 }, // Hyderabad
    ];
    
    const isServiceable = serviceableRanges.some(range => 
        pincode >= range.start && pincode <= range.end
    ) || Math.random() > 0.3; // Random serviceability for demo
    
    if (isServiceable) {
        resultDiv.innerHTML = '<p style="color: #27ae60;"><i class="fas fa-check-circle"></i> Great! We deliver to this pincode.</p>';
    } else {
        resultDiv.innerHTML = '<p style="color: #e74c3c;"><i class="fas fa-times-circle"></i> Sorry, we do not deliver to this pincode yet.</p>';
    }
}

// Allow pincode check on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const pincodeInput = document.getElementById('pincode-input');
    if (pincodeInput) {
        pincodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPincode();
            }
        });
    }
});

// ===================================
// Tabs Functionality
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// ===================================
// Tracking Functionality
// ===================================
function trackOrder() {
    const orderId = document.getElementById('order-id').value.trim();
    const resultDiv = document.getElementById('tracking-result');
    
    if (!orderId) {
        alert('Please enter an Order ID');
        return;
    }
    
    // Simulated tracking data (in real app, this would be an API call)
    const trackingData = {
        orderId: orderId,
        status: 'In Transit',
        package: 'Electronics - 2 boxes',
        from: 'Mumbai, Maharashtra',
        to: 'Delhi, NCR',
        eta: '2026-09-20'
    };
    
    // Show tracking result
    document.getElementById('track-order-id').textContent = trackingData.orderId;
    document.getElementById('track-status').textContent = trackingData.status;
    document.getElementById('track-status').className = 'status-badge in-transit';
    document.getElementById('track-package').textContent = trackingData.package;
    document.getElementById('track-from').textContent = trackingData.from;
    document.getElementById('track-to').textContent = trackingData.to;
    document.getElementById('track-eta').textContent = trackingData.eta;
    
    resultDiv.style.display = 'block';
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Allow tracking on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const orderIdInput = document.getElementById('order-id');
    if (orderIdInput) {
        orderIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                trackOrder();
            }
        });
    }
});

// ===================================
// Booking Form Steps
// ===================================
let currentStep = 1;

function nextStep(step) {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Update step indicator
    document.querySelectorAll('.step').forEach(s => {
        const stepNum = parseInt(s.getAttribute('data-step'));
        if (stepNum < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (stepNum === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('active', 'completed');
        }
    });
    
    // Show/hide form steps
    document.querySelectorAll('.form-step').forEach(f => f.classList.remove('active'));
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    
    currentStep = step;
    
    // Update summary on final step
    if (step === 4) {
        updateSummary();
    }
    
    // Scroll to top of form
    document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function prevStep(step) {
    // Update step indicator
    document.querySelectorAll('.step').forEach(s => {
        const stepNum = parseInt(s.getAttribute('data-step'));
        if (stepNum < step) {
            s.classList.add('completed');
        } else if (stepNum === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('active', 'completed');
        }
    });
    
    // Show/hide form steps
    document.querySelectorAll('.form-step').forEach(f => f.classList.remove('active'));
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    
    currentStep = step;
    
    // Scroll to top of form
    document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validateStep(step) {
    let isValid = true;
    let firstInvalidField = null;
    
    const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
    const requiredFields = currentFormStep.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!isValid && firstInvalidField) {
        firstInvalidField.focus();
        alert('Please fill in all required fields');
    }
    
    return isValid;
}

function updateSummary() {
    // Goods details
    document.getElementById('summary-goods-type').textContent = 
        document.getElementById('goods-type').options[document.getElementById('goods-type').selectedIndex].text || 'N/A';
    document.getElementById('summary-goods-desc').textContent = 
        document.getElementById('goods-description').value || 'N/A';
    document.getElementById('summary-quantity').textContent = 
        document.getElementById('quantity').value || 'N/A';
    document.getElementById('summary-weight').textContent = 
        document.getElementById('weight').value || 'N/A';
    document.getElementById('summary-value').textContent = 
        document.getElementById('declared-value').value || 'N/A';
    
    // Pickup details
    document.getElementById('summary-pickup-name').textContent = 
        document.getElementById('pickup-name').value || 'N/A';
    document.getElementById('summary-pickup-phone').textContent = 
        document.getElementById('pickup-phone').value || 'N/A';
    document.getElementById('summary-pickup-address').textContent = 
        `${document.getElementById('pickup-address').value}, ${document.getElementById('pickup-city').value}, ${document.getElementById('pickup-state').value} - ${document.getElementById('pickup-pincode').value}`;
    document.getElementById('summary-pickup-time').textContent = 
        `${document.getElementById('pickup-date').value} ${document.getElementById('pickup-time').value}`;
    
    // Drop details
    document.getElementById('summary-drop-name').textContent = 
        document.getElementById('drop-name').value || 'N/A';
    document.getElementById('summary-drop-phone').textContent = 
        document.getElementById('drop-phone').value || 'N/A';
    document.getElementById('summary-drop-address').textContent = 
        `${document.getElementById('drop-address').value}, ${document.getElementById('drop-city').value}, ${document.getElementById('drop-state').value} - ${document.getElementById('drop-pincode').value}`;
    document.getElementById('summary-service').textContent = 
        document.getElementById('service-type').options[document.getElementById('service-type').selectedIndex].text || 'N/A';
    document.getElementById('summary-payment').textContent = 
        document.getElementById('payment-type').options[document.getElementById('payment-type').selectedIndex].text || 'N/A';
}

// ===================================
// COD Amount Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const paymentType = document.getElementById('payment-type');
    const codAmountGroup = document.getElementById('cod-amount-group');
    
    if (paymentType && codAmountGroup) {
        paymentType.addEventListener('change', function() {
            if (this.value === 'cod') {
                codAmountGroup.style.display = 'block';
                document.getElementById('cod-amount').required = true;
            } else {
                codAmountGroup.style.display = 'none';
                document.getElementById('cod-amount').required = false;
            }
        });
    }
});

// ===================================
// Booking Form Submission
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate terms checkbox
            const termsAgree = document.getElementById('terms-agree');
            if (!termsAgree.checked) {
                alert('Please agree to the Terms & Conditions');
                return;
            }
            
            // Generate order ID
            const orderId = 'JGL-2026-' + Math.floor(10000 + Math.random() * 90000);
            document.getElementById('new-order-id').textContent = orderId;
            
            // Hide form and show success message
            bookingForm.style.display = 'none';
            document.querySelector('.step-indicator').style.display = 'none';
            bookingSuccess.style.display = 'block';
            
            // Scroll to success message
            bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});

function trackNewOrder() {
    const orderId = document.getElementById('new-order-id').textContent;
    
    // Switch to tracking tab
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector('[data-tab="tracking"]').classList.add('active');
    document.getElementById('tracking').classList.add('active');
    
    // Set order ID and trigger tracking
    document.getElementById('order-id').value = orderId;
    trackOrder();
}

function newBooking() {
    // Reset form
    const bookingForm = document.getElementById('booking-form');
    bookingForm.reset();
    
    // Reset steps
    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active', 'completed');
    });
    document.querySelector('.step[data-step="1"]').classList.add('active');
    
    document.querySelectorAll('.form-step').forEach(f => f.classList.remove('active'));
    document.querySelector('.form-step[data-step="1"]').classList.add('active');
    
    // Show form and hide success
    bookingForm.style.display = 'block';
    document.querySelector('.step-indicator').style.display = 'flex';
    document.getElementById('booking-success').style.display = 'none';
    
    currentStep = 1;
}

// ===================================
// Contact Form Submission
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// ===================================
// FAQ Accordion
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===================================
// Form Field Formatting
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Pincode validation - only numbers
    const pincodeInputs = document.querySelectorAll('input[id*="pincode"]');
    pincodeInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 6);
        });
    });
    
    // Phone validation - only numbers
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+]/g, '').substring(0, 15);
        });
    });
    
    // Weight input - allow decimals
    const weightInput = document.getElementById('weight');
    if (weightInput) {
        weightInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
    }
    
    // Set minimum date for pickup to today
    const pickupDate = document.getElementById('pickup-date');
    if (pickupDate) {
        const today = new Date().toISOString().split('T')[0];
        pickupDate.setAttribute('min', today);
    }
});

// ===================================
// Scroll to Top Button
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1e3a5f;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.background = '#f39c12';
        this.style.transform = 'translateY(-3px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.background = '#1e3a5f';
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// Header Scroll Effect
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
});

// ===================================
// Animation on Scroll
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.coverage-card, .promise-card, .service-card, .strength-card, .stat-item, .advantage-card, .team-card, .feature-item, .option-card, .express-card, .ecom-feature, .payment-card, .bulk-card, .office-card, .info-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const elements = document.querySelectorAll('.coverage-card, .promise-card, .service-card, .strength-card, .stat-item, .advantage-card, .team-card, .feature-item, .option-card, .express-card, .ecom-feature, .payment-card, .bulk-card, .office-card, .info-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run on load
    animateOnScroll();
});
