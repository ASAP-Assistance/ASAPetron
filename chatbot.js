async function askAI() {
  const userInput = document.getElementById("userInput").value;
  const chatlog = document.getElementById("chatlog");
  chatlog.innerHTML += "<div><strong>You:</strong> " + userInput + "</div>";

  const response = await fetch("chat.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: userInput })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Something went wrong!";
  chatlog.innerHTML += "<div><strong>Asapetron:</strong> " + reply + "</div>";
  document.getElementById("userInput").value = "";
}
