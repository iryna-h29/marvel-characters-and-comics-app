🦸‍♂️ Marvel Information Portal
A high-performance React application that leverages the Marvel API to provide users with an interactive database of superheroes and available comics to buy. Built with a focus on clean architecture, predictable state management, and smooth UX.

🚀 Key Technical Highlights
🧠 Pattern Implementation: State-Driven Rendering
In this project, I used a Finite State Machine approach to handle component rendering. Instead of polluting the JSX with multiple ternary operators, I extracted the logic into a dedicated helper function:

The setContent Logic:
The UI logic is centralized in a switch statement that reacts to the current state of the data-fetching process:

waiting: Shows a Skeleton screen (perfect for initial load).

loading: Displays a Spinner while fetching data.

confirmed: Renders the actual Component only when data is fully ready.

error: Triggers an ErrorMessage if something goes wrong.

⚡ Advanced React Patterns
Custom Hooks: Built a reusable useHttp hook to decouple API logic from UI components, following the DRY (Don't Repeat Yourself) principle.

Optimization: Utilized React.memo and optimized asset handling to ensure smooth performance during list scrolling and character switching.

Skeleton Screens: Implemented skeleton loading states to improve perceived performance and keep the user engaged while fetching data.

🛠️ Tech Stack
Core: React.js (Hooks)

State Management: Component-level state with FSM logic

API: Marvel Comics API Integration

Styling: SCSS / BEM Methodology

Error Handling: React Error Boundaries for application stability

📖 Features
Random Character: Get a featured hero with one click.

Live Search/Filter: Find your favorite characters dynamically.

Dynamic Pagination: "Load More" functionality for browsing the extensive Marvel catalog.

Interactive Wiki: Quick access to detailed character homepages and official wikis.


