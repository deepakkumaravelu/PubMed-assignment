# 🔍 Pmcsearch React Component

A React component to search articles from **PubMed Central (PMC)** using the **NCBI E-Utilities API**. The component provides real-time suggestions in a dropdown as the user types. Each result displays the article title and links directly to the PMC article page.

---

## ✅ Features

- 🔍 Live search while typing
- ⏳ Loading spinner during API calls
- 📄 Dropdown with article titles (auto wraps long titles)
- 🖱️ Click outside to close dropdown
- 🧭 Redirects to the article page on click

---

## 🧪 Tech Stack

- React (Functional components with hooks)
- React Bootstrap (`Form`, `Dropdown`, `Spinner`)
- Fetch API (Native)

---

## 📦 Component API

### Props

> None — the component is self-contained and fully functional without props.

---

## 📊 State Variables

| State          | Type      | Description                                             |
| -------------- | --------- | ------------------------------------------------------- |
| `query`        | `string`  | The user input for searching articles                   |
| `results`      | `array`   | Array of article objects with `pmcid` and `title`       |
| `showDropdown` | `boolean` | Controls visibility of the dropdown                     |
| `loading`      | `boolean` | Shows a loading spinner while API calls are in progress |

---

## 🚦 Component Workflow

1. User types in the input field.
2. `handleInputChange()` is triggered.
3. Calls `esearch.fcgi` to fetch article IDs based on query.
4. Calls `esummary.fcgi` to fetch article summaries using the IDs.
5. Updates the state with results and displays dropdown.
6. Clicking an item opens the article in a new tab.
7. Clicking outside the component closes the dropdown.

---

## 🔗 External APIs Used

### 1. Search for Article IDs

GET https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=<query>&retmax=5&retmode=json

### 2. Fetch Article Summaries

GET https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=<comma-separated-ids>&retmode=json

### 3. PMC Article URL Format

https://www.ncbi.nlm.nih.gov/pmc/articles/PMC<pmcid>/

---

## 💅 Styling & UI

- Uses `Dropdown.Menu` from React Bootstrap.
- Each item wraps long titles with:

  ```css
  whiteSpace: 'normal'
  wordBreak: 'break-word'

  ```

- Dropdown width matches the input field.

### 🧠 useEffect Hook

- Sets up a mousedown listener:

- Closes dropdown when user clicks outside.

- Uses useRef to determine if the click is within the component.

## 📦 Installation & Running the App

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/pmc-search-app.git
   cd pmc-search-app
2. **Install dependencies**:
    npm install
3. **Run the app**:
    npm start


## 📁 File Structure

- src/
- └── Pmcsearch.js
