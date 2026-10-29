import { getStudentsAPI, addStudentsAPI } from './api.js';

let localStudent = [];
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');

const renderTable = (dataArray) => {
  studentTableBody.innerHTML = '';

  if (!dataArray || dataArray.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `
      <td colspan="4" style="text-align: center;">No student records found.</td>
    `;
    studentTableBody.appendChild(emptyRow);
    return;
  }

  dataArray.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.email}</td>
    `;
    studentTableBody.appendChild(row);
  });
};

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');

  const studentData = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    email: emailInput.value.trim()
  };

  if (!studentData.firstName || !studentData.lastName || !studentData.email) {
    alert('All input fields must be filled out.');
    return;
  }

  addStudentsAPI(studentData);
  localStudent = getStudentsAPI();
  renderTable(localStudent);
  studentForm.reset();
});

const initApp = () => {
  localStudent = getStudentsAPI();
  renderTable(localStudent);
};

initApp();