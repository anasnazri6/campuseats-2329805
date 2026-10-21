# Week 1 Reflection

### 1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

React gives me a more structured way to organize my code and UI. It is easier to connect multiple components and files together to create one page. In plain DOM code, I need to manually tell the browser what elements to create and how to update them, while React allows me to describe what the UI should look like based on the current data or state.

### 2. Why must a component name start with a capital letter?

A component name must start with a capital letter so React can recognize it as a custom component instead of a normal HTML element. For example, `Header` is treated as a React component, while `header` is treated like an HTML element.

### 3. What does a fragment `<>...</>` do, and why not just use a `<div>`?

A fragment allows me to group multiple elements without adding an extra element to the HTML structure. We use it instead of a `<div>` when we only need to group elements and do not need an actual container in the webpage.

### 4. Name one benefit of splitting the UI into small components.

One benefit is that the code becomes easier to manage and reuse. For example, I can create a `Button` component once and use it in different parts of the application instead of writing the same code repeatedly.





# Week 2 Reflection

### 1. What is the difference between props and state?

Props are data passed from a parent component to a child component. State is data that a component remembers and can update. When the state changes, React updates the UI.

### 2. Why do we use `.map()` in React?

We use `.map()` to display a list of items from an array. In CampusEats, it helps display menu items and vendor cards without writing the same code repeatedly.

### 3. What is the purpose of `onClick`?

`onClick` allows the application to respond when a user clicks something. In CampusEats, clicking a vendor changes the menu, while clicking the Add to Cart button adds an item to the cart.

### 4. Why do we use `useState`?

We use `useState` to store and update information in a component. In CampusEats, it remembers the selected vendor and the items added to the cart. When the state changes, the UI updates automatically.

### 5. Why should we use a new array when updating the cart?

We should create a new array when updating the cart because React detects state changes more reliably when a new array is created. Using `setCart((prevCart) => [...prevCart, item])` adds an item without modifying the original array.

# Week 3 Reflection

### 1. What is the purpose of `useEffect` in React?

We use `useEffect` to run code after a component renders. In CampusEats, it helps fetch vendor data from the mock API when the application loads.

### 2. Why do we use `fetch()` in CampusEats?

We use `fetch()` to request data from the API. In CampusEats, it retrieves vendor and menu information from `public/api/vendors.json` so the application can display the data.

### 3. Why do we need loading and error states?

Loading states inform users that the application is retrieving data. Error states inform users when something goes wrong, such as when the API request fails. In CampusEats, users can also click the Try again button to reload the vendor data.

### 4. What is the purpose of `AbortController`?

`AbortController` allows us to cancel a fetch request when it is no longer needed. In React, we use it in `useEffect` cleanup to prevent unnecessary requests when a component is removed or the effect runs again.

### 5. What is the difference between importing local data and fetching data from an API?

Importing local data means accessing data directly from a file in the project. Fetching data from an API means requesting data through a URL. In CampusEats, we use `fetch('/api/vendors.json')` to retrieve vendor data instead of importing `vendors.js` directly.