const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".input");
const elFormPassword = document.querySelector(".password");

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const InputEmail = elFormInput.value.trim();
    const InputPassword = elFormPassword.value.trim();

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: InputEmail,
            password: InputPassword,
        }),
    }).then((res) => res.json()).then((data) => {
        if (data?.token) {
            window.localStorage.setItem('token', data.token)
            window.location.replace('exam.html')
        }
    })
})