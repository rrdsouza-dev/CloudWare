// ---------- Inicializa ícones Lucide ----------
// Inicializa todos os ícones da biblioteca
lucide.createIcons(); // cria ícones visuais na página

// ---------- Copyright dinâmico ----------
document.getElementById('copyright').textContent =
  '\u00A9 ' + new Date().getFullYear() + ' Cloud Ware. Todos os direitos reservados.'; 
// exibe o ano atual automaticamente

// ---------- Mobile Menu Toggle ----------
const mobileToggle = document.getElementById('mobileToggle'); // botão do menu mobile
const mobileMenu = document.getElementById('mobileMenu'); // menu que abre e fecha
let menuOpen = false; // controla estado do menu

mobileToggle.addEventListener('click', () => { // quando clicar no botão
  menuOpen = !menuOpen; // alterna estado
  mobileMenu.classList.toggle('open', menuOpen); // abre/fecha menu
  mobileToggle.setAttribute('aria-label', menuOpen ? 'Fechar menu' : 'Abrir menu'); // acessibilidade

  const iconEl = mobileToggle.querySelector('i'); // troca ícone
  iconEl.setAttribute('data-lucide', menuOpen ? 'x' : 'menu'); // muda ícone do botão
  lucide.createIcons(); // renderiza o ícone atualizado
});

// ---------- File Upload ----------
const uploadArea = document.getElementById('uploadArea'); // área drag & drop
const fileInput = document.getElementById('fileInput'); // input escondido
const uploadText = document.getElementById('uploadText'); // texto que mostra nome do arquivo
const uploadIconBox = document.getElementById('uploadIconBox'); // ícone do upload

// Função para atualizar nome do arquivo selecionado
function setFileName(name) {
  uploadText.innerHTML =
    '<p class="text-sm font-medium text-foreground m-0">' + name + '</p>' +
    '<p class="text-xs text-muted-foreground m-0">Arquivo selecionado</p>'; // mostra nome do arquivo

  const iconEl = uploadIconBox.querySelector('i'); // troca ícone
  iconEl.setAttribute('data-lucide', 'file-text'); // muda para ícone de arquivo
  iconEl.classList.remove('text-muted-foreground');
  iconEl.classList.add('text-foreground');
  lucide.createIcons(); // renderiza ícone
}

// Função para resetar área de upload
function resetUpload() {
  uploadText.innerHTML =
    '<p class="text-sm font-medium text-foreground m-0">Arraste um arquivo ou clique para selecionar</p>' +
    '<p class="text-xs text-muted-foreground m-0">Suporta .exe, .dll, .pdf, .doc e outros formatos</p>'; // texto padrão

  const iconEl = uploadIconBox.querySelector('i'); // reseta ícone
  iconEl.setAttribute('data-lucide', 'upload');
  iconEl.classList.add('text-muted-foreground');
  iconEl.classList.remove('text-foreground');
  lucide.createIcons();
}

// ---------- Eventos Drag & Drop ----------
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault(); // evita comportamento padrão do navegador
  uploadArea.classList.add('dragging'); // adiciona efeito visual
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragging'); // remove efeito
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragging'); // remove efeito
  const file = e.dataTransfer.files[0]; // pega o arquivo
  if (file) {
    setFileName(file.name); // mostra nome
    const dt = new DataTransfer(); // cria data transfer
    dt.items.add(file); // adiciona arquivo
    fileInput.files = dt.files; // coloca no input escondido
  }
});

// ---------- Input change ----------
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) setFileName(file.name); // atualiza nome se mudou pelo input
});

// ---------- Submit Button (envio para API) ----------
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', async () => {
  const file = fileInput.files[0]; // pega arquivo selecionado
  if (!file) {
    // feedback visual rápido se nenhum arquivo selecionado
    submitBtn.style.outline = '2px solid rgba(235,235,235,0.2)';
    submitBtn.style.outlineOffset = '2px';
    setTimeout(() => { submitBtn.style.outline = 'none'; }, 400);
    return; // não envia nada
  }

  // ---------- Envia arquivo para a API ----------
  const formData = new FormData(); // cria form data
  formData.append("file", file); // adiciona arquivo

  try {
    // envia POST para backend FastAPI
    const response = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json(); // lê resposta JSON
    console.log(data); // mostra resultado no console (você pode usar pra atualizar cards)
    
    // ---------- Feedback visual de sucesso ----------
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<span>Arquivo enviado</span>' +
      '<i data-lucide="check" class="w-4 h-4" style="stroke-width:2;"></i>';
    submitBtn.style.backgroundColor = '#16a34a';
    submitBtn.style.color = '#ffffff';
    lucide.createIcons();

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.backgroundColor = '';
      submitBtn.style.color = '';
      lucide.createIcons();
      resetUpload(); // limpa área de upload
      fileInput.value = ''; // reseta input
    }, 2000);

  } catch (err) {
    console.error(err);
    alert("Erro ao enviar arquivo"); // feedback se a API falhar
  }
});
