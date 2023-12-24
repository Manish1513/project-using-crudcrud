document.addEventListener('DOMContentLoaded', function () {
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

        axios.post("https://crudcrud.com/api/7e2e567a413a465d86db8f63c99306cf/appointmentData", userDetail)
        .then((response) => {
            displayUserList(response.data)
            //console.log(response)
        })
        .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> something went wrong </h4>"
            console.log(err)
        });
    
       // localStorage.setItem(email, JSON.stringify(userDetail));
       // displayUserList();
        form.reset();
    }

    function displayUserList() {
        userList.innerHTML = "";

        for (let i = 0; i < localStorage.length; i++) {
            const email = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(email));

            const li = document.createElement('li');
            li.innerHTML = `${data.name} - ${data.email} - ${data.phone} <button class="edit-btn" data-email="${email}">Edit</button> <button class="delete-btn" data-email="${email}">Delete</button>`;
            userList.appendChild(li);
        }

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
        const email = event.target.dataset.email;
        const data = JSON.parse(localStorage.getItem(email));

        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;

        localStorage.removeItem(email);
        displayUserList();
    }

    function deleteUser(event) {
        const email = event.target.dataset.email;
        localStorage.removeItem(email);
        displayUserList();
    }

    // Display user list on page load
    displayUserList();
});
