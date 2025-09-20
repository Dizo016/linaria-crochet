const menuItems = [
  { anchor: "home", label: "Home", icon: "fa-home", active: true },
  { anchor: "products", label: "Produtos", icon: "fa-tshirt" },
  { anchor: "about", label: "Sobre Nós", icon: "fa-heart" },
  { anchor: "gallery", label: "Galeria", icon: "fa-images" },
  { anchor: "blog", label: "Blog", icon: "fa-pen", extraClass: "blog" },
  { anchor: "contactus", label: "Contato", icon: "fa-envelope" }
];

const menu = document.getElementById("pp-menu");
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const overlay = document.querySelector('.overlay');

// Função para criar os itens do menu
function createMenuItems() {
  menuItems.forEach(item => {
    const li = document.createElement("li");
    li.dataset.menuanchor = item.anchor;

    if (item.active) li.classList.add("active");
    if (item.extraClass) li.classList.add(item.extraClass);

    const a = document.createElement("a");
    a.className = "nav-link";

    if (item.anchor === "about") {
      a.href = "quemsomos.html";
    } else if (item.anchor === "contactus") {
      a.href = "#contact";
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ 
          behavior: 'smooth' 
        });
        // Fecha o menu mobile se estiver aberto
        if (window.innerWidth <= 768 && menu.classList.contains('active')) {
          toggleMobileMenu();
        }
      });
    } else {
      a.href = `#${item.anchor}`;
    }

    const icon = document.createElement("i");
    icon.className = `fas ${item.icon}`;

    // Adiciona span para o texto do menu
    const textSpan = document.createElement("span");
    textSpan.textContent = item.label;

    a.appendChild(icon);
    a.appendChild(textSpan); // Adiciona o span com o texto

    li.appendChild(a);
    menu.appendChild(li);
  });
}

// Função para alternar o menu mobile
function toggleMobileMenu() {
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
  
  // Altera o ícone do botão
  const icon = mobileMenuToggle.querySelector('i');
  if (menu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

// Fecha o menu ao clicar em um link
menu.addEventListener("click", e => {
  if (e.target.tagName === "A" || e.target.parentElement.tagName === "A") {
    document.querySelectorAll("#pp-menu li").forEach(li => li.classList.remove("active"));
    
    let targetElement = e.target;
    if (targetElement.tagName === "I") {
      targetElement = targetElement.parentElement;
    }
    
    targetElement.parentElement.classList.add("active");
    
    // Fecha o menu mobile após clicar em um link
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    }
  }
});

// Fecha o menu ao clicar no overlay
overlay.addEventListener('click', () => {
  if (window.innerWidth <= 768 && menu.classList.contains('active')) {
    toggleMobileMenu();
  }
});

// Fecha o menu ao redimensionar a janela para tamanho maior
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

// Inicializa o menu quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  createMenuItems();
  
  // Adiciona evento de clique no botão do menu mobile
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
});