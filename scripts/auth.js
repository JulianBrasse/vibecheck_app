import { supabase } from "/scripts/supabase.js";

// 2. Select Elements
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const login_button = document.getElementById("login_button");
const signup_button = document.getElementById("signup_button");
const logout_button = document.getElementById("logout_button");
const message_text = document.getElementById("message_text");

// 3. Handle Sign Up
if (signup_button) {
	signup_button.addEventListener("click", async () => {
		const email = email_input.value;
		const password = password_input.value;

		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			message_text.innerText = error.message;
		} else {
			message_text.innerText = "success";
		}
	});
}

// 4. Handle Login
if (login_button) {
	login_button.addEventListener("click", async () => {
		const email = email_input.value;
		const password = password_input.value;

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			message_text.innerText = error.message;
		} else {
			// Redirect to dashboard on success
			window.location.href = "dashboard.html";
		}
	});
}

// 5. Handle Logout
if (logout_button) {
	logout_button.addEventListener("click", async () => {
		await supabase.auth.signOut();
		window.location.href = "index.html";
	});
}

// 6. Protect the Dashboard (Check if user is logged in)
async function checkUser() {
	const { data: { session } } = await supabase.auth.getSession();
	const current_page = window.location.pathname;

	// If on dashboard but no session, kick back to login
	if (current_page.includes("dashboard.html") && !session) {
		window.location.href = "index.html";
	}
	// If on index but we HAVE a session, send to dashboard
	if ((current_page.includes("index.html") || current_page === "/") && session) {
		window.location.href = "dashboard.html";
	}
}

// Run the check when page loads
checkUser();