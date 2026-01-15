const submitBtn = document.getElementById("submitbtn");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // ✅ prevents form refresh

  // Grab form values
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  console.log("Sending request:", { type, date, time });

  // Basic validation
  if (!type || !date || !time) {
    alert("❌ Please fill out Type, Date, and Time.");
    return;
  }

  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, date, time }),
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (!res.ok) {
      alert(`❌ Error: ${data.error || "Failed to send email"}`);
      return;
    }

    alert("✅ Email sent successfully!");
  } catch (err) {
    console.error("Fetch error:", err);
    alert("❌ Network error. Could not reach the server.");
  }
});
