// Sample data for products (can be replaced with database data in the future)
const products = [
    { id: 1, name: "Shoe 1", price: 100, image: "shoe1.jpg" },
    { id: 2, name: "Shoe 2", price: 120, image: "shoe2.jpg" },
    { id: 3, name: "Shoe 3", price: 90, image: "shoe3.jpg" },
  ];
  
  const cart = [];
  
  // Function to render the product items on the homepage
  function renderProducts() {
    const productGrid = document.querySelector(".product-grid");
  
    products.forEach((product) => {
      // Create HTML elements for each product
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
  
      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;
  
      const productName = document.createElement("h3");
      productName.textContent = product.name;
  
      const productPrice = document.createElement("p");
      productPrice.textContent = `$${product.price}`;
  
      const addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.addEventListener("click", () => addToCart(product));
  
      // Append elements to product item
      productItem.appendChild(productImage);
      productItem.appendChild(productName);
      productItem.appendChild(productPrice);
      productItem.appendChild(addToCartButton);
  
      // Append product item to the product grid
      productGrid.appendChild(productItem);
    });
  }
  
  // Function to add items to the cart
  function addToCart(product) {
    // Check if product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if already in cart
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCartPreview();
  }
  
  // Function to update cart preview (can be displayed in header or sidebar)
  function updateCartPreview() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartElement = document.querySelector("#cart");
    cartElement.textContent = `Cart (${cartCount})`;
  }
  
  // Initialize the products on page load
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartPreview(); // Initial cart preview update
  });
// Toggle collapsible sections
document.querySelectorAll('.collapsible').forEach(item => {
    item.addEventListener('click', () => {
      // Toggle the display of the next sibling element (the submenu)
      const submenu = item.nextElementSibling;
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
  });
  const toggleButton = document.getElementById('toggle-sidebar');
  const sidebar = document.getElementById('sidebar');
  
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide sidebar
  });
// Add active class to the clicked item
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      // Remove 'active' class from all links
      document.querySelectorAll('.sidebar ul li a').forEach(el => el.classList.remove('active'));
      // Add 'active' class to the clicked link
      link.classList.add('active');
    });
  });
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart.push(...savedCart);
    }
    updateCartPreview();
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    renderProducts();
    updateCartPreview();
});
async function fetchProducts() {
    const response = await fetch('products.json'); // Assuming products.json contains your product data
    const data = await response.json();
    // Use data to render products
}
const cart = [];

// Function to render the cart contents
function renderCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = ""; // Clear previous cart items

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("cart-total").innerHTML = "";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const itemName = document.createElement("span");
        itemName.textContent = `${item.name} (x${item.quantity})`;
        
        const itemPrice = document.createElement("span");
        itemPrice.textContent = `$${item.price * item.quantity}`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromCart(item.id));

        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(removeButton);
        cartItemsDiv.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    document.getElementById("cart-total").textContent = `Total: $${total}`;
}

// Function to remove items from the cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1); // Remove the item from the cart
        updateCartPreview(); // Update cart preview count
        renderCart(); // Re-render cart items
    }
}

// Function to update the cart preview
function updateCartPreview() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartElement = document.querySelector("#cart");
    cartElement.textContent = `Cart (${cartCount})`;
}

// Function to add items to the cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if already in cart
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartPreview();
    renderCart(); // Update the cart view after adding an item
}

// Initialize the products on page load
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartPreview();
    renderCart(); // Initial cart render
});
