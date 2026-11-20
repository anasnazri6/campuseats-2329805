# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s): copilot
- What I asked for: why npm run dev blank?
- What I kept, changed or rejected, and why: because useState was called outside App component in App.jsx
- One thing the AI got wrong and how I fixed it: none

## Week 3
- Tool(s): ChatGPT

- What I asked for: Help me implement a mock API in CampusEats and fetch vendor data using `useEffect`.

- What I kept, changed or rejected, and why: I used the guidance to move vendor data into `public/api/vendors.json`, fetch the data using `fetch()`, and implement loading and error messages with a retry button. I kept my existing components and cart logic to maintain the current functionality.

- One thing the AI got wrong and how I fixed it: The initial example did not include the complete cart implementation. I retained my existing cart code and integrated the API-fetching functionality into it.

## Week 4 — Custom Hooks, Cart Context and Routing

### AI Assistance Used

- Used ChatGPT to understand and implement custom React hooks (`useLocalStorage` and `useVendors`).
- Used ChatGPT to understand React Context API and implement `CartProvider` and `useCart`.
- Used ChatGPT for guidance on React Router, including `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams` and `useNavigate`.
- Used ChatGPT to troubleshoot checkout form validation, order placement and navigation issues.
- Used ChatGPT to implement the assigned Daily Special with Countdown feature on the HomePage.

### Personal Feature

**Daily Special with Countdown (Matric last digit: 5)**

Implemented a Daily Specials section on the HomePage that:
- Displays menu items marked as daily specials.
- Shows the vendor name and item price.
- Displays a live countdown using `specialEndsAt`.
- Links each special item to its respective vendor menu page.

### Testing

- Tested cart persistence after refreshing the page.
- Tested checkout validation and order placement.
- Tested navigation to the Orders page.
- Tested Daily Special countdown and vendor navigation.

### Learning Outcome

Learned how to organise React applications using custom hooks, Context API and React Router. Also gained experience using JavaScript array methods such as `filter`, `map` and `flatMap` to display daily specials.

## Week 5 — Firebase Setup and Authentication

### AI Assistance Used

- Used ChatGPT to understand Firebase Authentication and integrate it with the CampusEats React application.
- Used ChatGPT to implement `AuthProvider` using React Context API.
- Used ChatGPT to implement email and password registration and login using Firebase Authentication.
- Used ChatGPT to implement Google Sign-In using `signInWithPopup()` and `GoogleAuthProvider`.
- Used ChatGPT to implement logout functionality using `signOut()`.
- Used ChatGPT to update `LoginPage.jsx` with authentication handling, loading states, error messages and navigation after successful login.
- Used ChatGPT to update the Header to display the logged-in user's name and provide login/logout navigation.
- Used ChatGPT to troubleshoot React Hook errors, import issues and Firebase authentication errors.

### Implementation

Implemented Firebase Authentication features that include:
- User registration with email and password.
- User login with email and password.
- Google Sign-In.
- Logout functionality.
- Authentication state monitoring using `onAuthStateChanged()`.
- Displaying the authenticated user's name or email in the Header.

### Testing

- Successfully built the project using `npm run build`.
- Checked Firebase Authentication requests using Chrome Developer Tools.
- Tested the email/password login request.
- Identified a Firebase HTTP 400 error that still requires investigation.
- Google Sign-In popup warnings were observed and require further verification.

### Learning Outcome

Learned how Firebase Authentication works with React Context API. Understood how to manage authentication states using `useState`, `useEffect` and `onAuthStateChanged()`. Also learned how to handle asynchronous authentication operations, display error messages and protect application routes based on the user's login status.

### One thing the AI got wrong and how I fixed it

The initial guidance suggested importing React Router from `react-router-dom`, but my project uses `react-router`. I checked the installed dependencies and corrected the import to use the existing package. I also corrected the Header implementation by placing React Hooks inside the `Header` component.