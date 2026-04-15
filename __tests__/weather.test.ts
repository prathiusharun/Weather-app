import { addCity } from "../app/actions"; // Change this
import { test, expect } from "vitest";

test('addCity returns success for Ottapalam', async () => {
  // Create a mock FormData object
  const formData = new FormData();
  formData.append("city", "Ottapalam");

  const result = await addCity(formData);
  
  // Assert based on our return { success: true } logic
  expect(result.success).toBe(true);
});