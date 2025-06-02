async function askAI() {
  const userInput = document.getElementById("userInput").value;
  const chatlog = document.getElementById("chatlog");
  chatlog.innerHTML += "<div><strong>You:</strong> " + userInput + "</div>";

  try {
    const response = await fetch("chat.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: userInput })
    });

    const text = await response.text(); // Get raw response
    let reply = "Something went wrong!";

    try {
      const data = JSON.parse(text); // Try to parse as JSON
      reply = data.choices?.[0]?.message?.content || data.error || reply;
    } catch (jsonErr) {
      console.error("Invalid JSON from chat.php:", text);
    }

    chatlog.innerHTML += "<div><strong>Asapetron:</strong> " + reply + "</div>";
  } catch (err) {
    console.error("Fetch failed:", err);
    chatlog.innerHTML += "<div><strong>Asapetron:</strong> Network error. Try again later.</div>";
  }

  document.getElementById("userInput").value = "";
}
