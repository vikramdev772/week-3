import React, { useState } from "react";

function Signup() {
  const [n, setN] = useState("");
  const [e, setE] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");

  async function submitHandler() {
    console.log("🔵 Submit clicked");

    let objData = {
      name: n,
      email: e,
      password: p,
    };

    console.log("📤 Sending data:", objData);

    try {
      let res = await fetch("http://localhost:4040/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
      });

      console.log("📥 Response status:", res.status);

      let dataText = await res.text();
      console.log("📥 Response body:", dataText);

      if (res.ok) {
        console.log("✅ Signup successful");

        setMsg("Signup successful ✅");

        // Reset fields
        setN("");
        setE("");
        setP("");

        console.log("🔁 Input fields reset");
      } else {
        console.log("❌ Signup failed");

        setMsg("Signup failed ❌");
      }
    } catch (err) {
      console.error("🔥 Error occurred:", err);
      setMsg("Server error ❌");
    }
  }

  return (
    <div>
      <h3>Create Account</h3>

      <input
        type="text"
        placeholder="name"
        value={n}
        onChange={(e) => {
          console.log("✏️ Name:", e.target.value);
          setN(e.target.value);
        }}
      />
      <br />

      <input
        type="email"
        placeholder="email"
        value={e}
        onChange={(e) => {
          console.log("✏️ Email:", e.target.value);
          setE(e.target.value);
        }}
      />
      <br />

      <input
        type="password"
        placeholder="password"
        value={p}
        onChange={(e) => {
          console.log("✏️ Password:", e.target.value);
          setP(e.target.value);
        }}
      />
      <br /><br />

      <button onClick={submitHandler}>Submit</button>

      <br /><br />
      {msg && <div>{msg}</div>}
    </div>
  );
}

export default Signup;
