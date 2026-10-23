const profileData = {
  j: {title:"J Profile", desc:"A practical, sculpted grip that creates a confident opening line across contemporary cabinetry.", variants:["Left Hand J","Right Hand J","Full J"], category:"curved", photo:"photo-j"},
  concave: {title:"Concave Profile", desc:"A softly recessed form that gives fingers a natural place to reach while keeping the front visually calm.", variants:["Left Concave","Right Concave","Center Concave"], category:"curved", photo:"photo-concave"},
  teardrop: {title:"Teardrop Profile", desc:"A distinctive rounded detail for cabinetry where a soft, tactile gesture adds character to a clean front.", variants:["Center Teardrop"], category:"curved", photo:"photo-teardrop"},
  fullc: {title:"Full C Profile", desc:"A continuous curved profile that wraps the edge with a smooth, considered silhouette.", variants:["Full C"], category:"curved", photo:"photo-fullc"},
  w: {title:"W Profile", desc:"A more graphic profile with a defined central geometry, designed for a precise architectural expression.", variants:["W Profile"], category:"angular", photo:"photo-w"},
  diamond: {title:"Diamond Profile", desc:"Faceted geometry brings a crisp line to the furniture front, with options for different opening positions.", variants:["Left Diamond","Right Diamond","Center Diamond"], category:"angular", photo:"photo-diamond"},
  straight: {title:"Straight Profile", desc:"An understated, linear edge for projects that call for a clean and minimal visual language.", variants:["Straight"], category:"linear", photo:"photo-straight"},
  "45": {title:"45° Profile", desc:"A precise angled edge that creates a neat shadow line and a refined alternative to external handles.", variants:["45° Edge"], category:"angular", photo:"photo-45"}
};

const modal = document.getElementById("profileModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalVariants = document.getElementById("modalVariants");
const modalPhoto = document.getElementById("modalPhoto");
const modalEnquire = document.getElementById("modalEnquire");
let lastFocused = null;

function openProfile(key) {
  const item = profileData[key];
  if (!item) return;
  lastFocused = document.activeElement;
  modalTitle.textContent = item.title;
  modalDescription.textContent = item.desc;
  modalPhoto.className = "modal-photo " + item.photo;
  modalVariants.replaceChildren();
  item.variants.forEach(variant => {
    const pill = document.createElement("span");
    pill.className = "variant-pill";
    pill.textContent = variant;
    modalVariants.appendChild(pill);
  });
  modalEnquire.href = "mailto:hello@everlast.com.sg?subject=" + encodeURIComponent("Enquiry — " + item.title + " | Edge Profile Collection 2026");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}
function closeProfile() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}
document.querySelectorAll(".open-profile").forEach(button => {
  button.addEventListener("click", () => openProfile(button.dataset.profile));
});
document.querySelector(".modal-close").addEventListener("click", closeProfile);
modal.addEventListener("click", event => { if (event.target === modal) closeProfile(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("open")) closeProfile(); });

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(filter => filter.classList.remove("active"));
    button.classList.add("active");
    const selected = button.dataset.filter;
    document.querySelectorAll(".profile-card").forEach(card => {
      card.classList.toggle("is-hidden", selected !== "all" && card.dataset.category !== selected);
    });
  });
});
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
