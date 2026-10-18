import crypto from "node:crypto";

export const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret() {
  return process.env.ADMIN_PASSWORD || "";
}

export function isConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(password) {
  const secret = getSecret();
  if (!secret) return false;
  return password === secret;
}

export function createSessionToken() {
  const secret = getSecret();
  if (!secret) return null;
  const expires = String(Date.now() + SESSION_DURATION_MS);
  const sig = crypto.createHmac("sha256", secret).update(expires).digest("hex");
  return `${expires}.${sig}`;
}

export function verifySessionToken(token) {
  const secret = getSecret();
  if (!secret || !token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig) return false;

  const expected = crypto.createHmac("sha256", secret).update(expires).digest("hex");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;

  return Date.now() <= Number(expires);
}
