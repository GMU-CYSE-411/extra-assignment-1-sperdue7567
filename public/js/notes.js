function noteCard(note) {
  const article = document.createElement("article");
  article.className = "note-card";
  
  const title = document.createElement("h3");
  title.textContent = note.title;

  const meta = document.createElement("p");
  meta.className = "note-meta";
  meta.textContent = `Owner: ${note.ownerUsername} | ID: ${note.id} | Pinned: ${note.pinned}`;

  const body = document.createElement("div");
  body.className = "note-body";
  meta.textContent = note.body;

  article.appendChild(title);
  article.appendChild(meta);
  article.appendChild(body);
  return article;
}

async function loadNotes(search) {
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }

  const result = await api(`/api/notes?${query.toString()}`);
  
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  results.notes.forEach((note) => {
    noteslist.appendChild(createNoteCard(note));
  });
}

(async function bootstrapNotes() {
  try {
    const user = await loadCurrentUser();

    if (!user) {
      document.getElementById("notes-list").textContent = "Please log in first.";
      return;
    }

    
    await loadNotes("");
  } catch (error) {
    document.getElementById("notes-list").textContent = Failed to load notes.";
    console.error(error);
  }
})();

document.getElementById("search-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  await loadNotes(formData.get("search")); //gets rid of user.id calls
});

document.getElementById("create-note-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const payload = {
    //ownerId: formData.get("ownerId"),
    title: formData.get("title"),
    body: formData.get("body"),
    pinned: formData.get("pinned") === "on"
  };

  await api("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(payload)
  });

  await loadNotes("");
  event.currentTarget.reset();
 
});
