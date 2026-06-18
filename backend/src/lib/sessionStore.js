const sessions = new Map();

export function createSession(token, session) {
  sessions.set(token, session);
}

export function getSession(token) {
  const session = sessions.get(token);

  if (!session) {
    return null;
  }

  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }

  return session;
}

export function deleteSession(token) {
  sessions.delete(token);
}
