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

	email_input.setAttribute("placeholder", email);
	name_input.setAttribute("placeholder", name);

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
		} else {
			message_text.innerText = "Success!";
		}
	}

	if(password) {
		const { data, error } = await supabase.auth.updateUser({
			password: password
		});

		if (error) {
			message_text.innerText = error.message;
		} else {
			message_text.innerText = "Success!";
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
		} else {
			message_text.innerText = "Success!";
		}

		getProfile();
	}
}

if (save_button) {
	save_button.addEventListener("click", setProfile);
}

getProfile();