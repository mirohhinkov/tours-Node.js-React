/* eslint-disable */

const callApiLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://127.0.0.1/:3000/api/v1/users/signin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
      type: 'POST',
      dataType: 'json',
      data: {
        email,
        password,
      },

      success: (result) => {
        resolve(result);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

const login = async (email, password) => {
  const res = await callApiLogin(email, password).catch((err) =>
    console.log(err)
  );
  if (res) console.log(res);
};

// const login = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/api/v1/users/login',
//       data: {
//         email,
//         password,
//       },
//       headers: { 'Content-Security-Policy': 'connect-src "self" http: https:' },
//     });
//     console.log(res);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

$('.form').submit(async (event) => {
  event.preventDefault();
  const email = $('#email').val();
  const password = $('#password').val();
  login(email, password);
});
