'use strict';

// element
const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const inputBreed = document.getElementById('input-breed');

const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputStrerilized = document.getElementById('input-sterilized');

const btnSubmit = document.getElementById('submit-btn');
const tBody = document.getElementById('tbody');

let petArr = []; // mảng chứa toàn bộ pet

// hiển thị ngày tháng
const date = new Date();
const newDate = `${date.getDate()}/ ${
  date.getMonth() + 1
}/ ${date.getFullYear()}`;

// hiển thị toàn bộ pet
function renderTableData() {
  tBody.innerHTML = '';
  petArr = getFromStorage('pet');

  petArr.forEach((petArr, index) => {
    let id = index;
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${petArr.id}</th>
      <td>${petArr.name}</td>
      <td>${petArr.age}</td>
      <td>${petArr.type}</td>
      <td>${petArr.weight} kg</td>
      <td>${petArr.length} cm</td>
      <td>${petArr.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${petArr.color}"></i>
      </td>
      <td><i class="bi ${
        petArr.vaccinated ? 'bi-check-circle-fill' : 'bi bi-x-circle-fill'
      } "></i></td>
      <td><i class="bi ${
        petArr.dewormed ? 'bi-check-circle-fill' : 'bi bi-x-circle-fill'
      }"></i></td>
      <td><i class="bi ${
        petArr.sterilized ? 'bi-check-circle-fill' : 'bi bi-x-circle-fill'
      }"></i></td>
      
      <td>${petArr.date}</td>
      <td>
        <button class="btn btn-danger" onclick="editPet('${id}')">Edit</button>
      </td>`;
    tBody.appendChild(row);
    index++;
  });
}

// function edit pet
let idEdit = 0;
function editPet(id) {
  idEdit = id;
  // hiển thị form chỉnh sửa thông tin pet
  document.querySelector('.row').classList.remove('hide');

  let breedArr = [];
  breedArr = getBreedFromStorage('listbreed'); // lấy dữ liệu breed từ storage lưu vào mảng breedArr
  renderBreed(breedArr);

  // lấy thông tin pet cần chỉnh sửa hiển thị vào form chỉnh sửa
  inputId.value = `${petArr[id].id}`;
  inputName.value = `${petArr[id].name}`;
  inputAge.value = `${petArr[id].age}`;
  inputType.value = `${petArr[id].type}`;
  inputWeight.value = `${petArr[id].weight}`;
  inputLength.value = `${petArr[id].length}`;
  inputColor.value = `${petArr[id].color}`;
  inputBreed.value = `${petArr[id].breed}`;

  if (petArr[id].vaccinated) {
    inputVaccinated.checked = true;
  } else inputVaccinated.checked = false;

  if (petArr[id].dewormed) {
    inputDewormed.checked = true;
  } else inputDewormed.checked = false;

  if (petArr[id].sterilized) {
    inputStrerilized.checked = true;
  } else inputStrerilized.checked = false;

  /////////////////
  // even click vào type để chọn loài vật
  inputType.addEventListener('click', function () {
    inputBreed.innerHTML = '';

    // lọc breed của dog và lưu vào mảng riêng
    const dogArr = breedArr.filter(function (pet) {
      return pet.type === 'Dog';
    });

    // lọc breed của cat và lưu vào mảng riêng
    const catArr = breedArr.filter(function (pet) {
      return pet.type === 'Cat';
    });
    // hiển thị breed theo loài
    if (inputType.value === 'Dog') {
      renderBreed(dogArr);
    } else if (inputType.value === 'Cat') {
      renderBreed(catArr);
    }
  });
}

//  hàm hiển thị breed
function renderBreed(e) {
  inputBreed.value = 'Select Breed';
  for (let i = 0; i < e.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `<option>${e[i].breed}</option>`;
    inputBreed.appendChild(option);
  }
}

///////////////
// ấn nút submit để lưu lại thông tin pet đã sửa
btnSubmit.addEventListener('click', function () {
  const dataEdit = {
    id: inputId.value,
    name: inputName.value,
    age: inputAge.value,
    type: inputType.value,
    weight: inputWeight.value,
    length: inputLength.value,
    color: inputColor.value,
    breed: inputBreed.value,

    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputStrerilized.checked,
    bmi: '?',
    date: newDate,
  };

  if (!validate()) {
    console.log(idEdit);
    petArr.splice(idEdit, 1, dataEdit);
    saveToStorage('pet', petArr);
    console.log(petArr);
    renderTableData(petArr);
    document.querySelector('.row').classList.add('hide');
  }
});

// validate Form edit
function validate() {
  if (inputName.value.trim().length == 0) {
    alert('Please input for name!');
    return true;
  } else if (inputAge.value.trim().length == 0) {
    alert('Please input for age!');
    return true;
  } else if (inputWeight.value.trim().length == 0) {
    alert('Please input for weight!');
    return true;
  } else if (inputLength.value.trim().length == 0) {
    alert('Please input for length!');
    return true;
  } else if (inputAge.value < 1 || inputAge.value > 15) {
    //kiem tra tuoi trong khoảng 1-15
    alert('Age must be between 1 and 15!');
    return true;
  } else if (inputWeight.value < 1 || inputWeight.value > 15) {
    //kiem tra can nặng trong khoảng 1-15kg
    alert('Weight must be between 1 and 15!');
    return true;
  } else if (inputLength.value < 1 || inputLength.value > 100) {
    // kiem tra chieu dài trong khoảng 1-100cm
    alert('Length must be between 1 and 100!');
    return true;
  } else if (inputType.value === 'Select Type') {
    // kiểm tra có chon loại(chó hoặc mèo)
    alert('Please select Type!');
    return true;
  } else if (inputBreed.value === 'Select Breed') {
    // kiểm tra có chọn loại giống
    alert('Please select Breed!');
    return true;
  }
}
