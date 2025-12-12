import { supabase } from "/scripts/supabase.js";

let display_name;

const name_input = document.getElementById("name_input");
const save_button = document.getElementById("save_button");
const name_text = document.getElementById("name_text");

async function getUserName() {
	const { data: { user } } = await supabase.auth.getUser();
	display_name = user?.user_metadata?.full_name;
	console.log("supabase full_name: " + user?.user_metadata?.full_name);
	console.log("variable display_name: " + display_name);
	name_text.innerText = display_name || "user";
}

async function setUserName() {
	display_name = name_input.value;
	await supabase.auth.updateUser({ data: { full_name: display_name } });
}

getUserName();