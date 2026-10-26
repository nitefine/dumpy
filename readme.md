
---

# 🚀 Dumby

> Zero-config CLI REST API mocker from a single JSON file. Perfect for frontend developers to test UI designs without waiting for backend readiness.

---

## ✨ Features

* **🚀 Zero-Config**: Just provide a single JSON file and spin up a local server instantly.
* **🔄 Full RESTful Endpoints**: Automatically generates `GET`, `POST`, `PUT`, and `DELETE` endpoints for every resource in your JSON file.
* **💾 Persistence Support**: Changes made via API requests can automatically sync back to your physical JSON file.
* **🌐 CORS Enabled**: Ready to be fetched straight from frontend applications (React, Vue, Next.js, etc.) running on different ports.
* **🎨 Lightweight & CLI-Friendly**: Features a styled ASCII banner and real-time request logging.

---

## 📦 Installation

You can install `dumby` globally via npm:

```bash
npm install -g dumby

```

Or run it directly without permanent installation using `npx`:

```bash
npx dumby <json-file> [port]

```

---

## 🕹️ Usage

1. Create a JSON file (e.g., `data.json`) in your project root:
```json
{
  "todos": [
    { "id": 1, "title": "Design Dashboard UI", "completed": false },
    { "id": 2, "title": "Setup Tailwind CSS", "completed": true }
  ],
  "users": [
    { "id": 1, "name": "Alice", "role": "Frontend Dev" }
  ]
}

```


2. Run the command pointing to your JSON file (default port is `4000` if not specified):
```bash
dumby data.json 3000

```


*Or using `npx`:*
```bash
npx dumby data.json 3000

```



---

## 🔗 Generated REST API Endpoints

Based on the sample `data.json` above, the server will automatically expose these endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/api/todos` | Retrieve all todos *(supports `?_limit=N` query param)* |
| **GET** | `/api/todos/:id` | Retrieve a single todo by ID |
| **POST** | `/api/todos` | Create a new todo item *(auto-generates ID)* |
| **PUT** | `/api/todos/:id` | Update an existing todo by ID |
| **DELETE** | `/api/todos/:id` | Delete a todo by ID |

*(The same rule applies to `/api/users`, `/api/products`, or any custom key defined in your JSON file).*

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **CORS Middleware**

---

## 📄 License

[MIT](https://www.google.com/search?q=LICENSE)

---

Ada detail lain di README atau konfigurasi package yang mau kita pastikan sebelum kamu klik `npm publish`?