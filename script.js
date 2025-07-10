// Fungsi untuk mengevaluasi nilai fungsi pada x tertentu menggunakan math.js
function f(expr, x) {
  return math.evaluate(expr, { x });
}

// Fungsi utama untuk melakukan perhitungan metode numerik
function calculate() {
  // Mengambil nilai input dari HTML
  const method = document.getElementById("method").value; // metode yang dipilih (regula/secant)
  const expr = document.getElementById("func").value;     // fungsi dari input
  const a = parseFloat(document.getElementById("a").value); // batas bawah atau Xn-1
  const b = parseFloat(document.getElementById("b").value); // batas atas atau Xn
  const tol = parseFloat(document.getElementById("tol").value); // toleransi error

  // Membuat fungsi f(x) menggunakan math.js
  const f = (x) => math.evaluate(expr, { x });

  showLoader(); // Tampilkan animasi loading

  setTimeout(() => {
    let table = '<table class="result-table"><thead>'; // Awal tabel

    // ======================= METODE REGULA FALSI =======================
    if (method === "regula") {
      // Header kolom untuk Regula Falsi
      table += `
        <tr>
          <th>Iterasi</th><th>a</th><th>b</th><th>c</th><th>f(c)</th>
          <th>|f(c)|</th><th>f(a)</th><th>f(b)</th><th>Keterangan</th>
        </tr></thead><tbody>`;

      let fa = f(a), fb = f(b), c, fc, absFc, iter = 0;
      let a0 = a, b0 = b;

      // Iterasi selama nilai |f(c)| masih lebih besar dari toleransi
      do {
        iter++;
        // Rumus Regula Falsi
        c = b0 - (fb * (a0 - b0)) / (fa - fb);
        fc = f(c);
        absFc = Math.abs(fc);
        const valid = absFc < tol ? "True" : "False"; // Cek apakah sudah konvergen

        // Tambahkan baris ke tabel
        table += `<tr>
          <td>${iter}</td>
          <td>${a0.toFixed(5)}</td>
          <td>${b0.toFixed(5)}</td>
          <td>${c.toFixed(5)}</td>
          <td>${fc.toFixed(5)}</td>
          <td>${absFc.toFixed(5)}</td>
          <td>${fa.toFixed(5)}</td>
          <td>${fb.toFixed(5)}</td>
          <td>${valid}</td>
        </tr>`;

        // Update nilai a dan b berdasarkan tanda f(a)*f(c)
        if (fa * fc < 0) {
          b0 = c;
          fb = fc;
        } else {
          a0 = c;
          fa = fc;
        }
      } while (absFc > tol);
    }

    // ========================= METODE SECANT =========================
    else if (method === "secant") {
      // Header kolom untuk metode Secant
      table += `
        <tr>
          <th>Iterasi</th><th>xₙ₋₁</th><th>xₙ</th><th>f(xₙ)</th>
          <th>|xₙ - xₙ₋₁|</th><th>Keterangan</th>
        </tr></thead><tbody>`;

      let x0 = a, x1 = b, iter = 0;
      let fx0 = f(x0), fx1 = f(x1);
      let diff = Infinity;

      // Iterasi sampai perbedaan x antar iterasi lebih kecil dari toleransi
      while (diff > tol) {
        iter++;
        // Rumus metode Secant
        const x2 = x1 - fx1 * ((x1 - x0) / (fx1 - fx0));
        const fx2 = f(x2);
        diff = Math.abs(x2 - x1);
        const valid = diff < tol ? "True" : "False";

        // Tambahkan baris ke tabel
        table += `<tr>
          <td>${iter}</td>
          <td>${x0.toFixed(5)}</td>
          <td>${x1.toFixed(5)}</td>
          <td>${fx1.toFixed(5)}</td>
          <td>${diff.toFixed(5)}</td>
          <td>${valid}</td>
        </tr>`;

        // Update nilai untuk iterasi berikutnya
        x0 = x1;
        fx0 = fx1;
        x1 = x2;
        fx1 = fx2;
      }
    }

    // Tutup tabel & tampilkan hasil ke halaman
    table += "</tbody></table>";
    document.getElementById("output").innerHTML = table;

    hideLoader(); // Sembunyikan animasi loading setelah selesai
  }, 400); // Simulasi delay 400ms agar terlihat seperti proses berjalan
}

// Fungsi untuk mereset semua input ke default
function resetForm() {
  document.getElementById("method").value = "regula";
  document.getElementById("func").value = "";
  document.getElementById("a").value = "";
  document.getElementById("b").value = "";
  document.getElementById("tol").value = "";
  document.getElementById("output").innerHTML = "";
}

// Menampilkan animasi loading
function showLoader() {
  document.getElementById("loader").style.display = "block";
}

// Menyembunyikan animasi loading
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}
