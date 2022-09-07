'use strict';

// element
const importData = document.getElementById('import-btn');
const exportData = document.getElementById('export-btn');

/// Export data
exportData.addEventListener('click', function () {
  let petArr = getFromStorage('pet');
  console.log(petArr);
  let blob = new Blob([JSON.stringify(petArr)], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(blob, 'listPet.json');
});

//////////
// import data
importData.addEventListener('click', function () {
  let file = document.getElementById('input-file').files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (pet) {
    const petArr = JSON.parse(pet.target.result);
    console.log(petArr);

    saveToStorage('pet', petArr);
  };
});
