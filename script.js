// Initialize Lucide Icons
lucide.createIcons();

// Copyright year
document.getElementById('copyright').textContent =
  '\u00A9 ' + new Date().getFullYear() + ' Cloud Ware. Todos os direitos reservados.';

// ---- Mobile Menu Toggle ----
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

mobileToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  mobileToggle.setAttribute('aria-label', menuOpen ? 'Fechar menu' : 'Abrir menu');

  // Swap icon
  const iconEl = mobileToggle.querySelector('i');
  iconEl.setAttribute('data-lucide', menuOpen ? 'x' : 'menu');
  lucide.createIcons();
});

// ---- File Upload (Drag & Drop + Click) ----
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadText = document.getElementById('uploadText');
const uploadIconBox = document.getElementById('uploadIconBox');

function setFileName(name) {
  uploadText.innerHTML =
    '<p class="text-sm font-medium text-foreground m-0">' + name + '</p>' +
    '<p class="text-xs text-muted-foreground m-0">Arquivo selecionado</p>';

  // Swap to file-text icon
  const iconEl = uploadIconBox.querySelector('i');
  iconEl.setAttribute('data-lucide', 'file-text');
  iconEl.classList.remove('text-muted-foreground');
  iconEl.classList.add('text-foreground');
  lucide.createIcons();
}

function resetUpload() {
  uploadText.innerHTML =
    '<p class="text-sm font-medium text-foreground m-0">Arraste um arquivo ou clique para selecionar</p>' +
    '<p class="text-xs text-muted-foreground m-0">Suporta .exe, .dll, .pdf, .doc e outros formatos</p>';

  const iconEl = uploadIconBox.querySelector('i');
  iconEl.setAttribute('data-lucide', 'upload');
  iconEl.classList.add('text-muted-foreground');
  iconEl.classList.remove('text-foreground');
  lucide.createIcons();
}

// Drag events
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragging');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragging');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragging');
  const file = e.dataTransfer.files[0];
  if (file) {
    setFileName(file.name);
    // Transfer file to input for form submission
    const dt = new DataTransfer();
    dt.items.add(file);
    fileInput.files = dt.files;
  }
});

// File input change
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    setFileName(file.name);
  }
});

// ---- Submit Button ----
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    // Brief visual feedback - shake
    submitBtn.style.outline = '2px solid rgba(235,235,235,0.2)';
    submitBtn.style.outlineOffset = '2px';
    setTimeout(() => {
      submitBtn.style.outline = 'none';
    }, 400);
    return;
  }

  // Success feedback
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
    resetUpload();
    fileInput.value = '';
  }, 2000);
});
