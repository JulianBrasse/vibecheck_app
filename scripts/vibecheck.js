import { supabase } from "/scripts/supabase.js";

const happiness_scale = document.getElementById("happiness_scale");
const submit_vibe_button = document.getElementById("submit_vibe_button");
const happiness_scale_number = document.getElementById("happiness_scale_number");

async function submitVibe() {
	const happiness_level = (happiness_scale.valueAsNumber / 4);
	alert(happiness_level);
}

async function showVibe() {
	const happiness_level = (happiness_scale.valueAsNumber / 4);
	happiness_scale_number.innerText = happiness_level + " / 10";
}

if (submit_vibe_button) {
	submit_vibe_button.addEventListener("click", submitVibe);
}

if (happiness_scale) {
	happiness_scale.addEventListener("input", showVibe);
}