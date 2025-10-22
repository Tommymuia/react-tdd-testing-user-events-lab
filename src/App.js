import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const allInterests = ["Web Development", "Design", "Data Science", "AI/ML"];

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>My Portfolio</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} aria-label="newsletter-form">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <fieldset>
            <legend>Select your interests:</legend>
            {allInterests.map((interest) => (
              <div key={interest}>
                <label>
                  <input
                    type="checkbox"
                    value={interest}
                    checked={interests.includes(interest)}
                    onChange={handleCheckboxChange}
                  />
                  {interest}
                </label>
              </div>
            ))}
          </fieldset>

          <button type="submit">Sign Up</button>
        </form>
      ) : (
        // ✅ The confirmation message block with role="alert"
        <div role="alert">
          <h2>Thanks for signing up, {name}!</h2>
          <p>We've added {email} to our mailing list.</p>
          {interests.length > 0 && (
            <p>Your interests: {interests.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
