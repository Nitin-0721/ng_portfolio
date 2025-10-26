gsap.registerPlugin(ScrollTrigger);

//   Hero Animations  
gsap.from("#hero-text", {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "power4.out",
});

gsap.from(".hero-content p", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.5,
});

gsap.from("#home .btn", {  
  opacity: 0,
  scale: 0,
  duration: 1,
  delay: 1,
  ease: "elastic.out(1,0.5)",
});

//  About Section 
gsap.from(".about-container img", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 1.2,
});

gsap.from(".about-text", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
  },
  x: 100,
  opacity: 0,
  duration: 1.2,
  delay: 0.3,
});

//Skills Section  
gsap.from(".skill-card", {
  scrollTrigger: {
    trigger: ".skills-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.3,  
  ease: "power4.out",
});

// Projects Section  
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
});

// Contact Section  
gsap.from("#contact h2", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  },
  y: -50,
  opacity: 0,
  duration: 1,
});

gsap.from("#contact form", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.3,
});

// Navbar toggle button
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.querySelector("i").classList.toggle("fa-bars");
  menuToggle.querySelector("i").classList.toggle("fa-xmark");
});

//  Hero Floating Particles  
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleCount = window.innerWidth < 768 ? 50 : 100;
let particles = [];

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    });
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    
     ctx.fillStyle = "#00bfff";  
    
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Resize handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particleCount = window.innerWidth < 768 ? 50 : 100;
  initParticles();
});

//   Contact Form Submission  
 document.addEventListener("DOMContentLoaded", function() {
    
     const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

     form.addEventListener("submit", function(event) {
        
         event.preventDefault(); 

         const formData = new FormData(form);
        const actionURL = form.action;

         fetch(actionURL, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())  
        .then(data => {
            if (data.created) {
                 successMessage.style.display = 'block';
                form.reset();  

                 setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            } else {
                 alert("There was a problem. Please try again.");
            }
        })
        .catch(error => {
             console.error('Error submitting form:', error);
            alert("An error occurred. Please check the console and try again.");
        });
    });
});