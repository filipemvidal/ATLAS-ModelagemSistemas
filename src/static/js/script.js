document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Pega os valores dos campos
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    // Validação básica
    if (!cpf || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Validação do CPF (11 dígitos)
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
        alert('CPF inválido! Digite apenas 11 números.');
        return;
    }

    // Aqui você pode adicionar a lógica de autenticação
    // Por enquanto, vamos apenas simular um redirecionamento
    console.log('Tentativa de login com:', { cpf, senha });
    
    // Simulando uma verificação básica (você deve implementar sua própria lógica de autenticação)
    if (cpf && senha) {
        // Aqui você pode redirecionar para a página principal
        window.location.href = 'home.html';
    } else {
        alert('Credenciais inválidas!');
    }
});

