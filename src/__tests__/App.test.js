import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // ✅ ensures toBeInTheDocument() works
import App from "../App";

describe("Newsletter Signup Form", () => {
  test("renders form elements initially", () => {
    render(<App />);
    expect(screen.getByText("My Portfolio")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  test("allows user to type into inputs", () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: "Alice" } });
    fireEvent.change(emailInput, { target: { value: "alice@example.com" } });

    expect(nameInput.value).toBe("Alice");
    expect(emailInput.value).toBe("alice@example.com");
  });

  test("checkboxes toggle user interests", () => {
    render(<App />);
    const interestCheckbox = screen.getByLabelText(/web development/i);

    fireEvent.click(interestCheckbox);
    expect(interestCheckbox.checked).toBe(true);

    fireEvent.click(interestCheckbox);
    expect(interestCheckbox.checked).toBe(false);
  });

  test("shows confirmation message after form submission", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Bob" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "bob@example.com" } });
    fireEvent.click(screen.getByLabelText(/web development/i));
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/thanks for signing up, bob/i)).toBeInTheDocument();
    expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/web development/i)).toBeInTheDocument();
  });
});
