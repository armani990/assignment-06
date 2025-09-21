let cart = [], totalPrice = 0, allPlants = [];
const plantsGrid = document.getElementById('plants-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const categoryItems = document.querySelectorAll('.category-item');
const loadingSpinner = document.getElementById('loading-spinner');
const mobileCategory = document.getElementById('mobileCategory');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.onclick = () => mobileMenu.classList.toggle('hidden');

// Mobile Cart
const mobileCartBtn = document.getElementById("mobileCartBtn");
const mobileCartDrawer = document.getElementById("mobileCartDrawer");
const closeMobileCart = document.getElementById("closeMobileCart");
const mobileCartItems = document.getElementById("mobile-cart-items");
const mobileCartTotal = document.getElementById("mobile-cart-total");
const mobileCartNum = document.getElementById("mobile-cart-num");
const mobileCartCount = document.getElementById("mobile-cart-count");

mobileCartBtn.onclick = () => mobileCartDrawer.classList.remove("hidden");
closeMobileCart.onclick = () => mobileCartDrawer.classList.add("hidden");

async function loadAllPlants() {
  showLoading(true);
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    allPlants = data.plants;
    displayPlants(allPlants.slice(0, 9));
  } catch {
    plantsGrid.innerHTML = '<p class="text-center text-red-500">Error loading plants.</p>';
  } finally { showLoading(false); }
}

function loadPlantsByCategory(category) {
  showLoading(true);
  setTimeout(() => {
    let filtered = category === "All Trees"
      ? allPlants.slice(0, 9)
      : allPlants.filter(p => p.category === category).slice(0, 3);
    displayPlants(filtered);
    showLoading(false);
  }, 300);
}

function displayPlants(plants) {
  plantsGrid.innerHTML = plants.length
    ? ""
    : '<p class="text-center text-gray-500">No plants found.</p>';

  plants.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow hover:-translate-y-1 transition p-4 flex flex-col';
    card.innerHTML = `
      <div class="h-48 overflow-hidden rounded-lg">
        <img src="${plant.image}" class="w-full h-full object-cover hover:scale-110 transition">
      </div>
      <div class="mt-4 flex flex-col flex-grow">
        <span class="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-2">${plant.category}</span>
        <h3 class="text-lg font-semibold text-green-700 mb-2">${plant.name}</h3>
        <p class="text-sm text-gray-600 flex-grow">${plant.description?.substring(0, 80) || ""}...</p>
        <div class="mt-3 font-bold text-green-700 text-lg">৳${plant.price}</div>
        <button class="mt-3 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold add-to-cart" data-id="${plant.id}">
          Add to Cart
        </button>
      </div>`;
    plantsGrid.appendChild(card);
  });

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.onclick = () => {
      const plant = allPlants.find(p => p.id == btn.dataset.id);
      addToCart(plant);
      alert("Added to Cart");
    };
  });
}

