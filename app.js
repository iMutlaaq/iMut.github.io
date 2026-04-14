async function evaluate() {
  const query = document.getElementById("query").value;
  const app = document.getElementById("app").value;

  document.getElementById("output").textContent = "Loading...";

  const res = await fetch("/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, appName: app })
  });

  const data = await res.json();

  if (data.error) {
    document.getElementById("output").textContent = data.error;
    return;
  }

  document.getElementById("output").textContent =
`App: ${data.app}
Type: ${data.queryType}
Score: ${data.score}%
Rating: ${data.rating}

${data.comment}`;
}
