const products = [
  { id: 1, name: "Gorro Infantil", price: "R$ 45,00", icon: "fa-child" },
  { id: 2, name: "Cachecol Clássico", price: "R$ 65,00", icon: "fa-scarf" },
  { id: 3, name: "Tapete Redondo", price: "R$ 120,00", icon: "fa-circle" },
  { id: 4, name: "Amigurumi Gatinho", price: "R$ 85,00", icon: "fa-cat" },
  { id: 5, name: "Bolsa Crochê", price: "R$ 150,00", icon: "fa-bag-shopping" },
  { id: 6, name: "Conjunto Bebê", price: "R$ 180,00", icon: "fa-baby" },
  { id: 7, name: "Xale Elegante", price: "R$ 95,00", icon: "fa-shirt" },
  { id: 8, name: "Toalha de Mesa", price: "R$ 135,00", icon: "fa-table" }
];

const grid = document.getElementById("product-grid");

// Função para criar os cards de produtos
function createProductCards() {
  grid.innerHTML = ''; // Limpa o grid antes de adicionar os produtos
  
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.transitionDelay = `${index * 0.1}s`;

    const icon = document.createElement("i");
    icon.className = `fas ${product.icon}`;
    
    const title = document.createElement("h2");
    title.textContent = product.name;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = product.price;

    const button = document.createElement("button");
    button.innerHTML = '<i class="fab fa-instagram"></i> Comprar pelo Instagram';
    button.onclick = () => window.open("https://www.instagram.com/thaly_arj/", "_blank");

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);
    grid.appendChild(card);
  });
}

// Verificar quando elementos entram na viewport
function checkVisibility() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
    
    if (isVisible) {
      card.classList.add('visible');
    }
  });
}

// Inicializa os cards quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  createProductCards();
  
  // Animar cards quando entrarem na viewport
  setTimeout(() => {
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verificar inicialmente
  }, 300);
});

// Atualiza o layout quando a janela for redimensionada
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Força o redesenho dos cards para ajustar o layout
    createProductCards();
    setTimeout(checkVisibility, 100);
  }, 250);
});