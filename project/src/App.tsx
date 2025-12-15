import React, { useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";
import './index.css'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiBaseInput, setApiBaseInput] = useState(
    import.meta.env.VITE_API_BASE || "http://localhost:4000"
  );
  const API_BASE = useMemo(() => apiBaseInput.replace(/\/$/, ""), [apiBaseInput]);

  const [certId, setCertId] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [certificate, setCertificate] = useState(null);

  const [adminTab, setAdminTab] = useState("verify");
  const [payload, setPayload] = useState({
    id: "",
    name: "",
    organization: "",
    program: "",
    cgpa: "",
    issueDate: "",
  });
  const [authToken, setAuthToken] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const handleButtonClick = (e) => {
    e.currentTarget.classList.add("btn-press");
    setTimeout(() => e.currentTarget.classList.remove("btn-press"), 300);
  };

  async function handleVerify(e) {
    e?.preventDefault();
    setVerifying(true);
    setVerifyError("");
    setCertificate(null);
    try {
      if (!certId.trim()) throw new Error("Please enter a certificate ID.");

      const res = await fetch(`${API_BASE}/api/certificates/${encodeURIComponent(certId.trim())}`, {
        headers: { "Accept": "application/json" },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with ${res.status}`);
      }
      const data = await res.json();
      setCertificate(data);
    } catch (err) {
      setVerifyError(err.message || String(err));
    } finally {
      setVerifying(false);
    }
  }

  async function handleUpload(e) {
    e?.preventDefault();
    setUploading(true);
    setUploadMsg("");
    try {
      const body = {
        id: payload.id?.trim(),
        name: payload.name?.trim(),
        organization: payload.organization?.trim(),
        program: payload.program?.trim(),
        cgpa: payload.cgpa?.trim(),
        issueDate: payload.issueDate?.trim(),
      };
      if (!body.id || !body.name) {
        throw new Error("'id' and 'name' are required.");
      }

      const headers = { "Content-Type": "application/json", Accept: "application/json" };
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch(`${API_BASE}/api/certificates`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || `Upload failed with ${res.status}`);
      setUploadMsg(text || "Upload successful.");
      setPayload({ id: "", name: "", organization: "", program: "", cgpa: "", issueDate: "" });
    } catch (err) {
      setUploadMsg(err.message || String(err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <header className={`mx-auto max-w-5xl px-4 pt-6 pb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-b-2xl shadow-sm`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Blockchain Certificate Verification</h1>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Verify academic or employment certificates backed by a blockchain network. Configure your API base URL, then use the
              Verify tab to look up a certificate by ID. The Admin tab allows authorized staff to register new certificates.
            </p>
          </div>
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              handleButtonClick(event);
            }}
            className={`transition-all duration-300 p-2 rounded-lg flex items-center gap-2 font-medium ${
              isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="text-sm">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">
        <section className={`mb-6 rounded-2xl border p-4 shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-semibold">Backend Configuration</h2>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Current API base: <span className="font-mono">{API_BASE}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className={`w-72 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-slate-500'
                    : 'border-slate-300 text-slate-900 focus:ring-slate-400'
                }`}
                placeholder="http://localhost:4000"
                value={apiBaseInput}
                onChange={(e) => setApiBaseInput(e.target.value)}
              />
              <button
                onClick={(e) => {
                  setApiBaseInput(apiBaseInput.trim());
                  handleButtonClick(e);
                }}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </section>

        <section className={`rounded-2xl border p-4 shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <div className="mb-4 flex gap-2 flex-wrap">
            <button
              onClick={(e) => {
                setAdminTab("verify");
                handleButtonClick(e);
              }}
              className={`rounded-xl px-6 py-2 text-sm font-medium transition-all duration-300 ${
                adminTab === "verify"
                  ? isDarkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                  : isDarkMode
                  ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Verify
            </button>
            <button
              onClick={(e) => {
                setAdminTab("admin");
                handleButtonClick(e);
              }}
              className={`rounded-xl px-6 py-2 text-sm font-medium transition-all duration-300 ${
                adminTab === "admin"
                  ? isDarkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                  : isDarkMode
                  ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              Admin
            </button>
          </div>

          {adminTab === "verify" ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <form onSubmit={handleVerify} className={`rounded-xl border p-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50'}`}>
                <h3 className="mb-3 text-base font-semibold">Verify a Certificate</h3>
                <label className="mb-1 block text-sm">Certificate ID</label>
                <input
                  className={`mb-3 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-slate-600 border-slate-500 text-slate-100 focus:ring-blue-500'
                      : 'border-slate-300 text-slate-900 focus:ring-slate-400'
                  }`}
                  placeholder="e.g., SUST-2020-0001"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={verifying}
                  onClick={handleButtonClick}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-green-600 hover:bg-green-500 text-white disabled:opacity-60'
                      : 'bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-60'
                  }`}
                >
                  {verifying ? "Verifying…" : "Verify"}
                </button>
                {verifyError && (
                  <p className={`mt-3 rounded-lg px-3 py-2 text-sm ${isDarkMode ? 'bg-red-900 text-red-200' : 'bg-rose-50 text-rose-700'}`}>{verifyError}</p>
                )}
              </form>

              <div className={`rounded-xl border p-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50'}`}>
                <h3 className="mb-3 text-base font-semibold">Result</h3>
                {!certificate && (
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>No result yet. Submit an ID to view certificate details.</p>
                )}
                {certificate && <CertificateCard data={certificate} isDarkMode={isDarkMode} />}
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpload} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className={`rounded-xl border p-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50'}`}>
                <h3 className="mb-3 text-base font-semibold">Register / Upload Certificate</h3>
                <Field label="ID" value={payload.id} onChange={(v) => setPayload({ ...payload, id: v })} isDarkMode={isDarkMode} />
                <Field label="Name" value={payload.name} onChange={(v) => setPayload({ ...payload, name: v })} isDarkMode={isDarkMode} />
                <Field label="Organization" value={payload.organization} onChange={(v) => setPayload({ ...payload, organization: v })} isDarkMode={isDarkMode} />
                <Field label="Program" value={payload.program} onChange={(v) => setPayload({ ...payload, program: v })} isDarkMode={isDarkMode} />
                <Field label="CGPA" value={payload.cgpa} onChange={(v) => setPayload({ ...payload, cgpa: v })} isDarkMode={isDarkMode} />
                <Field label="Issue Date" placeholder="YYYY-MM-DD" value={payload.issueDate} onChange={(v) => setPayload({ ...payload, issueDate: v })} isDarkMode={isDarkMode} />
              </div>

              <div className={`flex flex-col gap-3 rounded-xl border p-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50'}`}>
                <h3 className="text-base font-semibold">Authorization</h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>If your backend requires authentication, paste a bearer token:</p>
                <input
                  className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-slate-600 border-slate-500 text-slate-100 focus:ring-blue-500'
                      : 'border-slate-300 text-slate-900 focus:ring-slate-400'
                  }`}
                  placeholder="Bearer token (optional)"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />

                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  <button
                    type="submit"
                    disabled={uploading}
                    onClick={handleButtonClick}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-60'
                        : 'bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-60'
                    }`}
                  >
                    {uploading ? "Uploading…" : "Upload"}
                  </button>
                  {uploadMsg && (
                    <span className={`text-sm ${uploadMsg.toLowerCase().includes("fail") || uploadMsg.toLowerCase().includes("error") ? (isDarkMode ? 'text-red-400' : 'text-rose-700') : (isDarkMode ? 'text-green-400' : 'text-emerald-700')}`}>
                      {uploadMsg}
                    </span>
                  )}
                </div>

                <div className={`mt-4 rounded-lg p-3 text-xs transition-colors duration-300 ${isDarkMode ? 'bg-slate-600 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                  <p className="font-semibold">JSON payload example</p>
                  <pre className="mt-2 whitespace-pre-wrap break-all">
{`{
  "id": "SUST-2020-0001",
  "name": "Jane Doe",
  "organization": "SUST",
  "program": "BSc in CSE",
  "cgpa": "3.95",
  "issueDate": "2020-09-15"
}`}
                  </pre>
                </div>
              </div>
            </form>
          )}
        </section>

        <section className={`mt-6 rounded-2xl border p-4 shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <h3 className="mb-2 text-base font-semibold">API Contract Assumptions</h3>
          <ul className={`list-disc pl-6 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            <li><span className="font-medium">GET</span> <span className="font-mono">/api/certificates/:id</span> → returns certificate JSON.</li>
            <li><span className="font-medium">POST</span> <span className="font-mono">/api/certificates</span> with JSON body → registers a certificate. Returns a message or the created resource.</li>
            <li>If your backend uses different paths or field names, adjust the fetch URLs and payload mappings in this file.</li>
          </ul>
        </section>

        <footer className={`mx-auto mt-10 max-w-5xl text-center text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
          <p>Frontend demo. Replace endpoints and add authentication/role checks to match your backend and network policies.</p>
        </footer>
      </main>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, isDarkMode }) {
  return (
    <label className="mb-3 block">
      <div className="mb-1 text-sm">{label}</div>
      <input
        className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-slate-600 border-slate-500 text-slate-100 focus:ring-blue-500'
            : 'border-slate-300 text-slate-900 focus:ring-slate-400'
        }`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function CertificateCard({ data, isDarkMode }) {
  const id = data.id || data.certificateId || data.key || data.certId || "—";
  const name = data.name || data.studentName || data.holder || "—";
  const org = data.organization || data.org || data.issuer || "—";
  const program = data.program || data.degree || data.title || "—";
  const cgpa = data.cgpa ?? data.gpa ?? data.score ?? "—";
  const issued = data.issueDate || data.issuedAt || data.date || "—";

  return (
    <div className={`rounded-xl border p-4 shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-slate-600 border-slate-500' : 'bg-white'}`}>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-lg font-semibold">Certificate</h4>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${isDarkMode ? 'bg-green-900 text-green-200' : 'bg-emerald-50 text-emerald-700'}`}>Verified</span>
      </div>
      <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <KV k="Certificate ID" v={id} isDarkMode={isDarkMode} />
        <KV k="Name" v={name} isDarkMode={isDarkMode} />
        <KV k="Organization" v={org} isDarkMode={isDarkMode} />
        <KV k="Program" v={program} isDarkMode={isDarkMode} />
        <KV k="CGPA / Score" v={String(cgpa)} isDarkMode={isDarkMode} />
        <KV k="Issued" v={issued} isDarkMode={isDarkMode} />
      </dl>
    </div>
  );
}

function KV({ k, v, isDarkMode }) {
  return (
    <div className={`rounded-lg border p-3 transition-colors duration-300 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-slate-50 border-slate-200'}`}>
      <div className={`text-[11px] uppercase tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{k}</div>
      <div className={`truncate font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{v}</div>
    </div>
  );
}
