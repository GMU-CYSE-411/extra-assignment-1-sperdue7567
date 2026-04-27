function renderStatusPreview(displayName, statusMessage) {
  const preview = document.getElementById("status-preview");
  preview.innerHTML = "";

  const nameEl = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = displayName;

  nameEl.appendChild(strong);

  const statusEl = document.createElement("p");
  statusEl.textContent = statusMessage;

  preview.appendChild(nameEl);
  preview.appendChild(statusEl);
}

async function loadSettings(userId) {
  const result = await api(`/api/settings?userId=${encodeURIComponent(userId)}`);
  const settings = result.settings;
  
  
  
  //document.getElementById("settings-form-user-id").value = settings.userId;
  //document.getElementById("settings-user-id").value = settings.userId;

  const form = document.getElementById("settings-form");
  form.elements.displayName.value = settings.displayName;
  form.elements.theme.value = settings.theme;
  form.elements.statusMessage.value = settings.statusMessage;
  form.elements.emailOptIn.checked = Boolean(settings.emailOptIn);

  renderStatusPreview(setting.displayName, settings.statusMessage);
  
  document.getElementById("status-preview").textContent = 
    JSON.stringify({
      displayName: settings.displayName,
      theme: settings.theme,
      emailOptIn: settings.emailOptIn
      }, null, 2);
  
}

(async function bootstrapSettings() {
  try {
    const user = await loadCurrentUser();

    if (!user) {
      document.getElementById("settings-output").textContent = 
        JSON.stringify({ error: "Failed to load settings." }, null, 2);
      console.error(error);
      
    }

    await loadSettings(user.id);
  } catch (error) {
    writeJson("settings-output", { error: error.message });
  }
})();



document.getElementById("settings-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const payload = {
    //userId: formData.get("userId"),
    displayName: formData.get("displayName"),
    theme: formData.get("theme"),
    statusMessage: formData.get("statusMessage"),
    emailOptIn: formData.get("emailOptIn") === "on"
  };

  const result = await api("/api/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  document.getElementById("settings-output").textContent = 
    JSON.stringify({ success: true }, null, 2);
  
  await loadSettings(p);
});

async function toggleEmail(enabled) {
  const result = await api("/api/settings/toggle-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ enabled }),
  });

  document.getElementById("settings-output").textContent = 
    JSON.stringify({ success: true }, null, 2);
}

document.getElementById("enable-e,ail").addEventListener("click", () => toggleEmail(true));
document.getElementById("disable-email").addEventListener("click", () => toggleEmail(false));
