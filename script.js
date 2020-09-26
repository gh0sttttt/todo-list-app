const form = document.getElementById('form');
const itemList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.getElementById('filter');
const itemInput = document.getElementById('item');

// Load all event listeners
loadEventListeners();

// Get items from LS
function getItems() {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(item));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.appendChild(link);
    itemList.appendChild(li);
  });
}

// Add items
function addItem(e) {
  if (itemInput.value === '') {
    alert('Try typing something in the add item field to add an item.');
  } else {
    // Create li 
    const li = document.createElement('li');
    // Add class to li
    li.className = 'collection-item';
    // Create text and eppend to li
    li.appendChild(document.createTextNode(itemInput.value));
    // Create new link el
    const link = document.createElement('a');
    // Add class to link
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    itemList.appendChild(li);
    // Store in LS
    storeItemToLocalStorage(itemInput.value);
    // Clear input
    itemInput.value = '';

    e.preventDefault();
  }
};

// Store item to LS
function storeItemToLocalStorage(item) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  }
  else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  // Push to LS
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

// Remove Item
function removeItem(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete this item from the list?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Item From LS
function removeItemFromLocalStorage(listItem) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.forEach((item, index) => {
    if (listItem.textContent === item) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
}

// Clear All Items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  clearItemsFromLocalStorage();
}

// Clear LS
function clearItemsFromLocalStorage() {
  localStorage.clear();
}

// Filter Items
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(item => {
    const filter = item.firstChild.textContent;
    if (filter.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block';
    }
    else {
      item.style.display = 'none';
    }
  });
}

// Event Listeners
function loadEventListeners() {
  // Load from LS
  document.addEventListener('DOMContentLoaded', getItems);
  // Add Item
  form.addEventListener('submit', addItem);
  // Remove Item
  itemList.addEventListener('click', removeItem);
  // Filter Items
  filter.addEventListener('keyup', filterItems);
  // Clear All items
  clearBtn.addEventListener('click', clearItems);
};