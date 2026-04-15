import { expect, test } from 'vitest'
import { fetchWeather } from '@/app/actions'

test('fetchWeather returns valid data structure for Ottapalam', async () => {
  // We execute the Server Action
  const data = await fetchWeather('Ottapalam');
  
  // We assert that the returned object has the temperature property
  expect(data).toHaveProperty('temp');
  expect(typeof data.temp).toBe('number');
  expect(data.name).toBeDefined();
});