// Mendapatkan elemen-elemen dari HTML
const fileInput = document.querySelector(".file-input"); // Input file untuk memilih gambar
const filterOptions = document.querySelectorAll(".filter button"); // Tombol-tombol untuk filter
const previewImg = document.querySelector(".preview-img img"); // Gambar pratinjau yang akan diubah
const filterName = document.querySelector(".filter-info .name"); // Nama filter yang aktif
const rotateOption = document.querySelectorAll(".rotate button"); // Tombol-tombol untuk rotasi
const filterValue = document.querySelector(".filter-info .value"); // Nilai filter yang ditampilkan
const filterSlider = document.querySelector(".slider input"); // Slider untuk mengubah nilai filter
const chooseImgBtn = document.querySelector(".choose-img"); // Tombol untuk memilih gambar
const saveImgBtn = document.querySelector(".save-img"); // Tombol untuk menyimpan gambar
const resetBtn = document.querySelector(".reset"); // Tombol untuk mereset filter

// Variabel untuk menyimpan nilai filter
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

let rotate = 0,
  horizontal = 1,
  vertical = 1;

// Fungsi untuk menerapkan filter ke gambar
const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${horizontal},${vertical}) `;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

// Fungsi untuk memuat gambar yang dipilih oleh pengguna
const loadImage = () => {
  let file = fileInput.files[0]; // Mengambil input gambar dari pengguna
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    resetBtn.click(); // Me-reset filter saat gambar diubah
    document.querySelector("main").classList.remove("disable");
  });
};

// Event listener untuk tombol-tombol filter
filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerHTML = option.innerHTML;

    // Mengatur slider sesuai dengan filter yang dipilih
    if (option.id == "Brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerHTML = brightness + " %";
    } else if (option.id == "Saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerHTML = saturation + " %";
    } else if (option.id == "Inversion") {
      filterSlider.max = "200";
      filterSlider.value = inversion;
      filterValue.innerHTML = inversion + " %";
    } else if (option.id == "Grayscale") {
      filterSlider.max = "200";
      filterSlider.value = grayscale;
      filterValue.innerHTML = grayscale + " %";
    }
  });
});

// Fungsi untuk memperbarui nilai filter
const updateFilter = () => {
  filterValue.innerHTML = filterSlider.value + " %";
  const selectedFilter = document.querySelector(".filter .active");

  // Mengupdate nilai filter yang sesuai
  if (selectedFilter.id == "Brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id == "Saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id == "Inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters(); // Menerapkan perubahan filter
};

// Event listener untuk tombol-tombol rotasi
rotateOption.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id == "left") {
      rotate -= 90;
    } else if (option.id == "right") {
      rotate += 90;
    } else if (option.id == "horizontal") {
      horizontal = horizontal === 1 ? -1 : 1;
    } else {
      vertical = vertical === 1 ? -1 : 1;
    }
    applyFilters(); // Menerapkan perubahan rotasi
  });
});

// Fungsi untuk mereset nilai filter
const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;

  rotate = 0;
  horizontal = 1;
  vertical = 1;
  filterOptions[0].click(); // Mengklik filter pertama saat mereset
  applyFilters(); // Menerapkan perubahan filter
};

// Fungsi untuk menyimpan gambar yang telah diubah
const saveimage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  // Mengatur filter pada gambar yang akan disimpan sesuai dengan nilai brightness, saturation, inversion, dan grayscale
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(horizontal, vertical);
  ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  // Membuat tautan untuk mengunduh gambar
  const link = document.createElement("a");
  link.download = "image.jpg"; // Nama file saat diunduh
  link.href = canvas.toDataURL(); // Mengubah canvas ke format URL data
  link.click(); // Simulasikan klik untuk mengunduh gambar
};

// Event listener untuk memuat gambar saat pengguna memilih file
fileInput.addEventListener("change", loadImage);
// Event listener untuk mengupdate filter saat nilai slider diubah
filterSlider.addEventListener("input", updateFilter);
// Event listener untuk mereset filter ke nilai default
resetBtn.addEventListener("click", resetFilter);
// Event listener untuk menyimpan gambar yang telah diubah saat tombol "Save Image" ditekan
saveImgBtn.addEventListener("click", saveimage);
// Event listener untuk membuka jendela pemilihan file saat tombol "Choose Image" ditekan
chooseImgBtn.addEventListener("click", () => fileInput.click());
