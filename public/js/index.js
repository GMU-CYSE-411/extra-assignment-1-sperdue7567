(async function bootstrapHome() {
  try {
    const sessionBox = document.getElementById("session-box");
    const adminLink = document.getElementById("admin-link");
    
    const user = await loadCurrentUser();

    const safeUser = user 
      ? {
          id: user.id,
          username: user.username,
          role: user.role,
        }
      : { anonymous: true };
    
          
    //writeJson("session-box", user || { anonymous: true });
    sessionBox.textContent = JSON.stringify(safeUser, null, 2);

    if (!user || user.role !== "admin") {
      document.getElementById("admin-link").style.opacity = "0.55";
    }
  } catch (error) {
    document.getElementById("session-box").textContent = 
      JSON.stringify({ error: "Failed to load session." }, null, 2);
    
    console.error(error);
  }
})();
