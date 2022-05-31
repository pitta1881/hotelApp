const verifyToken = (token) => {
  fetch(`${location.origin}/api/auth/verify-token`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  })
    .then((response) => response.json())
    .then((dataJson) => {
      if (dataJson.status !== 'SUCCESS') redirectLogin();
    })
    .catch(() => {
      redirectLogin();
    });
};

const redirectLogin = () => {
  sessionStorage.clear();
  location.href = `${location.origin}/backend/login`;
};

(() => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    redirectLogin();
  } else {
    verifyToken(token);
  }
})();
