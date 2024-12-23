document.addEventListener('DOMContentLoaded', () => {
    mensagemInicial();
});

let minhaBiblioteca = []; // Lista de estantes criadas pelo usuário.
let estanteAtual = null; // Índice da estante selecionada

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    if (campo) { // Verifica se o elemento existe
        campo.innerHTML = texto;
    }
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Minha Biblioteca');
    exibirTextoNaTela('p', 'Boas vindas à sua biblioteca!');
    exibirTextoNaTela('h2', 'Estantes');
}

function mostrarCampoLivro() {
    const campoLivro = document.getElementById('bookBox');

    if (estanteAtual !== null) {
        // Exibe o campo de input quando uma estante for selecionada
        campoLivro.style.display = 'block';
    } else {
        // Oculta o campo de input caso nenhuma estante esteja selecionada
        campoLivro.style.display = 'none';
    }
}
mostrarCampoLivro();

function addBotaoRemover(callback) {
    const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.classList.add('remove');
        botaoRemover.addEventListener('click', callback);
        return botaoRemover;
}

// Essa função permite ao usuário criar novas estantes, que são listas e, ao mesmo tempo, são elementos dentro da lista minhaBiblioteca.
function estanteNova() {
    let estante = document.getElementById('shelfName').value.trim(); // Pega nome no input e cria estante nova.
    if (estante === '') {
        alert('Por favor, digite um nome para a estante.');
        return;
    }

    minhaBiblioteca.push({ nome: estante, livros: [] }); // Adiciona estante à biblioteca
    document.getElementById('shelfName').value = ''; // Limpa o campo input
    addBotaoRemover();
    mostrarBiblioteca(); // Atualiza a exibição da lista minhaBiblioteca
} 

// Esta função mostra a biblioteca com suas estantes
function mostrarBiblioteca() {
    const listaBiblioteca = document.getElementById('shelfList'); // Seleciona a "caixa" das estantes.
    listaBiblioteca.innerHTML = ''; // Limpa a caixa para evitar duplicações.

    // Percorre a lista (Biblioteca) e cria um botão para cada estante
    minhaBiblioteca.forEach((estante, index) => {
        const itemEstante = document.createElement('button');
        itemEstante.className = 'shelf-button';
        itemEstante.textContent = estante.nome;

        itemEstante.addEventListener('click', () => {
            estanteAtual = index; // Atualiza estanteAtual com o índice da estante clicada
            console.log(`Estante selecionada: ${minhaBiblioteca[estanteAtual].nome}`);
            exibirTextoNaTela('h3', minhaBiblioteca[index].nome);
            mostrarEstante(index); // Mostra livros desta estante
            mostrarCampoLivro(); // exibe ou esconde o campo de input fo livro, dependendo se estanteAtual = null ou não.
        });
        
        listaBiblioteca.appendChild(itemEstante);
    });
}

// Esta função adiciona um livro à estante.
function livroNovo() {
    let livro = document.getElementById('bookName').value.trim(); // Pega nome no input e cria estante nova.
    if (livro === '') {
        alert('Por favor, digite o nome do livro.');
        return;
    }
    if (estanteAtual === null) {
        alert('Selecione uma estante antes de adicionar livros.');
        return;
    }
    

    minhaBiblioteca[estanteAtual].livros.push(livro); // Adiciona livro à estante

    document.getElementById('bookName').value = ''; // Limpa o campo input

    mostrarEstante(estanteAtual); // Atualiza a exibição da estante escolhida pelo usuário
}

// Esta função mostra os livros na estante escolhida.
function mostrarEstante(index) {
    const listaEstante = document.getElementById('bookList'); // Seleção da "caixa" Livros.
    listaEstante.innerHTML = ''; //Evita duplicação da lista de livros

    //Percorre a lista (Estante) e cria um item para cada livro
    minhaBiblioteca[index].livros.forEach((livro) => {
        const itemLivro = document.createElement('li');
        itemLivro.textContent = livro;
        listaEstante.appendChild(itemLivro);
    });
}

document.getElementById('addShelfButton').addEventListener('click', estanteNova);
document.getElementById('shelfName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      estanteNova();
    }
  });
document.getElementById('addBookButton').addEventListener('click', livroNovo);
document.getElementById('bookName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        livroNovo();
    }
});