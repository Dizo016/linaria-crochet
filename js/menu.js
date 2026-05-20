const menuItems = [
  { anchor: "home",      label: "Home",      icon: "fa-home",   active: true },
  { anchor: "products",  label: "Produtos",  icon: "fa-tshirt" },
  { anchor: "about",     label: "Sobre Nós", icon: "fa-heart" },
  { anchor: "gallery",   label: "Galeria",   icon: "fa-images" },
  { anchor: "blog",      label: "Blog",      icon: "fa-pen",    extraClass: "blog" },
  { anchor: "contactus", label: "Contato",   icon: "fa-envelope" }
];

const menu              = document.getElementById("pp-menu");
const mobileMenuToggle  = document.querySelector('.mobile-menu-toggle');
const overlay           = document.querySelector('.overlay');
const navbar            = document.getElementById('navbar');

function createMenuItems() {
  menuItems.forEach(item => {
    const li = document.createElement("li");
    li.dataset.menuanchor = item.anchor;
    if (item.active)     li.classList.add("active");
    if (item.extraClass) li.classList.add(item.extraClass);

    const a = document.createElement("a");
    a.className = "nav-link";

    if (item.anchor === "about") {
      a.href = "quemsomos.html";
    } else if (item.anchor === "contactus") {
      a.href = "#contact";
      a.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth <= 768 && menu.classList.contains('active')) {
          toggleMobileMenu();
        }
      });
    } else {
      a.href = `#${item.anchor}`;
    }

    const icon = document.createElement("i");
    icon.className = `fas ${item.icon}`;

    const span = document.createElement("span");
    span.textContent = item.label;

    a.appendChild(icon);
    a.appendChild(span);
    li.appendChild(a);
    menu.appendChild(li);
  });
}

function toggleMobileMenu() {
  const isOpen = menu.classList.toggle('active');
  overlay.classList.toggle('active', isOpen);
  document.body.classList.toggle('no-scroll', isOpen);

  const icon = mobileMenuToggle.querySelector('i');
  icon.classList.toggle('fa-bars',  !isOpen);
  icon.classList.toggle('fa-times',  isOpen);
}

menu.addEventListener("click", e => {
  let target = e.target;
  if (target.tagName === "I") target = target.parentElement;
  if (target.tagName === "SPAN") target = target.parentElement;
  if (target.tagName !== "A") return;

  document.querySelectorAll("#pp-menu li").forEach(li => li.classList.remove("active"));
  target.parentElement.classList.add("active");

  if (window.innerWidth <= 768 && menu.classList.contains('active')) {
    toggleMobileMenu();
  }
});

overlay.addEventListener('click', () => {
  if (menu.classList.contains('active')) toggleMobileMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menu.classList.contains('active')) {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
});

document.addEventListener('DOMContentLoaded', () => {
  createMenuItems();
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
});
