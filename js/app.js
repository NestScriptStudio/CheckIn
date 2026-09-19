// GANTI DENGAN URL WEB APP GOOGLE APPS SCRIPT ANDA
const API_URL =
  "https://script.google.com/macros/s/AKfycbxg9eN8Ec04hGYtno-J-toDeCWMzgKa1vDnLMA22wwXwfMSjWJocGkfEr3X3e_nMvA4Rw/exec";

// Utilitas Kategori Waktu Otomatis
function getKategoriWaktu() {
  const now = new Date();
  const hours = now.getHours();
  return hours < 11 ? "Pagi" : "Siang";
}

// Modal Notification System Global
function showModal(title, message, isError = false, onConfirm = null) {
  let modalEl = document.getElementById("globalModal");
  if (!modalEl) {
    const html = `
      <div id="globalModal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all scale-95 duration-300 border border-slate-100">
          <div class="flex items-center gap-3 mb-4">
            <div id="modalIcon" class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0"></div>
            <h3 id="modalTitle" class="text-lg font-bold text-slate-800"></h3>
          </div>
          <div id="modalMessage" class="text-slate-600 text-sm mb-6 leading-relaxed"></div>
          <div class="flex justify-end gap-2">
            <button id="modalBtn" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-colors shadow-lg shadow-blue-500/20">OK</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", html);
    modalEl = document.getElementById("globalModal");
  }

  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalIcon = document.getElementById("modalIcon");
  const modalBtn = document.getElementById("modalBtn");

  modalTitle.innerText = title;

  // Mengubah innerText menjadi innerHTML agar markup HTML (tabel, div, dll) dirender dengan benar
  modalMessage.innerHTML = message;

  if (isError) {
    modalIcon.className =
      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-red-100 text-red-600 shrink-0";
    modalIcon.innerText = "!";
  } else {
    modalIcon.className =
      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-emerald-100 text-emerald-600 shrink-0";
    modalIcon.innerText = "✓";
  }

  modalEl.classList.remove("hidden");
  setTimeout(
    () => modalEl.querySelector("div").classList.remove("scale-95"),
    10,
  );

  modalBtn.onclick = () => {
    modalEl.querySelector("div").classList.add("scale-95");
    setTimeout(() => {
      modalEl.classList.add("hidden");
      if (onConfirm) onConfirm();
    }, 150);
  };
}

// Global Loading Indicator
function showLoading(show = true) {
  let loader = document.getElementById("globalLoader");
  if (!loader && show) {
    const html = `
      <div id="globalLoader" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
        <div class="bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-sm font-semibold text-slate-700">Memproses Data...</span>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", html);
  } else if (loader) {
    loader.style.display = show ? "flex" : "none";
  }
}

// Session Check Guard
function checkSession(requiredRole) {
  const sessionData = JSON.parse(localStorage.getItem("app_session") || "{}");
  const loginTime = sessionData.timestamp || 0;
  const now = new Date().getTime();

  if (!sessionData.role || now - loginTime > 3600000) {
    // 1 Jam Expired
    localStorage.removeItem("app_session");
    window.location.href = "index.html";
    return null;
  }

  if (requiredRole && sessionData.role !== requiredRole) {
    window.location.href = "index.html";
    return null;
  }
  return sessionData;
}
