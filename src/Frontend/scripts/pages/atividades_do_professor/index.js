document.addEventListener("DOMContentLoaded", () => {
  let teacherId = localStorage.getItem('teacherID')

  const defaultUrl = `https://localhost:3000/teachers/${teacherId}/activities`

  fetch(defaultUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
  }).then(function (response) {
    if (response.status !== 409) {
        set_register_error('Load failed');
        return;
    }
  
    response.json().then((body) => {
       
    });
  
  }).catch(function (error) {
    alert("Ocorreu um erro");
  });
})