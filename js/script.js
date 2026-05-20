const products = [
  { id: 1, name: "Gorro Infantil",    price: "R$ 45,00",  icon: "fa-child" },
  { id: 2, name: "Cachecol Clássico", price: "R$ 65,00",  icon: "fa-scarf" },
  { id: 3, name: "Tapete Redondo",    price: "R$ 120,00", icon: "fa-circle" },
  { id: 4, name: "Amigurumi Gatinho", price: "R$ 85,00",  icon: "fa-cat" },
  { id: 5, name: "Bolsa Crochê",      price: "R$ 150,00", icon: "fa-bag-shopping" },
  { id: 6, name: "Conjunto Bebê",     price: "R$ 180,00", icon: "fa-baby" },
  { id: 7, name: "Xale Elegante",     price: "R$ 95,00",  icon: "fa-shirt" },
  { id: 8, name: "Toalha de Mesa",    price: "R$ 135,00", icon: "fa-table" }
];

const grid = document.getElementById("product-grid");

function createProductCards() {
  grid.innerHTML = '';

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.transitionDelay = `${index * 0.08}s`;

    const iconWrap = document.createElement("div");
    iconWrap.className = "card-icon-wrap";

    const icon = document.createElement("i");
    icon.className = `fas ${product.icon}`;
    iconWrap.appendChild(icon);

    const title = document.createElement("h2");
    title.textContent = product.name;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = product.price;

    const button = document.createElement("button");
    button.innerHTML = '<i class="fab fa-instagram"></i> Comprar pelo Instagram';
    button.onclick = () => window.open("https://www.instagram.com/thaly_arj/", "_blank");

    card.appendChild(iconWrap);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);
    grid.appendChild(card);
  });
}

function checkVisibility() {
  document.querySelectorAll('.card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.88 && rect.bottom >= 0) {
      card.classList.add('visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createProductCards();
  setTimeout(() => {
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
  }, 200);
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    createProductCards();
    setTimeout(checkVisibility, 100);
  }, 250);
});
