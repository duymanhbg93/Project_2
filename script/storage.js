'use strict';

// luu du lieu pet vao storage
function saveToStorage(pet, petArr) {
  localStorage.setItem(pet, JSON.stringify(petArr));
}

// hien thi du lieu tu storage
function getFromStorage(pet) {
  return localStorage.getItem(pet) ? JSON.parse(localStorage.getItem(pet)) : [];
}

///////////
// luu du lieu breed vao storage
function saveBreedToStorage(listBreed, breedArr) {
  localStorage.setItem('listbreed', JSON.stringify(breedArr));
}

// doc du lieu breed tu storage
function getBreedFromStorage() {
  return localStorage.getItem('listbreed')
    ? JSON.parse(localStorage.getItem('listbreed'))
    : [];
}

// bổ xung animation cho slibar
const navabar = document.getElementById('sidebar');
navabar.addEventListener('click', function () {
  navabar.classList.toggle('active');
});
document.querySelector('.components').addEventListener('click', function (e) {
  e.stopPropagation();
});
