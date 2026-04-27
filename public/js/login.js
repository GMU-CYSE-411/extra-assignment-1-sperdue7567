document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const outputEl = document.getElementById("login-output");
  
  const formData = new FormData(event.currentTarget);
  const payload = Object.fromEntries(formData.entries());

  try {
    const result = await api("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    outputEl.textContent = JSON.stringify({ message: "Login successful" }, null, 2);
  } catch (error) {
    outputEl.textContent = JSON.stringify({ error: "Login failed" }, null, 2);
    console.error(error);
  }
});
