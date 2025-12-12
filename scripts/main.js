import { supabase } from "/scripts/supabase.js";
const auth_dialog = document.getElementById("auth_dialog");
const profile_dialog = document.getElementById("profile_dialog");
const auth_open_button = document.getElementById("auth_open_button");
const profile_open_button = document.getElementById("profile_open_button");
const auth_close_button = document.getElementById("auth_close_button");
const profile_close_button = document.getElementById("profile_close button");

if (auth_open_button) {
	auth_open_button.addEventListener("click", () => {
		auth_dialog.showModal();
	});
}

if (profile_open_button) {
	profile_open_button.addEventListener("click", () => {
		profile_dialog.showModal();
	});
}

if (auth_close_button) {
	auth_close_button.addEventListener("click", () => {
		auth_dialog.close();
	});
}

if (profile_close_button) {
	profile_close_button.addEventListener("click", () => {
		profile_dialog.close();
	});
}