import { supabase } from "/scripts/supabase.js";

const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const name_input = document.getElementById("name_input");
const save_button = document.getElementById("save_button");
const name_text = document.getElementById("name_text");
const message_text = document.getElementById("message_text");

async function getProfile() {
	const { data: { user } } = await supabase.auth.getUser();
	const email = user?.email;
	const name = user?.user_metadata?.full_name;

	email_input.value = email;
	name_input.value = name;

	name_text.innerText = name || "user";
}

async function setProfile() {
	const email = email_input.value;
	const password = password_input.value;
	const name = name_input.value;

	if(email) {
		const { data, error } = await supabase.auth.updateUser({
			email: email
		});

		if (error) {
			message_text.innerText = error.message;
			message_text.style.display = "flex";
			setTimeout(() => {message_text.style.display = "none";}, 5000);
		} else {
			message_text.innerText = "Success!";
			message_text.style.display = "flex";
			setTimeout(() => {message_text.style.display = "none";}, 5000);
		}
	}

	if(password) {
		const { data, error } = await supabase.auth.updateUser({
			password: password
		});

		password_input.value = "";

		if (error) {
			message_text.innerText = error.message;
			message_text.style.display = "flex";
			setTimeout(() => {message_text.style.display = "none";}, 5000);
		} else {
			message_text.innerText = "Success!";
			message_text.style.display = "flex";
			setTimeout(() => {message_text.style.display = "none";}, 5000);
		}
	}

	if(name) {
		const { data, error } = await supabase.auth.updateUser({
			data: {
				full_name: name
			}
		});

		if (error) {
			message_text.innerText = error.message;
			message_text.style.display = "flex";
			setTimeout(() => {message_text.style.display = "none";}, 5000);
		} else {
			message_text.innerText = "Success!";
			message_text.style.display = "flex";
			setTimeout(() => {message_text.style.display = "none";}, 5000);
		}

		getProfile();
	}
}

if (save_button) {
	save_button.addEventListener("click", setProfile);
}

getProfile();