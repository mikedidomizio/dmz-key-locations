/**
 * (running the following as a jsdom test environment will fail on OSX)
 * @jest-environment node
 */
import {recognize} from "../recognize.js";

test('should parse an image with keys that have shifting text', async() => {
    const results = await recognize('./src/scripts/ocr/__tests__/mawizeh-resort-bungalow-room_mid-text-shift.png', () => {})
    expect(results).toContain('Mawizeh Resort Bungalow Room')
})

test('should not return DMZ keys that the image does not contain', async() => {
    const results = await recognize('./src/scripts/ocr/__tests__/mawizeh-resort-bungalow-room_mid-text-shift.png', () => {})
    expect(results).not.toContain('Police Academy Server Admin')
})
