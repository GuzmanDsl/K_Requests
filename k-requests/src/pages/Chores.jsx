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

    // ✅ Basic validation
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

      // ✅ SAFEST way: read as text first (because Vercel errors might return HTML)
      const raw = await res.text();
      let data;

      // ✅ Try to parse JSON, otherwise fallback to raw text
      try {
        data = JSON.parse(raw);
      } catch {
        data = { error: raw };
      }

      if (!res.ok) {
        setStatus(`❌ ${data.error || "Server error"}`);
        return;
      }

      setStatus("✅ Request sent successfully!");

      // ✅ Clear form after success
      setSugar("");
      setType("dish");
      setDate("");
      setTime("");
      setNotes("");
    } catch (err) {
      console.error("Network error:", err);
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

        {/* Sugar */}
        <div className="field">
          <label htmlFor="sugar">Enter Sugar</label>
          <input
            id="sugar"
            type="text"
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
            placeholder="Example: please please 😭"
          />
        </div>

        {/* Type */}
        <div className="field">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="dish">Wash Dishes</option>
            <option value="trash">Take out trash</option>
            <option value="cook">Cook for me</option>
          </select>
        </div>

        {/* Date + Time */}
        <div className="twoCol">
          <div className="field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="field">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything important to mention?"
            rows={4}
          />
        </div>

        {/* Submit */}
        <button className="submitBtn" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>

        {/* Status */}
        {status && <p className="status">{status}</p>}
      </form>
    </main>
  );
}
