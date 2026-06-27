const resourceGrid = document.getElementById("resourceGrid");
const resourceCount = document.getElementById("resourceCount");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const filterButtons = document.querySelectorAll(".filter-btn");

let allResources = [];
let activeCategory = "All";

// Render the resource cards inside the page.
function renderResources(resources) {
  resourceGrid.innerHTML = "";

  if (resources.length === 0) {
    resourceGrid.innerHTML = `
      <div class="empty-state">
        <h4>No resources found</h4>
        <p>Try a different search term or category filter.</p>
      </div>
    `;
    resourceCount.textContent = "0 resources found";
    return;
  }

  resourceCount.textContent = `${resources.length} resource${resources.length === 1 ? "" : "s"} found`;

  resources.forEach((resource) => {
    const card = document.createElement("article");
    card.className = "resource-card";
    card.innerHTML = `
      <span class="resource-category">${resource.category}</span>
      <h4>${resource.title}</h4>
      <p>${resource.description}</p>
      <a class="card-button" href="${resource.url}" target="_blank" rel="noopener noreferrer">
        Visit / Open
      </a>
    `;
    resourceGrid.appendChild(card);
  });
}

// Filter the data using both search text and selected category.
function applyFilters() {
  const searchText = searchInput.value.trim().toLowerCase();

  const filtered = allResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchText) ||
      resource.category.toLowerCase().includes(searchText);

    const matchesCategory =
      activeCategory === "All" || resource.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  renderResources(filtered);
}

// Highlight the active category button.
function setActiveButton(category) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });
}

async function loadResources() {
  try {
    const response = await fetch("/api/resources");
    if (!response.ok) {
      throw new Error("Failed to load resources");
    }

    allResources = await response.json();
    renderResources(allResources);
  } catch (error) {
    resourceGrid.innerHTML = `
      <div class="empty-state">
        <h4>Could not load resources</h4>
        <p>Please make sure the server is running and try again.</p>
      </div>
    `;
    resourceCount.textContent = "Unable to load resources";
    console.error(error);
  }
}

searchInput.addEventListener("input", applyFilters);

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "All";
  setActiveButton("All");
  applyFilters();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    setActiveButton(activeCategory);
    applyFilters();
  });
});

loadResources();
