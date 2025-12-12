import { supabase } from "/scripts/supabase.js";

const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const name_input = document.getElementById("name_input");
const sign_in_button = document.getElementById("sign_in_button");
const sign_up_button = document.getElementById("sign_up_button");
const sign_out_button = document.getElementById("sign_out_button");
const message_text = document.getElementById("message_text");

async function checkSessionStatus() {
	const { data: { session } } = await supabase.auth.getSession();
	const current_page = window.location.pathname;

	if (current_page.includes("dashboard.html") && !session) {
		window.location.href = "index.html";
	}

	if ((current_page.includes("index.html") || current_page === "/") && session) {
		window.location.href = "dashboard.html";
	}
}

async function signUp() {
	const email = email_input.value;
	const password = password_input.value;
	const name = name_input.value;

	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
			full_name: name
			}
		}
	});

	if (error) {
		message_text.innerText = error.message;
	} else {
		message_text.innerText = "Success!";
		checkSessionStatus();
	}
}

async function signIn() {
	const email = email_input.value;
	const password = password_input.value;
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		message_text.innerText = error.message;
	} else {
		window.location.href = "dashboard.html";
	}	
}

async function signOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		alert(error.message);
	}

	window.location.href = "index.html";
}

if (sign_in_button) {
	sign_in_button.addEventListener("click", signIn);
}

if (sign_out_button) {
	sign_out_button.addEventListener("click", signOut);
}

if (sign_up_button) {
	sign_up_button.addEventListener("click", signUp);
}

checkSessionStatus();