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
