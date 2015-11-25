var users = JSON.parse(localStorage.getItem('users'));

if (!users) {
	users = [];
}


function saveToLocalStorage(user, lastname, password, email) {
	var user = {
		"user": user,
		"lastname": lastname,
		"password": password,
		"email": email,
	};

	users.push(user);
	localStorage.setItem('users', JSON.stringify(users));
	loadUsers();
}

function loadUsers() {

	// Leer users del Local Storage
	// loop users
	var user_html = "";
	for (var i = 0; i < users.length; i++) {
		// agregar usuarios a la tabla
		var u = users[i];
		user_html = user_html + "<tr><td>"+u.username+"</td><td>"+
		u.password+"</td></tr>";
	}

	$('#users_table').html(user_html);

}
