//---Dropdown Script---
document.addEventListener("DOMContentLoaded", () => {
    const dropdownWrappers = document.querySelectorAll('.nav-item-dropdown');
    const backdrop = document.querySelector('.nav-backdrop');

    dropdownWrappers.forEach(wrapper => {
        const link = wrapper.querySelector('.nav-dropdown');
        const menu = wrapper.querySelector('.dropdown-menu') || wrapper.querySelector('.dropdown-menu1');
        let timeout;

        wrapper.addEventListener('mouseenter', () => {

            dropdownWrappers.forEach(otherWrapper => {
                if (otherWrapper !== wrapper) { // Only target the ones we are NOT currently hovering over
                    const otherLink = otherWrapper.querySelector('.nav-dropdown');
                    const otherMenu = otherWrapper.querySelector('.dropdown-menu') || otherWrapper.querySelector('.dropdown-menu1');
                    
                    // Cancel any pending close animations for the other menus
                    clearTimeout(otherWrapper.leaveTimeout); 
                    
                    // Instantly hide them
                    if (otherMenu) otherMenu.classList.remove('show');
                    if (otherLink) otherLink.classList.remove('active');
                }
            });

            clearTimeout(timeout);
            menu.classList.add('show');
            link.classList.add('active');
            if (backdrop) {
                backdrop.classList.add('show');
            }
        });

        wrapper.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                menu.classList.remove('show');
                link.classList.remove('active');
                
                // Check if any dropdown is still active
                const anyActive = Array.from(dropdownWrappers).some(w => {
                    const m = w.querySelector('.dropdown-menu') || w.querySelector('.dropdown-menu1');
                    return m.classList.contains('show');
                });
                
                if (!anyActive && backdrop) {
                    backdrop.classList.remove('show');
                }
            }, 150);
        });
    });
    
    // Footer Language Dropdown
    const langBtn = document.querySelector('.footer-lang-btn');
    const langMenu = document.querySelector('.lang-dropdown-menu');

    if (langBtn && langMenu) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('show');
            langBtn.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!langMenu.contains(e.target) && !langBtn.contains(e.target)) {
                langMenu.classList.remove('show');
                langBtn.classList.remove('active');
            }
        });
    }

    // Parallax effect for Feature Boxes
    const parallaxBoxes = document.querySelectorAll('.feature-box-1-1, .feature-box-2, .feature-box-4, .feature-box-5, .feature-box-6');
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            parallaxBoxes.forEach(box => {
                const wrapper = box.closest('.feature-wrapper');
                if (wrapper) {
                    const rect = wrapper.getBoundingClientRect();
                    // Calculate offset based on distance from viewport center
                    const distanceFromCenter = rect.top - window.innerHeight / 2;
                    // A negative factor means as you scroll down (rect.top decreases), 
                    // the element's translateY becomes more positive (moves down relative to container).
                    // We also subtract 100px to shift all elements UP from their default CSS positions
                    const offset = (distanceFromCenter * -0.25) - 150;
                    box.style.transform = `translateY(${offset}px)`;
                }
            });
        });
    });
});