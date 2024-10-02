function submitForm() {
    // Get form values
    var name = document.getElementById("name").value;
    var bloodGroup = document.getElementById("bloodGroup").value;
    var contact = document.getElementById("contact").value;
    var gender = document.getElementById("gender").value;
    var age = document.getElementById("age").value;

    // Create a new donation object
    var donation = {
        name: name,
        bloodGroup: bloodGroup,
        contact: contact,
        gender: gender,
        age: age
    };

    // Save the donation to localStorage
    saveDonation(donation);

    // Update the donation list on the page
    updateDonationList();

    // Clear the form fields
    document.getElementById("donationForm").reset();
}

function saveDonation(donation) {
    // Get existing donations from localStorage or initialize an empty array
    var donations = JSON.parse(localStorage.getItem("donations")) || [];

    // Add the new donation to the array
    donations.push(donation);

    // Save the updated array back to localStorage
    localStorage.setItem("donations", JSON.stringify(donations));
}

function updateDonationList() {
    var donationTableBody = document.getElementById("donationTableBody");
    donationTableBody.innerHTML = "";

    // Get donations from localStorage
    var donations = JSON.parse(localStorage.getItem("donations")) || [];

    // Update the table with the donation list
    donations.forEach(function(donation, index) {
        var row = donationTableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.textContent = donation.name;
        cell2.textContent = donation.bloodGroup;
        cell3.textContent = donation.contact;
        cell4.textContent = donation.gender;
        cell5.textContent = donation.age;

    
        // Add update and delete buttons
        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = function() { updateDonation(index); };
        cell6.appendChild(updateButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() { deleteDonation(index); };
        cell6.appendChild(deleteButton);
    });
}

function updateDonation(index) {
    // Retrieve donations from localStorage
    var donations = JSON.parse(localStorage.getItem("donations")) || [];

    // Populate the form with the selected donation data
    var selectedDonation = donations[index];
    document.getElementById("name").value = selectedDonation.name;
    document.getElementById("bloodGroup").value = selectedDonation.bloodGroup;
    document.getElementById("contact").value = selectedDonation.contact;

    // Remove the selected donation from the list
    donations.splice(index, 1);

    // Update localStorage with the modified list
    localStorage.setItem("donations", JSON.stringify(donations));

    // Update the donation list on the page
    updateDonationList();
}

function deleteDonation(index) {
    // Retrieve donations from localStorage
    var donations = JSON.parse(localStorage.getItem("donations")) || [];

    // Remove the selected donation from the list
    donations.splice(index, 1);

    // Update localStorage with the modified list
    localStorage.setItem("donations", JSON.stringify(donations));

    // Update the donation list on the page
    updateDonationList();
}

// Initial update when the page loads
updateDonationList();

// JavaScript for validating the form
function validateForm(event) {
   event.preventDefault();
   
   const userId = document.getElementById('userId').value;
   const password = document.getElementById('password').value;
   const errorMessage = document.getElementById('error-message');

   // Simple validation rules
   if (userId === 'Admin' && password === 'Blood@123') {
    window.location.href = 'list.html';
   } else {
       errorMessage.style.color = 'red';
       errorMessage.innerText = 'Invalid User ID or Password!';
   }
}
