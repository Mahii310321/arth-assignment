const blacklistedTokens = new Map();

export function blacklistToken(token, expiresAt) {
  blacklistedTokens.set(token, expiresAt);
}

export function isTokenBlacklisted(token) {
  const expiresAt = blacklistedTokens.get(token);

  if (!expiresAt) {
    return false;
  }

  if (expiresAt <= Date.now()) {
    blacklistedTokens.delete(token);
    return false;
  }

  return true;
}
