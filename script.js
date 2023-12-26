function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const userDetail = {
        name,
        email,
        phone
    };

    axios.post("https://crudcrud.com/api/e9f97145ed114f1d838f298098cd5f4d/appointmentData", userDetail)
        .then((response) => {
            displayUserList(response.data);
        })
        .catch((err) => {
            document.body.innerHTML = "<h4>Something went wrong</h4>";
            console.log(err);
        });

    event.target.reset();
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/e9f97145ed114f1d838f298098cd5f4d/appointmentData")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showNewUserOnScreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

function showNewUserOnScreen(user) {
    const parentNode = document.getElementById('ListofUsers');

    const childHTML = `<li id="${user._id}">
        ${user.name} - ${user.email} 
        <button onclick="deleteUser('${user._id}')">Delete</button>
        <button onclick="editUserDetails('${user._id}','${user.name}','${user.phone}')">Edit</button>
    </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// Edit user
function editUserDetails(userId, name, phoneNumber) {
    document.getElementById('email').value = userId;
    document.getElementById('username').value = name;
    document.getElementById('phone').value = phoneNumber;
}

// Delete user
function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/e9f97145ed114f1d838f298098cd5f4d/appointmentData/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId);
        })
        .catch((err) => {
            console.log(err);
        });
}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('ListofUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}
