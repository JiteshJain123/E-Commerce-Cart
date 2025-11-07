// frontend/src/utils/auth.js
export function saveAuth(user, token) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

export function clearAuth() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export function getUser() {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}
