// Mendapatkan elemen-elemen dari HTML
const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  privewImg = document.querySelector(".preview-img img"),
  filterName = document.querySelector(".filter-info .name"),
  rotateOption = document.querySelectorAll(".rotate button"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  chooseImgBtn = document.querySelector(".chouse-img"),
  saveImgBtn = document.querySelector(".save-img"),
  resetBtn = document.querySelector(".reset");

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
  privewImg.style.transform = `rotate(${rotate}deg) scale(${horizontal},${vertical}) `;
  privewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

// Fungsi untuk memuat gambar yang dipilih oleh pengguna
const loadImage = () => {
  let file = fileInput.files[0]; // Mengambil user input
  if (!file) return;
  privewImg.src = URL.createObjectURL(file);
  privewImg.addEventListener("load", () => {
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
      filterValue.innerHTML = graycale + " %";
    }
  });
});

// Fungsi untuk memperbarui nilai filter
const updateFilter = () => {
  filterValue.innerHTML = filterSlider.value + " %";
  const selectedFilter = document.querySelector(".filter .active");

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
  applyFilters();
};

// Fungsi untuk menyimpan gambar yang telah diubah
const saveimage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = privewImg.naturalWidth;
  canvas.height = privewImg.naturalHeight;

  // Mengatur filter pada gambar yang akan disimpan sesuai dengan nilai brightness, saturation, inversion, dan grayscale
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(horizontal, vertical);
  ctx.drawImage(privewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  // Membuat tautan untuk mengunduh gambar
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL(); // Mengubah canvas ke format URL data
  link.click();
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveimage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
