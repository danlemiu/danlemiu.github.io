"use strict";

window.onload = (event) => {
    document.getElementById('form').addEventListener('submit', function (e) {
      e.preventDefault();
    });

    const registerPatient = document.getElementById('btnRegisterPatient');
    registerPatient.addEventListener('click', addPatient);

    const showElderlyPatientsCheckbox = document.getElementById('chkElderlyPatients');
    showElderlyPatientsCheckbox.addEventListener('click', function (e) {
      var rows = document.getElementsByClassName('table-row');
      var isOutPatientsChecked = document.getElementById('chkShowOutPatients').checked;
      renderTable(rows, isOutPatientsChecked, e.target.checked);
    });

    const showOutPatientsCheckbox = document.getElementById('chkShowOutPatients');
    showOutPatientsCheckbox.addEventListener('click', function (e) {
      var rows = document.getElementsByClassName('table-row');
      var ElderlyPatientsChecked = document.getElementById('chkElderlyPatients').checked;
      renderTable(rows, e.target.checked, ElderlyPatientsChecked);
    });

};

const patients = [];

function addPatient() {
    const id = document.getElementById('patientIdNumber').value;
    const firstName = document.getElementById('firstName').value;
    const middleInitial = document.getElementById('middleInitials').value;
    const lastName = document.getElementById('lastName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const department = document.getElementById('ddlDepartment').value;
    const isOutPatientYes = document.getElementById('radioIsOutPatientYes').checked;
    const isOutPatientNo = document.getElementById('radioIsOutPatientNo').checked;

    const isOutPatient = isOutPatientYes ? 'Yes' : 'No';

    const patient = {id, firstName, middleInitial, lastName, dateOfBirth, department, isOutPatient};
    patients.push(patient);

    updateTable(patients);
}

function updateTable(data) {
    const tableBody = document.getElementById('tbodyPatientsList');
    tableBody.innerHTML = '';

    data.forEach(patient => {
        const row = document.createElement('tr');
        row.setAttribute('class', 'table-row');

        const idCell = document.createElement('td');
        idCell.innerText = patient.id;
        row.appendChild(idCell);

        const firstNameCell = document.createElement('td');
        firstNameCell.innerText = patient.firstName;
        row.appendChild(firstNameCell);

        const middleInitialCell = document.createElement('td');
        middleInitialCell.innerText = patient.middleInitial;
        row.appendChild(middleInitialCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.innerText = patient.lastName;
        row.appendChild(lastNameCell);

        const dateOfBirthCell = document.createElement('td');
        dateOfBirthCell.innerText = patient.dateOfBirth;
        row.appendChild(dateOfBirthCell);

        const departmentCell = document.createElement('td');
        departmentCell.innerText = patient.department;
        row.appendChild(departmentCell);

        const outPatientCell = document.createElement('td');
        outPatientCell.innerText = patient.isOutPatient;
        row.appendChild(outPatientCell);

        tableBody.appendChild(row);
    });
}

function renderTable(rows, isOutPatientsChecked, ElderlyPatientsChecked) {
  const currentDate = new Date();
  for (let row of rows) {
    const isOutPatient = row.childNodes[6].innerHTML;
    const patientDOB = row.childNodes[4].innerHTML;
    const dateOfBirth = patientDOB.split('-')[0];
    if (ElderlyPatientsChecked && isOutPatientsChecked && (currentDate.getFullYear() - dateOfBirth < 65 || isOutPatient == 'No')) {
      row.setAttribute('hidden', true);
    } 
    else if (ElderlyPatientsChecked && !isOutPatientsChecked) {
      if (currentDate.getFullYear() - dateOfBirth < 65) {
        row.setAttribute('hidden', true);
      } else {
        row.removeAttribute('hidden');
      }
    } else if (!ElderlyPatientsChecked && isOutPatientsChecked) {
        if (isOutPatient == 'No') {
          row.setAttribute('hidden', true);
        } else {
            row.removeAttribute('hidden');
        }
      } else {
          row.removeAttribute('hidden');
    }
  }
}





