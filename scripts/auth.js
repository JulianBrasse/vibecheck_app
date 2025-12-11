// 1. Initialize Supabase Client
const supabaseUrl = "https://xnfmgcnmdscyyaytacgp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZm1nY25tZHNjeXlheXRhY2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODkyMTIsImV4cCI6MjA2ODg2NTIxMn0.pY02zXDHqGpauVf1iTaiRsOl1i-K6upjWc9NMQmdSjM";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. Select Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const messageBox = document.getElementById("message");

// 3. Handle Sign Up
if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            messageBox.innerText = error.message;
        } else {
            messageBox.style.color = "green";
            messageBox.innerText = "Check your email for the confirmation link!";
        }
    });
}

// 4. Handle Login
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            messageBox.innerText = error.message;
        } else {
            // Redirect to dashboard on success
            window.location.href = "dashboard.html";
        }
    });
}

// 5. Handle Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        await supabase.auth.signOut();
        window.location.href = "index.html";
    });
}

// 6. Protect the Dashboard (Check if user is logged in)
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    const currentPage = window.location.pathname;

    // If on dashboard but no session, kick back to login
    if (currentPage.includes("dashboard.html") && !session) {
        window.location.href = "index.html";
    }
    // If on index but we HAVE a session, send to dashboard
    if ((currentPage.includes("index.html") || currentPage === "/") && session) {
        window.location.href = "dashboard.html";
    }
}

// Run the check when page loads
checkUser();