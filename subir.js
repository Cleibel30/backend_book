// document.getElementById('upload-form').addEventListener('submit', function (event) {
//   let title = document.querySelector("#title").value
//   let author = document.querySelector("#author").value
//   let description = document.querySelector("#description").value
//   event.preventDefault(); // Evita el envío del formulario por defecto

//   const form = event.target;
//   const formData = new FormData(form);

//   // Agregar manualmente los valores de los inputs de texto
//   formData.append('author', author);
//   formData.append('title', title);
//   formData.append('description', description);
//   formData.append('gender', "terror");

//   fetch("http://localhost:3000/upload/files", {
//     method: 'POST',
//     body: formData,
//     headers: {
//       'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6ImEwMTE2MmQzLWQzYjYtNDEzNi04MmUyLTc4ZDI1YTgwYjQzMCIsImFkbWluX25hbWUiOiJ0aGFzbWFuaWEiLCJlbWFpbCI6InRoYXNtYW5pYUBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzM0NTc0MTY0fQ.gTdaF7N0R83WO37PJAFdhHRgNrSkSGrU7Y3K6dlGXqI'
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });


// });

document.getElementById('upload-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  const form = event.target;
  const formData = new FormData(form);

  // Agregar manualmente los valores de los inputs de texto
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let description = document.querySelector("#description").value;

  formData.append('author', author);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('gender', "terror");

  fetch("http://localhost:3000/upload/files", {
    method: 'POST',
    body: formData,
    headers: {
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6ImEwMTE2MmQzLWQzYjYtNDEzNi04MmUyLTc4ZDI1YTgwYjQzMCIsImFkbWluX25hbWUiOiJ0aGFzbWFuaWEiLCJlbWFpbCI6InRoYXNtYW5pYUBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzM0NTc0MTY0fQ.gTdaF7N0R83WO37PJAFdhHRgNrSkSGrU7Y3K6dlGXqI'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
