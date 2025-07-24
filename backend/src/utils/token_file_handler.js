import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_FILE = path.resolve(__dirname, "spotify-tokens.json");

/**
 * Save Spotify access and refresh tokens to a file.
 * @param {Object} tokens - The token object
 * @param {string} tokens.accessToken
 * @param {string} tokens.refreshToken
 * @param {number} [tokens.expiresAt] - Optional expiration timestamp (ms)
 */
export function saveTokens(tokens) {
    try {
        fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2), "utf-8");
    } catch (err) {
        console.error("Failed to save tokens:", err);
    }
}

/**
 * Load Spotify tokens from the file.
 * @returns {Object|null} The token object or null if not found or invalid
 */
export function loadTokens() {
    try {
        if (!fs.existsSync(TOKEN_FILE)) return null;

        const raw = fs.readFileSync(TOKEN_FILE, "utf-8");
        return JSON.parse(raw);
    } catch (err) {
        console.error("Failed to load tokens:", err);
        return null;
    }
}

/**
 * Delete saved tokens (optional utility).
 */
export function clearTokens() {
    try {
        if (fs.existsSync(TOKEN_FILE)) {
            fs.unlinkSync(TOKEN_FILE);
        }
    } catch (err) {
        console.error("Failed to delete tokens:", err);
    }
}
