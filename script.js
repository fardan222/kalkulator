// Fungsi untuk menghitung nilai fungsi matematika berdasarkan input user
function f(expr, x) {
  return math.evaluate(expr, { x });
}

function calculate() {
  // Ambil nilai dari elemen input di HTML
  const method = document.getElementById("method").value;
  const expr = document.getElementById("func").value;
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const tol = parseFloat(document.getElementById("tol").value);
  const f = (x) => math.evaluate(expr, { x }); // definisi fungsi f(x)

  // Validasi input
  if (!expr || isNaN(a) || isNaN(b) || isNaN(tol)) {
    alert("Mohon isi semua input dengan benar.");
    return;
  }

  // Tampilkan animasi loading
  showLoader();

  // Delay 3 detik agar animasi sempat terlihat (bisa disesuaikan)
  setTimeout(() => {
    let table = '<table class="result-table"><thead>';
    let iter = 0; // Hitungan iterasi

    if (method === "regula") {
      // Header tabel untuk metode Regula Falsi
      table += `<tr><th>Iterasi</th><th>a</th><th>b</th><th>c</th><th>f(c)</th><th>|f(c)|</th><th>f(a)</th><th>f(b)</th><th>Keterangan</th></tr></thead><tbody>`;
      
      // Inisialisasi nilai
      let fa = f(a), fb = f(b), c, fc, absFc;
      let a0 = a, b0 = b;

      // Proses iterasi Regula Falsi
      do {
        iter++;
        c = b0 - (fb * (a0 - b0)) / (fa - fb); // Rumus Regula Falsi
        fc = f(c);
        absFc = Math.abs(fc);
        const valid = absFc < tol ? "True" : "False"; // Apakah sudah memenuhi toleransi?

        // Tambahkan baris ke tabel hasil
        table += `<tr><td>${iter}</td><td>${a0.toFixed(5)}</td><td>${b0.toFixed(5)}</td><td>${c.toFixed(5)}</td><td>${fc.toFixed(5)}</td><td>${absFc.toFixed(5)}</td><td>${fa.toFixed(5)}</td><td>${fb.toFixed(5)}</td><td>${valid}</td></tr>`;

        // Update nilai a atau b berdasarkan tanda f(a)*f(c)
        if (fa * fc < 0) {
          b0 = c;
          fb = fc;
        } else {
          a0 = c;
          fa = fc;
        }
      } while (absFc > tol); // Berhenti jika |f(c)| < toleransi
    } 
    else if (method === "secant") {
      // Header tabel untuk metode Secant
      table += `<tr><th>Iterasi</th><th>xₙ₋₁</th><th>xₙ</th><th>f(xₙ)</th><th>|xₙ - xₙ₋₁|</th><th>Keterangan</th></tr></thead><tbody>`;
      
      let x0 = a, x1 = b;
      let fx0 = f(x0), fx1 = f(x1);
      let diff = Infinity;

      // Proses iterasi metode Secant
      while (diff > tol) {
        iter++;
        const x2 = x1 - fx1 * ((x1 - x0) / (fx1 - fx0)); // Rumus metode Secant
        const fx2 = f(x2);
        diff = Math.abs(x2 - x1); // Selisih antara dua nilai terakhir
        const valid = diff < tol ? "True" : "False";

        // Tambahkan baris ke tabel
        table += `<tr><td>${iter}</td><td>${x0.toFixed(5)}</td><td>${x1.toFixed(5)}</td><td>${fx1.toFixed(5)}</td><td>${diff.toFixed(5)}</td><td>${valid}</td></tr>`;

        // Update nilai untuk iterasi berikutnya
        x0 = x1;
        fx0 = fx1;
        x1 = x2;
        fx1 = fx2;
      }
    }

    // Tutup tabel dan tampilkan hasil di halaman
    table += "</tbody></table>";
    document.getElementById("output").innerHTML = table + `<p style="text-align:center"><strong>Total Iterasi:</strong> ${iter}</p>`;
    
    // Sembunyikan animasi loading
    hideLoader();
  }, 4000); // Delay 3 detik agar animasi sempat muncul
}

// Fungsi untuk mereset seluruh input dan output ke keadaan awal
function resetForm() {
  document.getElementById("method").value = "regula";
  document.getElementById("func").value = "";
  document.getElementById("a").value = "";
  document.getElementById("b").value = "";
  document.getElementById("tol").value = "";
  document.getElementById("output").innerHTML = "";
}

// Fungsi untuk menampilkan elemen loader dan teks loading
function showLoader() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("loadingText").style.display = "block";
}

// Fungsi untuk menyembunyikan elemen loader dan teks loading
function hideLoader() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loadingText").style.display = "none";
}
