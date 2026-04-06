const login = document.querySelector('#login');
const Sign = document.querySelector('#Sign_up');
const inputs = document.querySelectorAll('input');
const btn = document.querySelector('button');
const btn_enviar = document.querySelector('#enviar');
const senha = document.querySelector('#senha');
const icone2 = document.querySelector('.icone2');
const bnt_cadastro = document.querySelector('#btn_cadastro');
const Api = "http://192.168.1.5:3000"


// inputs[2].style.display = 'none';
// icone2.style.display = 'none';
senha.style.display = 'none';
Sign.addEventListener('click', () => {
    // inputs[2].style.display = 'block';
    // senha.style.display = 'flex';
    senha.style.display = 'block';
    login.style.color = '#d9d9d9';
    Sign.style.color = '#3c8670';
    Sign.style.borderBottom = '2px solid #3c8670';
    login.style.borderBottom = 'none';
    btn_enviar.style.display = 'none';
    bnt_cadastro.style.display = 'block';

});

login.addEventListener('click', () => {
    // inputs[2].style.display = 'none';
    senha.style.display = 'none';
    btn.id = 'Entrar';
    btn.innerHTML = 'Entrar'
    login.style.color = '#3c8670';
    Sign.style.color = '#d9d9d9';
    Sign.style.borderBottom = 'none';
    login.style.borderBottom = '2px solid #3c8670';
    btn_enviar.style.display = 'block';
    bnt_cadastro.style.display = 'none';

});

btn_enviar.addEventListener('click', async () => {
    const email_usuario = inputs[0].value;
    const senha_usuario = inputs[1].value;

    if (email_usuario === '' || senha_usuario === '') {
        alert('Preencha todos os campos');
        return;
    }

    if (senha_usuario.length < 8) {
        alert('A senha_usuario deve conter no mínimo 8 caracteres');
        return;
    }
    const resposta = await fetch(`${Api}/loginUsuario`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            email_usuario,
            senha_usuario,
        })
    })
    const usuario = await resposta.json();

    if (resposta.status == 200) {
        if (usuario.nivel == '3') {
            localStorage.setItem("email", usuario.email_usuario);
            localStorage.setItem("id", usuario.id_usuario);
            window.location.href = "../adm/adm.html";
            return;
        }

        localStorage.setItem("email", usuario.email_usuario);
        localStorage.setItem("id", usuario.id_usuario);

        window.location.href = "../homePage/index.html";

    } else {
        alert("Usuario ou senha incorretos");
    }

    if (!email_usuario.includes('@') || !email_usuario.includes('.com')) {
        alert('Digite um email válido');
        return;
    }
    console.log(usuario)
})

bnt_cadastro.addEventListener('click', async () => {
    const email_usuario = inputs[0].value;
    const senha_usuario = inputs[1].value;
    const confirmar = inputs[2].value;
    if (email_usuario === '' || senha_usuario === '' || confirmar === '') {
        alert('Preencha todos os campos');
        return;
    }

    if (senha_usuario.length < 8 ) {
        alert('A senha deve conter no mínimo 8 caracteres');
        return;
    }

    if (!email_usuario.includes('@') || !email_usuario.includes('.com')) {
        alert('Digite um email válido');
        return;
    }

    if (senha_usuario !== confirmar) {
        alert('As senhas não coincidem');
        return;
    }
    const resposta = await fetch(`${Api}/cadastroUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
            email_usuario,
            senha_usuario,
        })
    });
    if (resposta.status == 200) {
        alert('Cadastro realizado com sucesso');
        window.location.reload();
    } else if (resposta.status == 409) {
        alert('Usuário ja cadastrado');
    }
    else {
        alert('Erro ao cadastrar');
    }
})
