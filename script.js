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

function addToCart(plant) {
  const item = cart.find(i => i.id === plant.id);
  item ? item.quantity++ : cart.push({ ...plant, quantity: 1 });
  totalPrice += plant.price;
  updateCart();
}

function removeFromCart(id) {
  const idx = cart.findIndex(i => i.id == id);
  if (idx > -1) {
    totalPrice -= cart[idx].price * cart[idx].quantity;
    cart.splice(idx, 1);
    updateCart();
  }
}

function updateCart() {
  const renderItems = (container, isMobile = false) => {
    container.innerHTML = cart.length
      ? ""
      : '<p class="text-center text-gray-500">Your cart is empty</p>';
    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "flex justify-between items-center py-2 border-b";
      div.innerHTML = `
        <div>
          <div class="font-medium">${item.name}</div>
          <div class="text-green-700 text-sm">৳${item.price} x ${item.quantity}</div>
        </div>
        <button class="text-red-500 remove" data-id="${item.id}"><i class="fas fa-times"></i></button>
      `;
      container.appendChild(div);
    });
    container.querySelectorAll(".remove").forEach(b => b.onclick = () => removeFromCart(b.dataset.id));

    if (isMobile) {
      mobileCartTotal.textContent = "৳" + totalPrice;
      mobileCartNum.textContent = cart.reduce((a, c) => a + c.quantity, 0);
      mobileCartCount.textContent = mobileCartNum.textContent;
    }
  };

  renderItems(cartItems);
  renderItems(mobileCartItems, true);

  cartTotal.textContent = "৳" + totalPrice;
  cartCount.textContent = cart.reduce((a, c) => a + c.quantity, 0);
}

function showLoading(show) {
  loadingSpinner.classList.toggle('hidden', !show);
}

categoryItems.forEach(item => {
  item.onclick = () => {
    categoryItems.forEach(i => i.classList.remove('bg-green-700', 'text-white'));
    item.classList.add('bg-green-700', 'text-white');
    loadPlantsByCategory(item.textContent.trim());
  };
});
mobileCategory.onchange = () => loadPlantsByCategory(mobileCategory.value);

// --- Modal Functionality ---
const plantModal = document.getElementById("plantModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");

function addModalEvents() {
  document.querySelectorAll("#plants-grid h3").forEach(h3 => {
    h3.onclick = () => {
      const card = h3.closest("div.flex.flex-col");
      const plantName = h3.textContent;
      const plant = allPlants.find(p => p.name === plantName);

      if (plant) {
        modalImage.src = plant.image;
        modalName.textContent = plant.name;
        modalDescription.textContent = plant.description || "No description available";
        plantModal.classList.remove("hidden");
        plantModal.classList.add("flex");
      }
    };
  });
}

closeModal.onclick = () => {
  plantModal.classList.add("hidden");
  plantModal.classList.remove("flex");
};

plantModal.onclick = (e) => {
  if (e.target === plantModal) {
    plantModal.classList.add("hidden");
    plantModal.classList.remove("flex");
  }
};

const originalDisplayPlants = displayPlants;
displayPlants = (plants) => {
  originalDisplayPlants(plants);
  addModalEvents();
};

loadAllPlants();
