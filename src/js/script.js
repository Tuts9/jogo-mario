// Selecionando elementos do DOM
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const game_over = document.querySelector('.game-over');
const btn_restart = document.querySelector('.btn-restart');
const scoreDisplay = document.querySelector('.score-display');

// Inicializando a pontuação
let score = 0;

// Função para reiniciar o jogo
const restart = () => {
    window.location.reload(); // Recarrega a página
    game_over.style.display = 'none'; // Esconde o elemento game_over
    btn_restart.style.display = 'none'; // Esconde o botão de reiniciar
}

// Função para fazer o Mario pular
const jump = () => {
    mario.classList.add('jump'); // Adiciona a classe 'jump' ao Mario

    setTimeout(() => {
        mario.classList.remove('jump'); // Remove a classe 'jump' após 500ms
    }, 500)
}

// Função para aumentar a pontuação
const increaseScore = () => {
    score++;
    scoreDisplay.textContent = `${score}`; // Atualiza a exibição da pontuação
}

// Loop para aumentar a pontuação a cada 10ms
const scoreLoop = setInterval(increaseScore, 10);

// Loop principal do jogo
const loop = setInterval(() => {
    const pipe_position = pipe.offsetLeft; // Obtém a posição do cano
    const mario_position = +window.getComputedStyle(mario).bottom.replace('px', ''); // Obtém a posição do Mario
    const clouds_position = clouds.offsetLeft; // Obtém a posição das nuvens

    // Verifica se o Mario colidiu com o cano
    if (pipe_position <= 120 && pipe_position > 0 && mario_position < 80 ) {
        // Para as animações
        pipe.style.animation = 'none';
        mario.style.animation = 'none';
        clouds.style.animation = 'none';

        // Atualiza as posições dos elementos
        pipe.style.left = `${pipe_position}px`
        mario.style.bottom = `${mario_position}px`
        clouds.style.left = `${clouds_position}px`

        // Altera a imagem do Mario para a imagem de game over
        mario.src = 'img/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        // Exibe o game over e o botão de reiniciar
        game_over.style.display = 'block'
        btn_restart.style.display = 'block'

        // Para os loops de pontuação e do jogo
        clearInterval(scoreLoop)
        clearInterval(loop)

        // Adiciona um evento para reiniciar o jogo ao pressionar Enter
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                restart();
            }
        });
    }

    // Aumenta a velocidade do cano conforme a pontuação aumenta
    if (score === 1000) {
        pipe.style.animation = 'pipe-animation 1.6s infinite linear'
    } else if (score === 3000) {
        pipe.style.animation = 'pipe-animation 1.4s infinite linear'
    } else if (score === 5000) {
        pipe.style.animation = 'pipe-animation 1s infinite linear'
    }

}, 10)

// Adiciona um evento para fazer o Mario pular ao pressionar uma tecla
document.addEventListener('keydown', jump)