(async function bootstrapAdmin() {
  try {
    const warningEl = document.getElementById("admin-warning");
    const tableBody = document.getElementById("admin-users");
    
    const user = await loadCurrentUser();

    if (!user) {
      warningEl.textContent = "Please log in first.";
      return;
    }

    if (user.role !== "admin") {
      warningEl.textContent = "Access Denied.";
      return;
    }
    warningEl.textContent = "Authenticated as admin.";

    const result = await api("/api/admin/users");

    tableBody.innerHTML = "";
    
    result.users.forEach((entry) => {
      const row = document.createElement("tr");

      const fields = [
        entry.id,
        entry.username,
        entry.role,
        entry.displayName,
        entry.noteCount,
      ];
      fields.forEach((value) => {
        const td = document.createElement("td");
        td.textContent = String(value);
        row.appendChild(td);
      });
      tableBody.appendChild(row);
    });
  } catch (error) {
    document.getElementById("admin-warning").textContent = 
      "An unexpected error occurred.";
    console.error(error);
  }
})();
