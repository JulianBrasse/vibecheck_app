import { supabase } from "/scripts/supabase.js";

const happiness_scale = document.getElementById("happiness_scale");
const submit_vibe_button = document.getElementById("submit_vibe_button");

async function submitVibe() {
    const happiness_level = (happiness_scale.valueAsNumber / 40);
    alert(happiness_level);
}

if (submit_vibe_button) {
	submit_vibe_button.addEventListener("click", submitVibe);
}