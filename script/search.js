'use strict';

// element
const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputType = document.getElementById('input-type');
const inputBreed = document.getElementById('input-breed');

const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputStrerilized = document.getElementById('input-sterilized');

const tBody = document.getElementById('tbody');
const findPetEl = document.getElementById('find-btn');

///
let breedArr = [];
breedArr = getBreedFromStorage('listbreed'); // lấy dữ liệu breed từ storage lưu vào mảng breedArr
renderBreed(breedArr);

//  hàm hiển thị breed
function renderBreed(e) {
  for (let i = 0; i < e.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `<option>${e[i].breed}</option>`;
    inputBreed.appendChild(option);
  }
}

// hiên thị toàn bộ pet
let petArr = [];
function renderTableData() {
  petArr = getFromStorage('pet');
  render(petArr);
}

// hiển thị pet
function render(petArr) {
  petArr.forEach(petArr => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td scope="row">${petArr.id}</td>
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
    `;
    tBody.appendChild(row);
  });
}

findPetEl.addEventListener('click', function () {
  petArr = getFromStorage('pet');

  let petArrFind = []; // arr chứa pet tìm theo form
  tBody.innerHTML = '';

  // giá trị nhập vào form tìm kiếm
  let _id = inputId.value.toUpperCase();
  let _name = inputName.value.toUpperCase();
  let _type = inputType.value;
  console.log(_type);
  let _breed = inputBreed.value;
  let _vaccinated = inputVaccinated.checked;
  console.log(_vaccinated);
  let _dewormed = inputDewormed.checked;
  console.log(_dewormed);
  let _sterilized = inputStrerilized.checked;
  console.log(_sterilized);

  //
  for (let i in petArr) {
    let result =
      _id == petArr[i].id &&
      _name == petArr[i].name &&
      _type == petArr[i].type &&
      _breed == petArr[i].breed;

    console.log(result);

    if (result) {
      petArrFind.push(petArr[i]);
      console.log(petArrFind);
    }
  }

  // for (let i = 0; i < petArr.length; i++) {
  //   if (_id) {
  //     petArrFind = petArr.filter(e => e.id.includes(_id));
  //   }
  //   if (_name) {
  //     petArrFind = petArr.filter(e => e.name.includes(_name));
  //   }
  //   if (_type != 'Select Type') {
  //     petArrFind = petArr.filter(e => e.type.includes(_type));
  //   }
  //   if (_breed != 'Select Breed') {
  //     petArrFind = petArr.filter(pet => pet.breed.includes(_breed));
  //   }
  //   if (_vaccinated) {
  //     petArrFind = petArr.filter(pet => pet.vaccinated);
  //   }
  //   if (_dewormed) {
  //     petArrFind = petArr.filter(pet => pet.dewormed);
  //   }
  //   if (_sterilized) {
  //     petArrFind = petArr.filter(pet => pet.sterilized);
  //   }
  // }
  // hiển thị pet tìm dk
  render(petArrFind);
});

const myString = 'Hoc JS tai JS F8!';

// indexOf
console.log(myString.indexOf('JS'));

// console.log(myString.replace('JS', 'Javascript'));
console.log(myString.replace(/JS/g, 'Javascript'));
