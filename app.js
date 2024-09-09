const form = document.getElementById('formRegister');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (e){
    e.preventDefault();

    const nameValue = nameInput.value;
    const emailValue = emailInput.value;

    if(nameValue && emailValue) {
        const newData = {nameValue,emailValue};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    } else {
        alert('Todos los datos son obligatorios');
    }
})


function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data))
}

function renderTable() {
   tableBody.innerHTML = ''; 

   data.forEach(function (item, index){
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    nameCell.textContent = item.nameValue;
    emailCell.textContent = item.emailValue;
    editButton.textContent = 'Editar';
    deleteButton.textContent = 'Eliminar';

    editButton.classList.add('button','button-edit');
    deleteButton.classList.add('button','button-delete');

    editButton.addEventListener('click', function (){
        ediData(index)
    })

    deleteButton.addEventListener('click', function (){
        deleteData(index);
    })

    actionCell.append(editButton, deleteButton);
    row.append(nameCell,emailCell,actionCell);

    tableBody.appendChild(row);
   })
}

function ediData(index) {
    const item = data[index];
    nameInput.value = item.nameValue;
    emailInput.value = item.emailValue;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();