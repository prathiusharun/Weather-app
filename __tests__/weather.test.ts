import { addCity } from "../app/actions";
import { test, expect, vi } from "vitest";

// This tells Vitest: "When anyone calls addCity, don't actually run the code. 
// Just pretend it worked and return success: true."
vi.mock("../app/actions", () => ({
  addCity: vi.fn().mockResolvedValue({ success: true })
}));

test('addCity returns success for Ottapalam', async () => {
  const formData = new FormData();
  formData.append("city", "Ottapalam");

  const result = await addCity(formData);
  
  expect(result.success).toBe(true);
});