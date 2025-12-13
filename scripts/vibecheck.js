import { supabase } from "/scripts/supabase.js";

const happiness_scale = document.getElementById("happiness_scale");
const submit_vibe_button = document.getElementById("submit_vibe_button");
const happiness_scale_number = document.getElementById("happiness_scale_number");
const happiness_reason_input = document.getElementById("happiness_reason");

async function submitVibe() {
	const happiness_level = happiness_scale.valueAsNumber;
	const happiness_reason = happiness_reason_input.value;
	alert("level: " + happiness_level + " for reason: " + happiness_reason);
}

async function showVibe() {
	const happiness_level = happiness_scale.valueAsNumber;
	happiness_scale_number.innerText = happiness_level + " / 10";
}

if (submit_vibe_button) {
	submit_vibe_button.addEventListener("click", submitVibe);
}

if (happiness_scale) {
	happiness_scale.addEventListener("input", showVibe);
}