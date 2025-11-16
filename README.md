
<h1> 🚨 ComplaintManagment : QueryManagement 360  with SMART SORTING ALGORITHM</h1>
<img width="1437" height="815" alt="Screenshot 2025-11-16 at 3 04 03 PM" src="https://github.com/user-attachments/assets/70acc6b9-c5e3-4b18-ac57-f8f085d6be8e" />
<h3>Sort According to ORIGIN, , PRIORITY, DATE, TIME</h3>

<img width="262" height="243" alt="Screenshot 2025-11-16 at 3 09 31 PM" src="https://github.com/user-attachments/assets/63926bd9-a35a-41c9-add6-acf6607904a0" />


<img width="1232" height="646" alt="Screenshot 2025-11-16 at 3 09 39 PM" src="https://github.com/user-attachments/assets/3885e5fa-4c47-42d3-9ba6-3efa0e2c7bf3" />


<h3>Advanced Search </h3>
<img width="413" height="92" alt="Screenshot 2025-11-16 at 3 08 02 PM" src="https://github.com/user-attachments/assets/a0a5f3be-e1dc-48cf-b597-f9a4e0972cbf" />

<h4>GENERATE ANALYTICS</h4>
<img width="501" height="426" alt="Screenshot 2025-11-16 at 3 08 18 PM" src="https://github.com/user-attachments/assets/bbd141a0-0208-4311-97f5-cbe0c6d84f33" />


<h3>ALSO GET THE UPDATE HISTORY</h3>
<img width="353" height="268" alt="Screenshot 2025-11-16 at 7 54 18 PM" src="https://github.com/user-attachments/assets/b968d3d3-a63a-4062-a767-70c3619e73a2" />


📈 Future Enhancements

Multi-agent team routing

WhatsApp & Instagram live integrations

Sentiment-powered SLA timers

AI summarization of long chats


A simple complaint / ticket management project with a Node/Express backend and a Vite + React frontend. 💡

This repository contains two main parts:
- `backend/` — Node.js + Express API (likely using MongoDB)
- `client1/` — React app built with Vite

## ✨ Key features
- ✅ Create, update, and track complaints/tickets
- 🏷️ Automatic tagging and priority helpers in `backend/utils`
- ✅Smart AI based reply
- 🧭 Ticket card UI with status, assignee, origin and history

## Repository structure

```
backend/
  app.js
  package.json
  controllers/
  db/
  models/
  routes/
  utils/
client1/
  package.json
  src/
    components/
    pages/
```

## Prerequisites
- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB (if using a local DB) or a MongoDB URI (Atlas)
- macOS (instructions use zsh, adjust for other shells)

## Environment variables
Create a `.env` file in the `backend/` folder (or set your environment) with at least:

```
PORT=8000
MONGO_URI=<your-mongo-connection-string>
NODE_ENV=development
# any other env vars your backend expects (JWT secret, etc.)
```

The frontend may also rely on environment variables for API base URLs; by default the frontend will use the backend URL from runtime:
- development: `http://localhost:8000/api/v1/query`
- production: `https://complaintmanagment.onrender.com/api/v1/query`

(See `client1/src/components/TicketCard.jsx` for the base URL logic.)

## 🎨 Styling & font examples

You can use standard Markdown emphasis and code formatting to change how text looks in the `README`:

- Bold: **Important**
- Italic: *Emphasis*
- Monospace / code font: `const example = true`

If you want to suggest a different font-family for browsers or local renderers, you can include an HTML span with a style attribute, but note that many Markdown renderers (including GitHub) sanitize inline styles and may ignore them. Example (may not be applied on all platforms):

<span style="font-family: 'Courier New', Courier, monospace;">This should appear in a monospace font where supported.</span>

For reliably different fonts, prefer using code formatting or include a small image showing the font style in the repo.

## Getting started — Backend

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server in development (adjust if `package.json` uses different scripts):

```bash
# If there's a dev script (e.g. nodemon)
npm run dev
# or as a fallback
node app.js
```

4. Confirm the server is running (by default on `http://localhost:8000` unless configured otherwise).

## Getting started — Frontend (client1)

1. Open a new terminal and go to the frontend folder:

```bash
cd client1
```

2. Install dependencies:

```bash
npm install
```

3. Start the Vite dev server:

```bash
npm run dev
```

4. Open the URL printed by Vite (usually `http://localhost:5173`). The frontend will call the backend API for tickets.

## API (summary)

The backend exposes endpoints under `/api/v1/` (example visible in frontend code):

- GET `/api/v1/query` — list queries/tickets
- POST `/api/v1/query` — create a new ticket
- PATCH `/api/v1/query/:id` — update a ticket (used by the UI to change status or assignee)
- (Other endpoints may exist — check `backend/routes` and `backend/controllers` for full details.)

Example of a PATCH payload used by the UI:

```json
{ "status": "in-progress" }
{ "assignedTo": "Support Team" }
```

## Useful frontend notes
- `client1/src/components/TicketCard.jsx` contains the UI for updating a single ticket.
- `client1/src/pages/AddFake.jsx` suggests there is a page to seed or add fake tickets for testing.

## Development notes
- The backend appears to contain helper utilities like `autoPriority.js` and `autoTag.js` for auto-classifying tickets.
- The DB connector likely lives in `backend/db/connect.js` and models in `backend/models` (e.g., `Query.js`, `User.js`).

## Quick smoke test
- Start backend and frontend.
- Open the frontend and create a ticket (or use any existing test data).
- Use the Ticket UI to change status or assignee; inspect backend logs to confirm `PATCH` requests succeed.

## Next steps / suggestions
- Add a `docker-compose` for local development (backend + mongo + frontend)
- Add unit/integration tests for API controllers
- Add a CONTRIBUTING.md and code style linting (ESLint is present in `client1`)

## Contributing
Contributions are welcome. Please open issues or PRs with a clear description of the change and how to test it.

## License
Add your preferred license here (e.g., MIT).

---

Files changed/created in this operation:
- `README.md` — project overview, setup, and API notes

If you want, I can:
- Expand the API reference by reading `backend/routes` and `backend/controllers` to list all endpoints and request/response shapes.
- Add a Docker Compose example.
- Create a separate `README` inside `backend/` and `client1/` with component-level instructions.

Tell me which of those (if any) you'd like next.
