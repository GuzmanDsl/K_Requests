import { useState } from "react";
import "../styles/chores.css";

export default function Chores() {
  const [sugar, setSugar] = useState("");
  const [type, setType] = useState("dish");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!sugar || !type || !date || !time) {
      setStatus("❌ Please fill out Sugar, Type, Date, and Time.");
      return;
    }

    setLoading(true);
    setStatus("Sending request...");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sugar, type, date, time, notes }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(`❌ ${data.error || "Failed to send email"}`);
      } else {
        setStatus("✅ Request sent successfully!");
        setSugar("");
        setType("dish");
        setDate("");
        setTime("");
        setNotes("");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error. Could not reach server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="choresMain">
      <form className="choresCard" onSubmit={handleSubmit}>
        <h2 className="choresTitle">Chores Request</h2>
        <p className="choresSub">
          Fill this out and it will send an email request.
        </p>

        <div className="field">
          <label>Enter Sugar</label>
          <input
            type="text"
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
            placeholder="Example: please please 😭"
          />
        </div>

        <div className="field">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="dish">Wash Dishes</option>
            <option value="trash">Take out trash</option>
            <option value="cook">Cook for me</option>
          </select>
        </div>

        <div className="twoCol">
          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything important to mention?"
            rows={4}
          />
        </div>

        <button className="submitBtn" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>

        {status && <p className="status">{status}</p>}
      </form>
    </main>
  );
}
