// Initialize Lucide Icons
lucide.createIcons();

document.getElementById('copyright').textContent =
  '\u00A9 ' + new Date().getFullYear() + ' Cloud Ware. Todos os direitos reservados.';

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadText = document.getElementById('uploadText');
const uploadIconBox = document.getElementById('uploadIconBox');
const submitBtn = document.getElementById('submitBtn');
const processingOverlay = document.getElementById('processingOverlay');
const scanProgress = document.getElementById('scanProgress');
const sizeModalOverlay = document.getElementById('sizeModalOverlay');
const sizeModalClose = document.getElementById('sizeModalClose');
const sizeModalBtn = document.getElementById('sizeModalBtn');
const resultCard = document.getElementById('resultCard');
const resultIconBox = document.getElementById('resultIconBox');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultSubtitle = document.getElementById('resultSubtitle');
const resultDetails = document.getElementById('resultDetails');

let menuOpen = false;

// ---- Mobile Menu ----
mobileToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  mobileToggle.setAttribute('aria-label', menuOpen ? 'Fechar menu' : 'Abrir menu');
  const iconEl = mobileToggle.querySelector('i');
  iconEl.setAttribute('data-lucide', menuOpen ? 'x' : 'menu');
  lucide.createIcons();
});

function setFileName(name) {
  uploadText.innerHTML =
    '<p class="text-sm font-medium text-foreground m-0">' + name + '</p>' +
    '<p class="text-xs text-muted-foreground m-0">Arquivo selecionado</p>';
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

function isFileTooLarge(file) {
  return file.size > MAX_FILE_SIZE;
}

function showSizeModal() {
  sizeModalOverlay.classList.add('active');
}

function hideSizeModal() {
  sizeModalOverlay.classList.remove('active');
}

sizeModalClose.addEventListener('click', () => {
  hideSizeModal();
  resetUpload();
  fileInput.value = '';
});

sizeModalBtn.addEventListener('click', () => {
  hideSizeModal();
  resetUpload();
  fileInput.value = '';
  fileInput.click();
});

sizeModalOverlay.addEventListener('click', (e) => {
  if (e.target === sizeModalOverlay) {
    hideSizeModal();
    resetUpload();
    fileInput.value = '';
  }
});

function handleFileSelected(file) {
  if (isFileTooLarge(file)) {
    showSizeModal();
    fileInput.value = '';
    return;
  }
  setFileName(file.name);
}

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
    const dt = new DataTransfer();
    dt.items.add(file);
    fileInput.files = dt.files;
    handleFileSelected(file);
  }
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) handleFileSelected(file);
});

// ---- API (conectado ao backend) ----
const API_BASE = '';

async function scanFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/scan/scan`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Erro ' + res.status);
  }
  return res.json();
}

function showProcessing() {
  scanProgress.style.width = '0%';
  processingOverlay.classList.add('active');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 95) {
      progress = 95;
      clearInterval(interval);
    }
    scanProgress.style.width = progress + '%';
  }, 300);
  return interval;
}

function finishProcessing(interval, success, data) {
  clearInterval(interval);
  scanProgress.style.width = '100%';
  setTimeout(() => {
    hideProcessing();
    if (success && data) {
      showResultCard(data);
    } else if (success) {
      showComplete();
    }
  }, 500);
}

function hideProcessing() {
  processingOverlay.classList.remove('active');
}

// ---- Card de resposta do scan (dados do backend) ----
function showResultCard(data) {
  const infected = data.infected === true;
  const riskLevel = data.risk_level || (infected ? 'alto' : 'nenhum');
  const details = Array.isArray(data.details) ? data.details : [];
  const filename = data.filename || 'Arquivo';

  resultCard.classList.remove('hidden');
  resultTitle.textContent = infected ? 'Ameaça detectada' : 'Nenhuma ameaça detectada';
  resultSubtitle.textContent = filename;

  resultIcon.setAttribute('data-lucide', infected ? 'shield-alert' : 'shield-check');
  resultIcon.style.color = infected ? '#ef4444' : '#16a34a';

  let html = '';
  html += '<p class="m-0"><strong>Status:</strong> ' + (data.status || 'done') + '</p>';
  html += '<p class="m-0"><strong>Nível de risco:</strong> ' + String(riskLevel) + '</p>';
  if (details.length > 0) {
    html += '<p class="m-0 mt-2"><strong>Detalhes:</strong></p>';
    details.forEach(function (d) {
      html += '<p class="m-0 pl-2 text-muted-foreground">' + (typeof d === 'string' ? d : JSON.stringify(d)) + '</p>';
    });
  }
  resultDetails.innerHTML = html;

  lucide.createIcons();
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

  submitBtn.innerHTML = 'Enviar para análise <i data-lucide="arrow-right" class="w-4 h-4" style="stroke-width:2;"></i>';
  submitBtn.style.backgroundColor = '';
  submitBtn.style.color = '';
  lucide.createIcons();
  resetUpload();
  fileInput.value = '';

  setTimeout(() => {
    resultCard.classList.add('hidden');
  }, 15000);
}

function showComplete() {
  resultCard.classList.add('hidden');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<span>Análise concluída</span>' +
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
  }, 2500);
}

submitBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) {
    submitBtn.style.outline = '2px solid rgba(235,235,235,0.2)';
    submitBtn.style.outlineOffset = '2px';
    setTimeout(() => {
      submitBtn.style.outline = 'none';
    }, 400);
    return;
  }

  const interval = showProcessing();
  try {
    const data = await scanFile(file);
    finishProcessing(interval, true, data);
  } catch (err) {
    clearInterval(interval);
    hideProcessing();
    alert(err.message || 'Erro ao analisar o arquivo.');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (sizeModalOverlay.classList.contains('active')) {
      hideSizeModal();
      resetUpload();
      fileInput.value = '';
    }
  }
});
