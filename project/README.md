<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Blockchain Certificate Verification – Frontend</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      margin: 40px;
      color: #1f2937;
    }
    h1, h2, h3 {
      color: #111827;
    }
    code, pre {
      background: #f3f4f6;
      padding: 10px;
      border-radius: 6px;
      display: block;
      overflow-x: auto;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 16px 0;
    }
    table, th, td {
      border: 1px solid #d1d5db;
    }
    th, td {
      padding: 10px;
      text-align: left;
    }
    ul {
      margin-left: 20px;
    }
  </style>
</head>
<body>

  <h1>📜 Blockchain Certificate Verification – Frontend</h1>

  <p>
    A modern <strong>React-based frontend</strong> for a
    <strong>Blockchain Certificate Verification System</strong>.
    This application allows users to verify certificates by ID and enables
    authorized organizations to register new certificates through a clean,
    responsive user interface.
  </p>

  <h2>🚀 Features</h2>
  <ul>
    <li><strong>Certificate Verification:</strong> Verify certificates using a unique ID</li>
    <li><strong>Admin Certificate Upload:</strong> Register new certificates securely</li>
    <li><strong>Fast & Modern UI:</strong> Built with React, Vite, and Tailwind CSS</li>
    <li><strong>Configurable Backend:</strong> API base URL configurable via environment variables</li>
  </ul>

  <h2>🛠 Tech Stack</h2>
  <table>
    <tr>
      <th>Technology</th>
      <th>Purpose</th>
    </tr>
    <tr>
      <td>React</td>
      <td>Frontend UI framework</td>
    </tr>
    <tr>
      <td>Vite</td>
      <td>Fast development & build tool</td>
    </tr>
    <tr>
      <td>Tailwind CSS</td>
      <td>Utility-first CSS framework</td>
    </tr>
    <tr>
      <td>JavaScript (ES6+)</td>
      <td>Application logic</td>
    </tr>
    <tr>
      <td>Fetch API</td>
      <td>Backend communication</td>
    </tr>
  </table>

  <h2>📁 Project Structure</h2>
  <pre>
project/
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
└── src/
    ├── App.jsx
    ├── main.jsx
    └── index.css
  </pre>

  <h2>✅ Prerequisites</h2>
  <ul>
    <li>Node.js (v18 or later)</li>
    <li>npm (comes with Node.js)</li>
    <li>VS Code (recommended)</li>
  </ul>

  <h2>⚙️ Installation & Setup</h2>
  <pre>
cd project
npm install
  </pre>

  <h3>Backend Configuration (Optional)</h3>
  <pre>
VITE_API_BASE=http://localhost:4000
  </pre>

  <h2>▶️ Run the Application</h2>
  <pre>
npm run dev
  </pre>

  <p>
    Open <strong>http://localhost:5173</strong> in your browser.
  </p>

  <h2>🔗 Backend API Expectations</h2>

  <h3>Verify Certificate</h3>
  <pre>
GET /api/certificates/:id
  </pre>

  <h3>Register Certificate</h3>
  <pre>
POST /api/certificates
Content-Type: application/json
Authorization: Bearer &lt;token&gt;
  </pre>

  <h3>Sample Request Body</h3>
  <pre>
{
  "id": "SUST-2020-0001",
  "name": "Jane Doe",
  "organization": "SUST",
  "program": "BSc in CSE",
  "cgpa": "3.95",
  "issueDate": "2020-09-15"
}
  </pre>

  <h2>🧪 Production Build</h2>
  <pre>
npm run build
npm run preview
  </pre>

  <h2>🔐 Security Notes</h2>
  <ul>
    <li>Authentication and authorization should be enforced in the backend</li>
    <li>Certificate records are assumed to be immutable</li>
    <li>This frontend supports bearer tokens but does not manage login</li>
  </ul>

  <h2>📌 Future Enhancements</h2>
  <ul>
    <li>User authentication</li>
    <li>QR code–based verification</li>
    <li>Downloadable PDF certificates</li>
    <li>Blockchain transaction hash display</li>
  </ul>

  <h2>📄 License</h2>
  <p>
    This project is intended for <strong>academic and learning purposes</strong>.
  </p>

</body>
</html>
