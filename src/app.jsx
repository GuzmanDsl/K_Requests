import { useState } from "react";

export default function App() {
  const [type, setType] = useState("dish");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !date || !time) {
      setStatus("❌ Please fill out Type, Date, and Time.");
      return;
    }

    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, date, time }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(`❌ ${data.error || "Failed to send email"}`);
      } else {
        setStatus("✅ Email sent!");
        setDate("");
        setTime("");
        setType("dish");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error. Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", padding: 20 }}>
      <h1>Chore Request</h1>

      <form onSubmit={handleSubmit}>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="dish">Dishes</option>
          <option value="trash">Trash</option>
          <option value="laundry">Laundry</option>
          <option value="cleaning">Cleaning</option>
        </select>

        <br /><br />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br /><br />

        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>

      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}
