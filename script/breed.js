'use strict';

// element
const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');

const btnSubmit = document.getElementById('submit-btn');

// clear inputbreed
function clearBreed() {
  inputBreed.value = '';
  inputType.value = 'Select Type';
}

let breedArr = [];
// even thêm loài và breed
btnSubmit.addEventListener('click', function () {
  const breedData = {
    breed: inputBreed.value,
    type: inputType.value,
  };
  if (!validateBreedInput()) {
    breedArr = getBreedFromStorage('listbreed');
    breedArr.push(breedData);
    console.log(breedArr);
    saveBreedToStorage('listbreed', breedArr);

    renderTableBreedData(breedArr);
  }
});

// function hiển thị breed
function renderTableBreedData() {
  tbody.innerHTML = '';
  breedArr = getBreedFromStorage('listbreed');
  let breedId = 0;
  breedArr.forEach((breedArr, index) => {
    breedId = index;
    index++;
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${index}</td>
    <td>${breedArr.breed}</td>
    <td> ${breedArr.type} </td>
    <td><button class="btn btn-danger" onclick="deleteBreed('${breedId}')" > Delete </button></td>
    `;
    tbody.appendChild(row);
  });
  clearBreed();
}

// kiểm tra dữ liệu input
function validateBreedInput() {
  breedArr = getBreedFromStorage('listbreed');
  if (inputBreed.value.trim().length == 0) {
    alert('Please input for Breed!');
    return true;
  } else if (inputType.value === 'Select Type') {
    alert('Please select Type!');
    return true;
  }
}

// xóa breed
function deleteBreed(breedId) {
  console.log(breedId);
  breedArr = getBreedFromStorage();
  const isConfirm = confirm('Are you sure?');
  if (isConfirm) {
    breedArr.splice(breedId, 1);
    saveBreedToStorage('listbreed', breedArr);
    renderTableBreedData(breedArr);
  } else return;
}
