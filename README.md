# React Interview Questions Based on Weather App Code

This document contains interview questions and answers covering core React concepts used in the provided weather application code. The answers are designed to be simple, detailed, and include code snippets from the project for context.

---

## Questions and Answers

Here are potential interview questions and their answers, based on the provided `App.js`, `weather.js`, and component files (`HourlyForecast.js`, `DailyForecast.js`, `SearchPage.js`).

### Functional Components

1.  **Q: What is a functional component in React?**
    * **A:** A functional component is a JavaScript function that returns a React element (usually written using JSX). It's the modern way to write components in React, especially with the introduction of Hooks.
    * *Example from code:*
        ```javascript
        function App() {
          // ... component logic ...
          return ( /* JSX */ );
        }
        // or as an arrow function:
        const HourlyForecast = ({ hours, unit }) => {
          // ... component logic ...
          return ( /* JSX */ );
        }
        ```

2.  **Q: How do you define a functional component?**
    * **A:** You define it as a standard JavaScript function (either a function declaration or an arrow function) that accepts `props` as its first argument and returns JSX.

### JSX

3.  **Q: What is JSX?**
    * **A:** JSX stands for JavaScript XML. It's a syntax extension for JavaScript that looks similar to HTML and allows you to write UI structures directly within your JavaScript code. It's not required to use React, but it makes writing React components much more readable and intuitive.
    * *Example from code:*
        ```javascript
        // Inside App.js return statement
        <div className="main-container">
          <div className="header">
            <Link to="/search" className="search-button">
              Search City
            </Link>
            {/* ... other JSX ... */}
          </div>
          {/* ... more JSX ... */}
        </div>
        ```

4.  **Q: Why do we use JSX in React?**
    * **A:** JSX makes it easier to visualize the UI structure alongside the logic that renders it. It's more readable than using `React.createElement()` calls directly and provides compile-time checks for syntax errors.

5.  **Q: Is JSX valid JavaScript?**
    * **A:** No, JSX is not standard JavaScript. It needs to be transformed (compiled) into regular JavaScript function calls (like `React.createElement()`) by a tool like Babel before the browser can understand it.

### Props

6.  **Q: What are props in React?**
    * **A:** Props (short for properties) are a way to pass data from a parent component down to a child component. They are read-only within the child component, meaning a child should not modify the props it receives.
    * *Example from code:*
        ```javascript
        // In App.js, passing props to CurrentWeather
        <CurrentWeather
          data={weatherData?.current}
          location={weatherData?.location}
          unit={unit}
        />
        // In CurrentWeather.js (hypothetical component receiving them)
        const CurrentWeather = ({ data, location, unit }) => { /* ... use data, location, unit */ };
        ```

7.  **Q: How do you pass props to a component?**
    * **A:** You pass props as attributes on the component tag when you use it in JSX. The attribute name becomes the prop name, and the value (inside curly braces `{}`) is the data you want to pass.
    * *Example from code:* (See example for Q6)

8.  **Q: How do you receive props in a functional component?**
    * **A:** Props are received as the first argument to the functional component function. You can access them as an object or use object destructuring to directly get specific props.
    * *Example from code:*
        ```javascript
        // Receiving 'hours' and 'unit' props using destructuring
        const HourlyForecast = ({ hours, unit }) => {
          // ... use hours and unit here ...
        };
        ```

9.  **Q: Are props mutable (can they be changed) in the child component?**
    * **A:** No, props are read-only in the child component. A child component should never directly modify the props it receives. If data needs to change, the parent component should manage the state and pass down updated props.

### State (`useState`)

10. **Q: What is state in React?**
    * **A:** State is data that is managed within a component and can change over time. When a component's state changes, React re-renders the component to update the UI based on the new state. State is typically used for data that is internal to a component and affects its rendering or behavior.

11. **Q: How do you use state in a functional component?**
    * **A:** You use the `useState` hook to add state to a functional component.
    * *Example from code:*
        ```javascript
        import { useState } from "react";

        function App() {
          const [unit, setUnit] = useState("c"); // Declaring a state variable 'unit'
          const [weatherData, setWeatherData] = useState(null); // Another state variable
          const [error, setError] = useState(""); // Yet another state variable
          // ... rest of the component
        }
        ```

12. **Q: What does `useState` return?**
    * **A:** The `useState` hook returns an array with exactly two elements:
        1.  The current state value.
        2.  A function to update the state value (often called the "setter function").
    * *Example from code:* `const [unit, setUnit] = useState("c");` here, `unit` is the current state value, and `setUnit` is the function to update it.

13. **Q: How do you update state using `useState`?**
    * **A:** You call the setter function returned by `useState` with the new value you want the state to have.
    * *Example from code:*
        ```javascript
        // In App.js, updating the 'unit' state
        <button onClick={() => setUnit(unit === "c" ? "f" : "c")} className="unit-toggle">
          °{unit.toUpperCase()}
        </button>

        // In App.js, updating weatherData or error state
        setWeatherData(data);
        setError("");
        setError(err.message);

        // In SearchPage.js, updating 'query' state
        onChange={(e) => setQuery(e.target.value)}
        ```

14. **Q: What happens when you update state using the setter function?**
    * **A:** When you call the setter function with a new value, React schedules a re-render of the component. The component function runs again, and the `useState` hook returns the new state value.

15. **Q: Give an example of state being used in the code to control UI.**
    * **A:**
        * The `unit` state controls whether temperatures are displayed in Celsius or Fahrenheit.
        * The `weatherData` state holds the fetched weather information, and its presence determines whether weather components are rendered.
        * The `error` state holds an error message and is used to conditionally display an error message.
        * In `SearchPage`, `query` holds the input value, `loading` disables the button and changes its text, and `error` displays search errors.

### Effects (`useEffect`)

16. **Q: What is the `useEffect` hook used for?**
    * **A:** The `useEffect` hook in functional components is used to perform "side effects". Side effects are actions that happen outside the normal rendering process, such as fetching data, subscribing to events, or directly interacting with the browser's DOM.

17. **Q: How is `useEffect` used in the `App.js` file?**
    * **A:** `useEffect` is used in `App.js` to fetch initial weather data when the component mounts (renders for the first time). It first tries to use the browser's geolocation API to get the user's current location. If successful, it fetches weather for those coordinates; otherwise, it fetches weather for a default city ("Pune").
    * *Example from code:*
        ```javascript
        useEffect(() => {
          if (navigator.geolocation) {
            // ... geolocation logic ...
            updateWeatherData(${latitude},${longitude});
          } else {
            updateWeatherData("Pune");
          }
        }, [updateWeatherData]); // Dependency array
        ```

18. **Q: What is the dependency array in `useEffect`?**
    * **A:** The dependency array is the second argument passed to `useEffect`. It's an array of values (variables, state, props, functions) that the effect relies on. React watches these values, and if any of them change between renders, the effect function will re-run.

19. **Q: What does an empty dependency array (`[]`) mean for `useEffect`?**
    * **A:** An empty dependency array means the effect should only run **once** after the initial render of the component. It tells React that the effect doesn't depend on any values from props or state that change over time, so there's no need to re-run it on subsequent renders.

20. **Q: What happens if you omit the dependency array from `useEffect`?**
    * **A:** If you omit the dependency array, the effect will run after *every* render of the component. This is rarely what you want and can easily lead to infinite loops or performance issues (e.g., fetching data on every render).

21. **Q: Why is `updateWeatherData` included in the dependency array of the `useEffect` in `App.js`?**
    * **A:** The `useEffect` hook calls the `updateWeatherData` function. React's linting rules and best practices require that any function or variable used inside `useEffect` that is defined *outside* the effect function (but within the component's scope) should be included in the dependency array. This is because if `updateWeatherData` were to change for some reason, the effect needs to be aware of that change and potentially re-run with the new version of the function. (Note: `useCallback` is used on `updateWeatherData` specifically to *prevent* it from changing on every render, making the dependency stable).

### Callbacks (`useCallback`)

22. **Q: What is the `useCallback` hook used for?**
    * **A:** The `useCallback` hook is used to memoize callback functions. It returns a memoized version of the function that only changes if one of the dependencies in its dependency array changes.

23. **Q: Why would you use `useCallback`?**
    * **A:** `useCallback` is primarily used for performance optimization. It prevents functions from being re-created on every render. This is particularly useful when passing callback functions down to child components (especially those wrapped in `React.memo`) or when functions are dependencies of other hooks like `useEffect` or `useMemo`. Re-creating functions unnecessarily can break memoization in child components or cause effects to re-run too often.

24. **Q: How is `useCallback` used in the `App.js` file?**
    * **A:** `useCallback` is used to define the `updateWeatherData` function.
    * *Example from code:*
        ```javascript
        const updateWeatherData = useCallback(async (location) => {
          // ... data fetching and state updating logic ...
        }, []); // Dependency array for useCallback
        ```

25. **Q: Why is `updateWeatherData` wrapped in `useCallback` with an empty dependency array in this code?**
    * **A:** `updateWeatherData` is used as a dependency in the `useEffect` hook for initial data fetching. Without `useCallback`, a *new* `updateWeatherData` function would be created on *every* render of the `App` component. This would cause the `useEffect` dependency (`updateWeatherData`) to change on every render, leading to an infinite loop of fetching data. By wrapping it in `useCallback` with an empty dependency array (`[]`), we ensure that the `updateWeatherData` function reference remains the same across renders, thus preventing `useEffect` from re-running unnecessarily and stopping the infinite loop.

### Conditional Rendering

26. **Q: How do you conditionally render elements in React?**
    * **A:** You can use standard JavaScript control flow techniques within your JSX:
        * **`if` statements:** Can be used outside the `return` or within the component logic.
        * **Logical `&&` operator:** If the condition is true, the element after `&&` is rendered.
        * **Ternary operator (`condition ? trueExpression : falseExpression`):** For choosing between two different outcomes.
        * **Element Variables:** Store elements in variables and render the variable based on a condition.
    * *Example from code (using `&&` and `if`):*
        ```javascript
        // In App.js, showing loading message only if weatherData and error are falsey
        {!weatherData && !error && <p className="loading">Loading...</p>}

        // In HourlyForecast.js, returning null if hours prop is not provided
        if (!hours) return null;

        // In SearchPage.js, conditionally showing error message
        {error && (
          <div className="error-message">
            {error && <p className="error">{error}</p>}
          </div>
        )}
        ```

27. **Q: Give an example of conditional rendering from the provided code.**
    * **A:** (See example for Q26). Another example is in `HourlyForecast.js` and `DailyForecast.js` where `if (!hours) return null;` and `if (!days) return null;` prevent rendering if the necessary data hasn't arrived yet. Also, the `unit` state is used to conditionally display Celsius or Fahrenheit temperatures.

### Lists and Keys

28. **Q: How do you render lists of elements in React?**
    * **A:** You typically use the JavaScript `Array.prototype.map()` method to iterate over an array of data and return a React element for each item in the array.
    * *Example from code:*
        ```javascript
        // In HourlyForecast.js, mapping over the 'hours' array
        {hours.map((hour, index) => (
          <div key={index} className="hour-card">
            {/* ... hour details ... */}
          </div>
        ))}
        ```

29. **Q: What is the `key` prop when rendering lists?**
    * **A:** The `key` prop is a special string attribute you need to include when creating lists of elements. It helps React identify which items in the list have changed, are added, or are removed. Keys should be unique among siblings in the list.

30. **Q: Why is the `key` prop important?**
    * **A:** Keys are crucial for React's reconciliation process (how React updates the UI efficiently). They allow React to intelligently update only the necessary DOM elements instead of re-rendering the entire list. This improves performance and helps maintain the correct state of list items (like input values or scroll position).

31. **Q: What value should you typically use for the `key` prop?**
    * **A:** The best key is a unique ID coming from your data (e.g., `item.id`). If you don't have stable IDs, you can use the item's index in the array, but this is generally discouraged if the list can be reordered, filtered, or new items can be added/removed in the middle, as it can lead to performance issues and incorrect component state. In the provided code, `index` is used, which is acceptable for this specific case where the forecast lists are static once loaded.

### Event Handling

32. **Q: How do you handle events in React (like clicks, input changes, form submissions)?**
    * **A:** You pass functions as props to the DOM elements that you want to listen to events on. The prop names are camel-cased versions of the standard HTML event names (e.g., `onClick` instead of `onclick`, `onChange` instead of `onchange`).
    * *Example from code:*
        ```javascript
        // In App.js, handling button click
        <button onClick={() => setUnit(unit === "c" ? "f" : "c")} className="unit-toggle">

        // In SearchPage.js, handling input change
        onChange={(e) => { setQuery(e.target.value); setError(null); }}

        // In SearchPage.js, handling form submission
        <form onSubmit={handleSearch}>
        ```

33. **Q: What is the event object in React event handlers?**
    * **A:** React provides a synthetic event object to your event handlers. This object is a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event but works consistently across different browsers. You can access properties like `e.target` (the element that triggered the event) or methods like `e.preventDefault()`.

34. **Q: What does `e.preventDefault()` do, and why is it used in the `SearchPage.js` code?**
    * **A:** `e.preventDefault()` is a method on the event object that stops the browser's default behavior for that event. In the `SearchPage.js` file, it's used inside the `handleSearch` function called by the form's `onSubmit` event. The default behavior of a form submission is to reload the page, which we don't want in a single-page React application. `e.preventDefault()` stops this default page reload.

### Forms

35. **Q: How are form inputs typically handled in React?**
    * **A:** Form inputs are usually handled using "controlled components." In a controlled component, the value of the input element is controlled by React state. The state is updated whenever the input value changes (using the `onChange` event), and the input element's `value` prop is set to the state value.

36. **Q: What is a "controlled component"? Give an example from the code.**
    * **A:** A controlled component is a form input element (like `<input>`, `<textarea>`, `<select>`) whose value is managed by React state. The input's value is read from state, and state updates are handled by event listeners (like `onChange`).
    * *Example from code:* The search input in `SearchPage.js` is a controlled component:
        ```javascript
        const [query, setQuery] = useState(""); // State to hold input value
        // ...
        <input
          type="text"
          value={query} // Input value is controlled by the 'query' state
          onChange={(e) => { setQuery(e.target.value); setError(null); }} // Update state on change
          placeholder="Enter city name"
        />
        ```

### React Router

37. **Q: What is React Router used for?**
    * **A:** React Router is a popular library used for handling client-side routing in React applications. It allows you to build Single Page Applications (SPAs) with multiple views or pages that correspond to different URLs, without requiring a full page reload when navigating between them.

38. **Q: What is `BrowserRouter` and what does it do?**
    * **A:** `BrowserRouter` is a router implementation that uses the HTML5 history API (`pushState`, `replaceState`) to keep your UI in sync with the URL. It's typically the recommended router for web browsers. It wraps your entire application or the part of your application that needs routing.

39. **Q: What do `Routes` and `Route` components do?**
    * **A:**
        * `Routes`: A container component that looks through its `Route` children and renders the element of the *first* `Route` whose `path` matches the current URL.
        * `Route`: Renders a specific element (`element` prop) when the current URL matches its `path` prop.
    * *Example from code:*
        ```javascript
        <Routes>
          <Route
            path="/" // Matches the root URL
            element={ /* Renders the main weather view */ }
          />
          <Route
            path="/search" // Matches the /search URL
            element={ /* Renders the SearchPage component */ }
          />
        </Routes>
        ```

40. **Q: What does the `Link` component do?**
    * **A:** The `Link` component is used to create navigation links. It's a declarative way to navigate between different routes in your application. Unlike a standard `<a>` tag which would cause a full page reload, a `Link` prevents the default browser navigation and uses React Router's history mechanism to change the URL and render the appropriate component.
    * *Example from code:*
        ```javascript
        <Link to="/search" className="search-button">
          Search City
        </Link> // Creates a link that navigates to the /search route
        ```

### Asynchronous Operations & Data Fetching

41. **Q: How are asynchronous operations like data fetching handled in this code?**
    * **A:** Asynchronous operations are handled using JavaScript's built-in `Promise` functionality along with the `async` and `await` keywords. The `Workspace` API is used to make HTTP requests.
    * *Example from code:*
        ```javascript
        // In services/weather.js
        export async function fetchWeather(location, days = 5) {
          // ... fetch call ...
          const response = await fetch(url); // wait for the response
          // ... error handling ...
          const data = await response.json(); // wait for the body to be parsed
          return data;
        }

        // In App.js or SearchPage.js
        const data = await fetchWeather(location); // await the fetchWeather function call
        ```

42. **Q: Where in the application's flow does data fetching happen?**
    * **A:**
        * **Initial Load:** Data fetching happens in the `useEffect` hook in `App.js` when the application first loads (either based on geolocation or default city).
        * **Search:** Data fetching happens in the `handleSearch` function within the `SearchPage` component when the user submits the search form. This function calls the `updateWeatherData` function (passed as a prop), which in turn calls `WorkspaceWeather`.

43. **Q: How is potential network or API errors handled during data fetching?**
    * **A:**
        * In `WorkspaceWeather`, the code checks `if (!response.ok)` after the `Workspace` call. If the response status indicates an error (like 404 Not Found or 500 Server Error), it logs an error and throws a new `Error` with a user-friendly message like "Error: City not found".
        * In `App.js` and `SearchPage.js`, `try...catch` blocks are used around the calls to `updateWeatherData` (which wraps `WorkspaceWeather`). If an error is thrown during fetching, the `catch` block catches it, and the error message is stored in the component's state (`error`), which is then displayed to the user.

### Component Structure and Data Flow

44. **Q: Explain the purpose of the `services/weather.js` file.**
    * **A:** This file is responsible for separating the data fetching logic from the React components. It contains the `WorkspaceWeather` function, which knows how to construct the API URL, make the `Workspace` request, handle basic network errors, and return the parsed JSON data. This makes the components cleaner and the data fetching logic reusable and easier to test.

45. **Q: Describe the data flow for the weather information from the API call down to the `HourlyForecast` component.**
    * **A:**
        1.  The `WorkspaceWeather` function in `services/weather.js` fetches data from the API.
        2.  The fetched data is returned to the `updateWeatherData` function in `App.js`.
        3.  `updateWeatherData` updates the `weatherData` state in the `App` component using `setWeatherData`.
        4.  When `weatherData` state updates, `App` re-renders.
        5.  During the re-render, `App` passes the `hours` data (from `weatherData?.forecast?.forecastday[0]?.hour`) and the `unit` state as props to the `HourlyForecast` component.
        6.  The `HourlyForecast` component receives `hours` and `unit` as props and uses them to render the hourly forecast details.

46. **Q: How is the unit (Celsius/Fahrenheit) change handled across different components?**
    * **A:** The `unit` state is managed in the `App` component.
        * The button to toggle the unit is also in `App.js` and directly calls `setUnit` to update the state.
        * The `unit` state is then passed down as a prop to the `CurrentWeather`, `HourlyForecast`, and `DailyForecast` components.
        * Each of these child components receives the `unit` prop and uses it in its JSX to conditionally display either the Celsius (`_c`) or Fahrenheit (`_f`) temperature value from the weather data.

### General

47. **Q: What is the role of the `index.css` file?**
    * **A:** The `index.css` file (imported into `App.js`) contains the CSS styles that define the appearance of the application's elements and layout. It's where the visual design is implemented.

48. **Q: How is the "Loading..." message displayed?**
    * **A:** The "Loading..." message is displayed using conditional rendering in `App.js`. It checks if `weatherData` is currently null and `error` is also empty (`!weatherData && !error`). This condition is true while the initial data fetch is in progress (before `weatherData` is set or an `error` occurs).
    * *Example from code:*
        ```javascript
        {!weatherData && !error && <p className="loading">Loading...</p>}
        ```

49. **Q: How is the loading state handled specifically during the search?**
    * **A:** In the `SearchPage` component, there is a separate `loading` state variable managed by `useState`.
        * When the `handleSearch` function starts (before the async call), `setLoading(true)` is called.
        * While `loading` is true, the search button's text changes to "Searching..." and the button is disabled (`disabled={loading}`).
        * Once the async `onSearch` call finishes (either successfully or with an error), `setLoading(false)` is called in the `finally` block to reset the button state.

50. **Q: Explain the overall flow when the user navigates to the "/search" route.**
    * **A:**
        1.  The user clicks the "Search City" `Link` component in the `App` header.
        2.  React Router intercepts the click and updates the browser's URL to `/search` without a full page reload.
        3.  React Router's `Routes` component in `App.js` detects the URL change.
        4.  It finds the `Route` with `path="/search"`.
        5.  The element specified for that route, which is `<SearchPage />`, is rendered.
        6.  The `SearchPage` component takes over the screen, allowing the user to input a city and trigger a search via the `onSearch` prop passed from `App`.





Core Concepts
Q: What is the Virtual DOM?

A: The Virtual DOM (VDOM) is a programming concept where a virtual representation of a UI is kept in memory and synced with the "real" DOM (the browser's HTML DOM) by a library like ReactDOM. It's a lightweight copy of the actual DOM tree.   
Q: How does React use the Virtual DOM?

A: When a component's state or props change, React creates a new Virtual DOM tree for the updated component. It then compares this new VDOM tree with the previous VDOM tree using a process called "reconciliation".
Q: Explain the reconciliation process.

A: Reconciliation is the algorithm React uses to determine the most efficient way to update the browser's real DOM. When React compares the old and new Virtual DOM trees, it identifies the minimal set of changes needed to make the real DOM match the new VDOM. React then applies only these necessary changes to the real DOM, rather than re-rendering the entire DOM tree.
Q: What is the main difference between the Virtual DOM and the browser's real DOM?

A: The Virtual DOM is a lightweight, in-memory representation of the DOM created and managed by React. The browser's real DOM is the actual tree structure of HTML elements that the browser renders and interacts with. Manipulating the real DOM directly is generally slower than manipulating the Virtual DOM.
Class Components & Lifecycle (For Context)
Q: What is a class component in React?

A: A class component is a way to define a React component using ES6 classes. It extends React.Component and requires a render() method that returns JSX. Before Hooks, class components were the only way to use state and lifecycle methods.
Q: What are the main phases of a class component's lifecycle?

A: The main phases are:
Mounting: The component is being created and inserted into the DOM. (constructor, static getDerivedStateFromProps, render, componentDidMount)
Updating: The component is being re-rendered due to changes in props or state. (static getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate)   
Unmounting: The component is being removed from the DOM. (componentWillUnmount)   
Q: Explain the componentDidMount lifecycle method.

A: componentDidMount is called immediately after the component is mounted (inserted into the DOM) for the first time. It's a good place to perform side effects that require the DOM to be available, such as fetching initial data, setting up subscriptions, or initializing third-party libraries.
Q: Explain the componentDidUpdate lifecycle method.

A: componentDidUpdate is called immediately after updating occurs (after a state or prop change causes a re-render, but not for the initial render). It's used to perform side effects in response to prop or state changes, such as making network requests based on new props. It receives arguments for the previous props and previous state.
Q: Explain the componentWillUnmount lifecycle method.

A: componentWillUnmount is called just before the component is unmounted and destroyed. It's used to perform cleanup tasks, such as clearing timers, cancelling network requests, or removing event listeners or subscriptions created in componentDidMount or componentDidUpdate.
Q: How do lifecycle methods in class components relate to the useEffect hook in functional components?

A: The useEffect hook in functional components is designed to cover the use cases of componentDidMount, componentDidUpdate, and componentWillUnmount combined. The effect function runs after render (like componentDidMount/componentDidUpdate), and the optional cleanup function returned by useEffect runs before the component is unmounted (like componentWillUnmount) and also before the effect runs again due to dependency changes.
Q: How do you update state in a class component?

A: You update state in a class component using the this.setState() method. this.setState() merges the provided object into the component's current state and triggers a re-render.
Q: What is a key difference between updating state with this.setState (class components) and using the setter function from useState (functional components)?

A: A major difference is how updates are potentially batched. In class components, multiple this.setState calls within the same event loop cycle might be batched together by React for performance. With useState, updates from the setter function are also typically batched in event handlers, but this.setState has slightly different behaviors and guarantees regarding batching compared to useState setters outside of event handlers. Also, this.setState merges state objects, while useState setters replace the state value.
Q: When would you pass a function to a useState setter instead of a direct value?

A: You should pass a function to the setter (setX(prevX => prevX + 1)) when the new state value depends on the previous state value. This is crucial when state updates might happen asynchronously or in batches, ensuring you are working with the most up-to-date state value.
useEffect Cleanup
Q: What is the purpose of returning a function from the useEffect hook?

A: Returning a function from useEffect serves as a "cleanup" mechanism. This function is executed just before the component unmounts, or before the effect runs again due to changes in its dependencies.
Q: When does the cleanup function inside useEffect run?

A: The cleanup function runs in two scenarios:
Before the component unmounts.
Before the effect runs again (if the dependencies have changed).
Q: Give an example where the cleanup function in useEffect is necessary.

A: Cleanup is necessary for side effects that need to be stopped or reset. Examples include:
Clearing timers (clearInterval, clearTimeout).
Removing event listeners (removeEventListener).
Cancelling subscriptions.
Aborting ongoing network requests (though an AbortController is often used).
Resetting the title or other DOM manipulations.
Refs (useRef)
Q: What is the useRef hook?

A: The useRef hook returns a mutable ref object whose .current property is initialized to the argument passed to it. The returned object will persist for the full lifetime of the component.
Q: What are the common use cases for useRef?

A:
Accessing and interacting with DOM nodes (e.g., focusing an input, measuring elements).
Storing a mutable value that should persist across renders but doesn't cause a re-render when it changes (e.g., a timer ID, a previous state value, a flag).
Q: Does updating a ref created by useRef cause a component to re-render?

A: No. Updating the .current value of a ref does not trigger a re-render of the component. This is a key difference from updating state.
Memoization (useMemo, React.memo)
Q: What is React.memo?

A: React.memo is a Higher-Order Component (HOC) that you can wrap around a functional component. It memoizes the component's result and skips rendering the component if its props have not changed since the last render.
Q: Why would you use React.memo?

A: You would use React.memo to optimize performance for child components that are expensive to render and receive props that frequently change reference but might hold the same value (e.g., functions or objects defined inline in the parent). It helps prevent unnecessary re-renders of the wrapped component when its props are shallowly equal.
Q: What is the difference between useMemo and useCallback?

A: Both are memoization hooks, but they are used for different things:
useCallback memoizes functions. It returns a memoized callback function instance that doesn't change unless its dependencies change. Useful when passing callbacks to optimized child components (React.memo) or as effect dependencies.
useMemo memoizes values. It returns a memoized value that is the result of an expensive computation and only recomputes that value when one of its dependencies changes. Useful for optimizing complex calculations.
Q: What is the useMemo hook?

A: The useMemo hook returns a memoized value. It takes a function that computes a value and a dependency array. React will only recompute the value when one of the dependencies has changed.
Q: When would you use useMemo?

A: You would use useMemo to avoid expensive calculations on every render. If you have a function that performs a complex calculation based on props or state, and those props/state don't change frequently, useMemo can prevent the recalculation on every render where the inputs haven't changed.
Context API
Q: What is the Context API?

A: The Context API provides a way to pass data through the component tree without having to pass props down manually at every level (this problem is known as "prop drilling"). It's designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or locale.   
Q: What problem does the Context API solve?

A: It solves the problem of "prop drilling", where you have to pass data down through multiple layers of components via props, even if the intermediate components don't actually need the data themselves.
Q: How do you use the Context API?

A: You typically use three parts:
React.createContext: Creates a Context object.
Context.Provider: A component that wraps the part of your component tree that needs access to the context value. It accepts a value prop.
useContext hook (in functional components) or Context.Consumer (in class components): Used by components to read the current context value provided by the nearest Provider above them in the tree.
Error Handling
Q: What are Error Boundaries?

A: Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application.   
Q: How do you create an Error Boundary?

A: An Error Boundary is a class component (Error Boundaries cannot be functional components using hooks) that defines either or both of the lifecycle methods:
static getDerivedStateFromError(error): Renders a fallback UI after an error.
componentDidCatch(error, errorInfo): Logs the error information.
Q: Where do you typically place Error Boundaries in your application?

A: You place Error Boundaries around parts of your UI where you want to gracefully handle errors. You don't wrap your entire application in one boundary; instead, wrap individual sections or widgets so that if one part crashes, the rest of the application remains functional.
Other Concepts
Q: What is a React Fragment?

A: A Fragment (<React.Fragment> or the shorthand <>) is a special component that lets you group a list of children without adding an extra node to the DOM.
Q: Why would you use a Fragment?

A: JSX elements must have a single parent element. Fragments allow you to return multiple elements from a component's render or return method without creating an unnecessary wrapping div or other container element in the actual DOM. This can be useful for styling or semantic HTML reasons.
Q: What is the shorthand syntax for Fragments?

A: The shorthand syntax is empty angle brackets: <>...</>. Note that the shorthand version cannot accept the key prop, so if you need keys (e.g., when mapping a list of Fragments), you must use <React.Fragment key="...">.
Q: What are React Portals?

A: Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
Q: When would you use a Portal?

A: Portals are useful when you need to render elements like modals, dialogs, tooltips, or dropdowns that should visually appear on top of everything else or be attached to a different part of the DOM tree, even though they are logically part of a component nested deep within the tree.
Q: How do you create a Portal?

A: You use ReactDOM.createPortal(child, container), where child is the React element you want to render (usually JSX), and container is the DOM element you want to render it into (typically obtained using document.getElementById() or useRef).
Q: What is React.StrictMode?

A: React.StrictMode is a development tool (a component) that helps identify potential problems in your application. It doesn't render any visible UI but activates extra checks and warnings for its descendants during development.
Q: What are some things React.StrictMode helps warn about?

A: It helps warn about:
Using legacy lifecycle methods (in class components).
Usage of the deprecated string ref API.
Detecting unexpected side effects (by intentionally double-invoking certain functions like component render, useState setters, and useEffect callbacks in development).
Using the legacy context API.
Deprecations in the findDOMNode usage.
Q: Does React.StrictMode have any impact on the production build?

A: No, React.StrictMode only runs in development mode and has no impact on the production build or performance.
Q: What is "Prop Drilling"?

A: Prop drilling refers to the process of passing data from a parent component down through several layers of intermediate components using props, even if those intermediate components don't directly need the data. It can make code harder to read, maintain, and refactor.
Q: What is Client-Side Rendering (CSR)?

A: CSR means that the browser receives a minimal HTML file, and the majority of the work (fetching data, rendering the UI) is done by the browser using JavaScript. The React application is rendered in the user's browser.
Q: What is Server-Side Rendering (SSR)?

A: SSR means that the initial HTML for the page is generated on the server. When the browser receives the HTML, the content is already visible. React then "hydrates" the static markup on the client-side, attaching event handlers and enabling interactivity.
Q: What are some advantages of SSR compared to pure CSR?

A:
Improved SEO: Search engine crawlers can more easily index the content because it's present in the initial HTML.
Faster Time to Content: Users see content sooner because the initial HTML is rendered quickly by the server.
Better Performance on Slower Networks/Devices: The initial load is less dependent on downloading and executing large JavaScript bundles before content is visible.
Q: Briefly mention some common performance optimization techniques in React applications.

A:
Using React.memo, useMemo, useCallback to prevent unnecessary re-renders or computations.
Using key props correctly when rendering lists.
Lazy loading components or routes (React.lazy, Suspense).
Optimizing state updates (batching, using functional updates).
Virtualized lists for large lists.
Using the React Profiler to identify performance bottlenecks.
Q: What is lazy loading in the context of React?

A: Lazy loading (or code splitting) is a technique that allows you to split your application's code into smaller chunks and load them only when they are needed (e.g., when a specific route is accessed). In React, this is often done using React.lazy to load components dynamically and Suspense to show a fallback (like a loading spinner) while the component code is being fetched.
Q: Why is accessibility important in web development, especially with React?

A: Accessibility (a11y) means designing and developing websites and applications so that people with disabilities can perceive, understand, navigate, and interact with them effectively. It's important for inclusivity and often legally required. React applications, being highly dynamic, need careful attention to accessibility to ensure dynamic updates and interactive elements are usable by assistive technologies.   
Q: What are some ways to improve accessibility in a React application?

A:
Using semantic HTML elements (<button>, <nav>, <footer>, etc.).
Using ARIA (Accessible Rich Internet Applications) attributes when semantic HTML isn't sufficient (e.g., aria-label, role).
Ensuring keyboard navigation is logical (using tab index where necessary, managing focus).
Providing alternative text for images (alt prop).
Managing focus for things like modals or route changes.
Considering color contrast.
Q: What are the different types of testing you can do for a React application?

A:
Unit Testing: Testing individual functions, components, or small pieces of code in isolation.
Integration Testing: Testing how different parts of your application (e.g., multiple components interacting, a component and an API call) work together.
End-to-End (E2E) Testing: Testing the entire application flow from a user's perspective in a real browser environment.
Q: What are some popular libraries for testing React components?

A:
Jest: A JavaScript test runner often used for unit and integration tests.
React Testing Library: A library focused on testing component behavior from a user's perspective (interacting with the DOM). It's generally recommended over Enzyme currently.
Enzyme: Another library for testing React components, providing utilities for rendering and traversing component output (less recommended now compared to RTL).
Q: What is the purpose of PropTypes or using TypeScript with React?

A: Both PropTypes (a library, prop-types) and TypeScript are used for type checking props passed to components. They help catch potential bugs during development by validating that components receive props of the expected data type (string, number, object, function, etc.) and shape. TypeScript provides more comprehensive static type checking for your entire application.