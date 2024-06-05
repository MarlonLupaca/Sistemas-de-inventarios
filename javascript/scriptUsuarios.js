document.addEventListener('DOMContentLoaded', () => {
    const modalNewUser = document.querySelector('.modal');
    const modalEditUser = document.querySelector('.modal--editar');
    const btnHideNewUser = document.getElementById('btn--esconder--new--empleado');
    const btnHideEditUser = document.getElementById('btn--esconder--editar--empleado');
    const userTableBody = document.querySelector('.empleados--tabla tbody');
    const searchInputs = document.querySelectorAll('.inputs input');

    const btnNuevoUsuario = document.getElementById("btn--nuevo--usuario");

    btnNuevoUsuario.addEventListener("click", mostrarModal);
    
    function mostrarModal(){
        modalNewUser.classList.toggle("modal--view");
    }

    const getUsersFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('users')) || [];
    };

    const saveUsersToLocalStorage = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    const renderUsers = (users) => {
        userTableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.role}</td>
                <td>
                    <button class="button button--tabla btn--editar" data-index="${index}">Editar</button>
                    <button class="button button--tabla btn--eliminar" data-index="${index}">Eliminar</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        document.querySelectorAll('.btn--editar').forEach(button => {
            button.addEventListener('click', handleEditUser);
        });

        document.querySelectorAll('.btn--eliminar').forEach(button => {
            button.addEventListener('click', handleDeleteUser);
        });
    };

    const handleAddUser = () => {
        const name = modalNewUser.querySelector('input[placeholder="Nombre"]').value;
        const email = modalNewUser.querySelector('input[placeholder="Correo electrónico"]').value;
        const phone = modalNewUser.querySelector('input[placeholder="Teléfono"]').value;
        const roleSelect = modalNewUser.querySelector('select');
        const role = roleSelect.value;

        if (name && email && phone && role) {
            const users = getUsersFromLocalStorage();
            users.push({ name, email, phone, role });
            saveUsersToLocalStorage(users);
            renderUsers(users);
            modalNewUser.classList.remove('modal--view');
            modalNewUser.querySelector('input[placeholder="Nombre"]').value = '';
            modalNewUser.querySelector('input[placeholder="Correo electrónico"]').value = '';
            modalNewUser.querySelector('input[placeholder="Teléfono"]').value = '';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    const handleEditUser = (event) => {
        const index = event.target.dataset.index;
        const users = getUsersFromLocalStorage();

        // Verificar si el índice es válido
        if (users[index]) {
            const user = users[index];

            modalEditUser.querySelector('input[placeholder="Nombre"]').value = user.name;
            modalEditUser.querySelector('input[placeholder="Correo electrónico"]').value = user.email;
            modalEditUser.querySelector('input[placeholder="Teléfono"]').value = user.phone;
            const roleSelect = modalEditUser.querySelector('select');
            roleSelect.value = user.role;

            modalEditUser.classList.add('modal--view');

            modalEditUser.querySelector('.button--form').onclick = () => {
                user.name = modalEditUser.querySelector('input[placeholder="Nombre"]').value;
                user.email = modalEditUser.querySelector('input[placeholder="Correo electrónico"]').value;
                user.phone = modalEditUser.querySelector('input[placeholder="Teléfono"]').value;
                user.role = roleSelect.value;

                users[index] = user;
                saveUsersToLocalStorage(users);
                renderUsers(users);
                modalEditUser.classList.remove('modal--view');
            };
        } else {
            console.error(`No se encontró un usuario en el índice ${index}`);
        }
    };

    const handleDeleteUser = (event) => {
        const index = event.target.dataset.index;
        const users = getUsersFromLocalStorage();
        users.splice(index, 1);
        saveUsersToLocalStorage(users);
        renderUsers(users);
    };

    const handleSearchUsers = () => {
        const query = Array.from(searchInputs).map(input => input.value.toLowerCase());
        const users = getUsersFromLocalStorage();

        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(query[0]) &&
            user.role.toLowerCase().includes(query[1]) && 
            user.email.toLowerCase().includes(query[2])
        );

        renderUsers(filteredUsers);
    };

    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearchUsers);
    });

    modalNewUser.querySelector('.button--form').addEventListener('click', handleAddUser);

    btnHideNewUser.addEventListener('click', () => {
        modalNewUser.classList.remove('modal--view');
    });

    btnHideEditUser.addEventListener('click', () => {
        modalEditUser.classList.remove('modal--view');
    });

    renderUsers(getUsersFromLocalStorage());
});
