document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Menu Hamburger Mobile (US7.1)
    // ==========================================
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar a");

    if (hamburgerBtn && navbar) {
        hamburgerBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
            hamburgerBtn.classList.toggle("open");
        });

        // Fermeture automatique au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                hamburgerBtn.classList.remove("open");
            });
        });
    }

    // ==========================================
    // 2. Compte à rebours dynamique (US1.2)
    // ==========================================
    const countdownContainer = document.getElementById("countdown");
    // Date cible du festival (exemple : 21 août 2026 à 14h00)
    const targetDate = new Date("2026-08-21T14:00:00").getTime();

    function updateCountdown() {
        if (!countdownContainer) return;

        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            countdownContainer.innerHTML = "<p>Le festival est lancé ! 🎉</p>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            <div class="time-box"><span>${days}</span><label>Jours</label></div>
            <div class="time-box"><span>${hours}</span><label>Heures</label></div>
            <div class="time-box"><span>${minutes}</span><label>Min</label></div>
            <div class="time-box"><span>${seconds}</span><label>Sec</label></div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // 3. Onglets du Programme (US2.1 & US2.2)
    // ==========================================
    const tabButtons = document.querySelectorAll(".programme-tabs button");
    const dayBlocks = document.querySelectorAll(".programme-day");

    if (tabButtons.length > 0 && dayBlocks.length > 0) {
        // Afficher par défaut le premier jour (Vendredi)
        dayBlocks.forEach(block => block.style.display = "none");
        const defaultDay = tabButtons[0].getAttribute("data-day");
        const initialBlock = document.querySelector(`.programme-day[data-day="${defaultDay}"]`);
        if (initialBlock) initialBlock.style.display = "block";
        tabButtons[0].classList.add("active");

        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const selectedDay = button.getAttribute("data-day");

                tabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                dayBlocks.forEach(block => {
                    if (block.getAttribute("data-day") === selectedDay) {
                        block.style.display = "block";
                    } else {
                        block.style.display = "none";
                    }
                });
            });
        });
    }

    // ==========================================
    // 4. Filtre Line-up par Catégorie (US3.2)
    // ==========================================
    const filterButtons = document.querySelectorAll(".line-up-filters .filter-btn");
    const artistCards = document.querySelectorAll(".artist-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            artistCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ==========================================
    // 5. Validation Formulaire Contact (US6.2 & US6.3)
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();

            if (name === "" || phone === "") {
                formMessage.style.color = "#dc3545";
                formMessage.textContent = "Veuillez remplir au moins le nom et le téléphone.";
                return;
            }

            formMessage.style.color = "#28a745";
            formMessage.textContent = "Merci ! Votre message a été bien pris en compte.";
            contactForm.reset();
        });
    }
});