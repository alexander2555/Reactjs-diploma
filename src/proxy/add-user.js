export const addUser = (login, password) =>
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      login,
      password,
      registeredAt: new Date().toISOString().substring(0, 16).replace('T', ' '),
      role_id: 2,
    }),
  })
