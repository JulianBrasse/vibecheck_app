const supabase_url = "https://xnfmgcnmdscyyaytacgp.supabase.co";
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZm1nY25tZHNjeXlheXRhY2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODkyMTIsImV4cCI6MjA2ODg2NTIxMn0.pY02zXDHqGpauVf1iTaiRsOl1i-K6upjWc9NMQmdSjM";
const supabase = window.supabase.createClient(supabase_url, supabase_key);

let display_name;

const name_input = document.getElementById("name_input");
const save_button = document.getElementById("save_button");
const name_text = document.getElementById("name_text");

async function get_user_name() {
	const { data: { user } } = await supabase.auth.getUser();
	display_name = user?.user_metadata?.full_name;
	console.log(display_name);
	name_text.innerText = display_name || "user";
}

async function set_user_name() {
	display_name = name_input.value;
	await supabase.auth.updateUser({ data: { full_name: display_name } });
}

get_user_name();