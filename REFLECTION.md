# Week 1 Reflection

### 1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

React gives me a more structured way to organize my code and UI. It is easier to connect multiple components and files together to create one page. In plain DOM code, I need to manually tell the browser what elements to create and how to update them, while React allows me to describe what the UI should look like based on the current data or state.

### 2. Why must a component name start with a capital letter?

A component name must start with a capital letter so React can recognize it as a custom component instead of a normal HTML element. For example, `Header` is treated as a React component, while `header` is treated like an HTML element.

### 3. What does a fragment `<>...</>` do, and why not just use a `<div>`?

A fragment allows me to group multiple elements without adding an extra element to the HTML structure. We use it instead of a `<div>` when we only need to group elements and do not need an actual container in the webpage.

### 4. Name one benefit of splitting the UI into small components.

One benefit is that the code becomes easier to manage and reuse. For example, I can create a `Button` component once and use it in different parts of the application instead of writing the same code repeatedly.

