'use strict';
// element

const inputID = document.getElementById('input-id');
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

const tBodyEl = document.getElementById('tbody');

const submitPet = document.getElementById('submit-btn');
const healthyPetEl = document.getElementById('healthy-btn');
const calculateBMIEl = document.getElementById('calculateBMI-btn');

// clear form input
const clearInputPet = function () {
  inputID.value = '';
  inputName.value = '';
  inputAge.value = '';
  inputType.value = 'Select Type';
  inputWeight.value = '';
  inputLength.value = '';
  inputColor.value = '#000000';
  inputBreed.value = 'Select Breed';
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputStrerilized.checked = false;
};

let petArr = []; // Array lưu thông tin data

petArr = getFromStorage('pet');
console.log(petArr);
// hien thi ngay thang
const date = new Date();
const newDate = `${date.getDate()}/ ${
  date.getMonth() + 1
}/ ${date.getFullYear()}`;
// console.log(newDate);

// start
submitPet.addEventListener('click', function () {
  // nhap thong tin thú cưng từ input vào object
  const data = {
    id: inputID.value,
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

  // kiểm tra dữ liệu input đúng thỳ nhập vào array va hiển thị ra table
  if (!validateInput()) {
    petArr = getFromStorage('pet');
    console.log(petArr);
    petArr.push(data);

    saveToStorage('pet', petArr);
    renderTableData(petArr);
  }
});

// hiển thị thú cưng
function renderTableData() {
  tBodyEl.innerHTML = '';
  petArr = getFromStorage('pet'); // lấy dữ liệu pet từ storage
  render(petArr);
  clearInputPet();
}

// function hiển thị pet ra table
function render(petArr) {
  petArr.forEach((petArr, index) => {
    let petArrId = index;
    index++;
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
      <td>${petArr.bmi}</td>
      <td>${petArr.date}</td>
      <td>
        <button class="btn btn-danger" onclick="deletePet('${petArrId}')">Delete</button>
      </td>`;
    tBodyEl.appendChild(row);
  });
}

// kiem tra du lieu input
function validateInput() {
  petArr = getFromStorage('pet');
  // kiểm tra xem id có bị trùng ko
  for (let i = 0; i < petArr.length; i++) {
    if (inputID.value === petArr[i].id) {
      alert('ID must unique!');
      return true;
    }
  }
  // kiêm tra xem có trường nào ko nhập thông tin
  if (inputID.value.trim().length == 0) {
    alert('Please input for ID!');
    return true;
  } else if (inputName.value.trim().length == 0) {
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

// xóa pet
function deletePet(id) {
  petArr = getFromStorage('pet');
  const isConfirm = confirm('Are you sure?');
  if (isConfirm) {
    // remove pet
    petArr.splice(id, 1);
    saveToStorage('pet', petArr);

    // hiển thị các pet còn lại
    renderTableData();
  } else return;
}

// hiển thị pet khi kiểm tra pet khỏe mạnh và tính bmi
function renderTableDataHealthy(petArr) {
  tBodyEl.innerHTML = '';
  render(petArr);
}

// kiêm tra thu cung có khỏe mạnh ko?
function healthyPet() {
  petArr = getFromStorage('pet');
  let healthyPetArr = [];
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
      healthyPetArr.push(petArr[i]); // khỏe mạnh thỳ gán vào array healthyPetArr
    }
  }
  console.log(healthyPetArr);
  renderTableDataHealthy(healthyPetArr);
}

//// hien thi thu cung khoe manh
let healthyCheck = true;
healthyPetEl.addEventListener('click', function () {
  if (healthyCheck) {
    healthyPetEl.textContent = 'Show All Pet'; // hiển thị thú cưng khỏe mạnh
    healthyPet();
    healthyCheck = false;
  } else {
    healthyPetEl.textContent = 'Show Healthy Pet'; // hiển thị toàn bộ thú cưng
    renderTableData();
    healthyCheck = true;
  }
});

// tính chỉ số BMI
function calculateBMI() {
  petArr = getFromStorage('pet');
  console.log(petArr);

  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === 'Dog') {
      petArr[i].bmi = (
        (petArr[i].weight * 703) /
        petArr[i].length ** 2
      ).toFixed(2);
    } else {
      petArr[i].bmi = (
        (petArr[i].weight * 886) /
        petArr[i].length ** 2
      ).toFixed(2);
    }
  }
  renderTableDataHealthy(petArr);
}
// ấn nút calculate BMI để hiển thị chỉ số BMI
calculateBMIEl.addEventListener('click', calculateBMI);

// hiển thị breed theo loài
// hàm hiển thị
function renderBreed(e) {
  for (let i = 0; i < e.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `${e[i].breed}`;
    inputBreed.appendChild(option);
  }
}
// even click chọn loài
inputType.addEventListener('click', function () {
  inputBreed.innerHTML = '';
  // lấy dữ liệu breed từ localstorage và lưu vào mảng
  let breedArr = [];
  breedArr = getBreedFromStorage('listbreed');
  console.log(inputType.value);

  // lọc breed của dog và lưu vào mảng
  const dogArr = breedArr.filter(function (pet) {
    return pet.type === 'Dog';
  });

  // lọc breed của cat và lưu vào mảng
  const catArr = breedArr.filter(function (pet) {
    return pet.type === 'Cat';
  });

  // hiển thị breed theo loài
  if (inputType.value === 'Dog') {
    console.log('arr dog', dogArr);
    renderBreed(dogArr);
  } else if (inputType.value === 'Cat') {
    console.log('arr cat', catArr);
    renderBreed(catArr);
  }
});
