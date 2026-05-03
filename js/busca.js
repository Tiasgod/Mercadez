// ==============================================
// BUSCA DE PRODUTOS - busca.js
// Carrega produtos da API e filtra localmente
// ==============================================

let produtos = [];

async function carregarProdutosDaAPI() {
  try {
    const response = await fetch(`${API_URL}/produtos`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    produtos = data.map((p) => ({
      nome:    p.nomeProduto,
      preco:   Number(p.preco).toFixed(2).replace(".", ","),
      mercado: p.mercado || "Mercadez",
    }));
  } catch (err) {
    console.warn("Não foi possível carregar produtos da API.", err);
    produtos = [];
  }
}

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
  modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(0,0,0,0.5);z-index:9998;display:flex;align-items:center;justify-content:center;`;
  const conteudo = resultados.length === 0
    ? `<div style="text-align:center;padding:20px;">
         <div style="font-size:48px;">🔍</div>
         <h3>Nenhum resultado encontrado</h3>
         <p style="color:#666;">Nenhum produto para "<strong>${termo}</strong>".</p>
       </div>`
    : `<div>
         <h3>🛒 ${resultados.length} resultado(s) para "<strong>${termo}</strong>"</h3>
         ${resultados.map(p => `
           <div style="display:flex;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eee;">
             <div><strong>${p.nome}</strong><br><small style="color:#888;">📍 ${p.mercado}</small></div>
             <span style="font-size:18px;font-weight:bold;color:#27ae60;">R$ ${p.preco}</span>
           </div>`).join("")}
       </div>`;
  modal.innerHTML = `
    <div style="background:white;border-radius:14px;padding:30px;max-width:550px;width:90%;
                max-height:80vh;overflow-y:auto;box-shadow:0 8px 30px rgba(0,0,0,0.2);">
      ${conteudo}
      <button onclick="document.getElementById('modal-busca').remove()"
        style="margin-top:20px;width:100%;padding:12px;border:none;background:#ffc942;
               border-radius:8px;font-weight:bold;cursor:pointer;font-size:15px;">Fechar</button>
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

document.addEventListener("DOMContentLoaded", async () => {
  await carregarProdutosDaAPI();

  function buscar(termo) {
    if (!termo) { mostrarToast("Digite algo para buscar!", "aviso"); return; }
    const resultados = produtos.filter(p => p.nome.toLowerCase().includes(termo.toLowerCase()));
    exibirResultados(resultados, termo);
  }

  const inputNav = document.querySelector(".pesquisa input");
  if (inputNav) {
    inputNav.addEventListener("keypress", (e) => {
      if (e.key === "Enter") buscar(inputNav.value.trim());
    });
  }

  const inputHero = document.querySelector(".busca input");
  const btnHero   = document.querySelector(".busca button");
  if (inputHero && btnHero) {
    btnHero.addEventListener("click", () => buscar(inputHero.value.trim()));
    inputHero.addEventListener("keypress", (e) => {
      if (e.key === "Enter") buscar(inputHero.value.trim());
    });
  }
});
