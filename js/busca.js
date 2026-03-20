const produtos = [
  { nome: "Arroz Camil 5kg", preco: "22,90", mercado: "Supermercado A" },
  { nome: "Feijão Carioca 1kg", preco: "8,50", mercado: "Supermercado B" },
  { nome: "Macarrão Renata 500g", preco: "4,99", mercado: "Supermercado A" },
  { nome: "Óleo de Soja 900ml", preco: "6,99", mercado: "Supermercado C" },
  { nome: "Açúcar Cristal 1kg", preco: "3,99", mercado: "Supermercado B" },
  { nome: "Sal Refinado 1kg", preco: "2,49", mercado: "Supermercado A" },
  { nome: "Leite Integral 1L", preco: "5,79", mercado: "Supermercado C" },
  { nome: "Farinha de Trigo 1kg", preco: "4,29", mercado: "Supermercado B" },
  { nome: "Café Pilão 500g", preco: "14,90", mercado: "Supermercado A" },
  { nome: "Molho de Tomate 340g", preco: "3,49", mercado: "Supermercado C" },
];

function mostrarToast(mensagem, tipo = "sucesso") {
  const toastExistente = document.getElementById("toast-mercadez");
  if (toastExistente) toastExistente.remove();
  const toast = document.createElement("div");
  toast.id = "toast-mercadez";
  toast.innerText = mensagem;
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; padding: 14px 22px;
    border-radius: 10px; font-weight: bold; font-size: 15px; color: white;
    z-index: 9999; box-shadow: 0 4px 14px rgba(0,0,0,0.25); transition: opacity 0.4s ease;
    background-color: ${tipo === "sucesso" ? "#27ae60" : tipo === "erro" ? "#e74c3c" : "#f39c12"};
  `;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 400); }, 3500);
}

function exibirResultados(resultados, termo) {
  const modalExistente = document.getElementById("modal-busca");
  if (modalExistente) modalExistente.remove();
  const modal = document.createElement("div");
  modal.id = "modal-busca";
  modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5); z-index: 9998; display: flex; align-items: center; justify-content: center;`;
  const conteudo = resultados.length === 0
    ? `<div style="text-align:center; padding:20px;"><div style="font-size:48px;">🔍</div>
       <h3>Nenhum resultado encontrado</h3>
       <p style="color:#666;">Nenhum registro para "<strong>${termo}</strong>".</p></div>`
    : `<div><h3>🛒 ${resultados.length} resultado(s) para "<strong>${termo}</strong>"</h3>
       ${resultados.map(p => `
         <div style="display:flex; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #eee;">
           <div><strong>${p.nome}</strong><br><small style="color:#888;">📍 ${p.mercado}</small></div>
           <span style="font-size:18px; font-weight:bold; color:#27ae60;">R$ ${p.preco}</span>
         </div>`).join("")}</div>`;
  modal.innerHTML = `
    <div style="background:white; border-radius:14px; padding:30px; max-width:550px; width:90%;
                max-height:80vh; overflow-y:auto; box-shadow:0 8px 30px rgba(0,0,0,0.2);">
      ${conteudo}
      <button onclick="document.getElementById('modal-busca').remove()"
        style="margin-top:20px; width:100%; padding:12px; border:none; background:#ffc942;
               border-radius:8px; font-weight:bold; cursor:pointer; font-size:15px;">Fechar</button>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });
}

function abrirMenu() {
  document.getElementById("menuLateral").classList.add("ativo");
}

function fecharMenu() {
  document.getElementById("menuLateral").classList.remove("ativo");
}

document.addEventListener("DOMContentLoaded", () => {
  const inputNav = document.querySelector(".pesquisa input");
  if (inputNav) {
    inputNav.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const termo = inputNav.value.trim().toLowerCase();
        if (!termo) { mostrarToast("Digite algo para buscar!", "aviso"); return; }
        const resultados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
        exibirResultados(resultados, termo);
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Busca da barra laranja (todas as páginas)
  const inputNav = document.querySelector(".pesquisa input");
  if (inputNav) {
    inputNav.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const termo = inputNav.value.trim().toLowerCase();
        if (!termo) { mostrarToast("Digite algo para buscar!", "aviso"); return; }
        const resultados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
        exibirResultados(resultados, termo);
      }
    });
  }

  // Busca do hero (index.html)
  const inputHero = document.querySelector(".busca input");
  const btnHero = document.querySelector(".busca button");
  if (inputHero && btnHero) {
    btnHero.addEventListener("click", () => {
      const termo = inputHero.value.trim().toLowerCase();
      if (!termo) { mostrarToast("Digite algo para buscar!", "aviso"); return; }
      const resultados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
      exibirResultados(resultados, termo);
    });
    inputHero.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const termo = inputHero.value.trim().toLowerCase();
        if (!termo) { mostrarToast("Digite algo para buscar!", "aviso"); return; }
        const resultados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
        exibirResultados(resultados, termo);
      }
    });
  }
});