const submitBtn = document.getElementById("submitbtn");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const res = await fetch("/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, date, time }),
  });

  const data = await res.json();
  if (!res.ok) alert(data.error || "Failed to send");
  else alert("Email sent!");
});
