const form = document.getElementById('userForm');
const submitBtn = document.getElementById('submitBtn');
const userList = document.getElementById('userList');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    addUser();
});

submitBtn.addEventListener('click', addUser);

function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const userDetail = {
        name: name,
        email: email,
        phone: phone
    };

    axios.post("https://crudcrud.com/api/13b1fc5cc0b347cfb8b0e50ad2cdd54a/appointmentData", userDetail)
        .then((response) => {
            displayUserList(response.data); 
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>";
            console.log(err);
        });

    form.reset();
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/13b1fc5cc0b347cfb8b0e50ad2cdd54a/appointmentData")
        .then((response) => {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                const user = response.data[i];
                displayUserList(user);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

function displayUserList(user) {
    // Create a new list item for each user
    const li = document.createElement('li');
    const email = user.email;
    li.innerHTML = `${user.name} - ${user.email} - ${user.phone} <button class="edit-btn" onclick="editUser('${email}')">Edit</button> <button class="delete-btn" onclick="deleteUser('${email}')">Delete</button>`;

    // Append the new list item to the user list
    userList.appendChild(li);

    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', editUser);
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteUser);
    });
}

function editUser(event) {
    // Handle edit logic here using data from the API
    // Update the input fields with the existing user details
}

function deleteUser(event) {
    displayUserList([]);
}
