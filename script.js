const neymar = document.querySelector('.neymar');
const juiz = document.querySelector('.juiz');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

const txtPulosAtual = document.getElementById('pulos-atual');
const txtPulosRecorde = document.getElementById('pulos-recorde');

let contadorPulos = 0;
let recordePulos = localStorage.getItem('recordeNeymar') || 0;

txtPulosRecorde.innerText = recordePulos;

const jump = () => {
    if (!neymar.classList.contains('jump')) {
        neymar.classList.add('jump');
        contadorPulos++;
        txtPulosAtual.innerText = contadorPulos;

        setTimeout(() => {
            neymar.classList.remove('jump');
        }, 500);
    }
}

const verificarRecorde = () => {
    if (contadorPulos > recordePulos) {
        recordePulos = contadorPulos;
        localStorage.setItem('recordeNeymar', recordePulos);
        txtPulosRecorde.innerText = recordePulos;
    }
}

const loop = setInterval(() => {
    const juizPosition = juiz.offsetLeft;
    const neymarPosition = +window.getComputedStyle(neymar).bottom.replace('px', '');

    if (juizPosition <= 120 && juizPosition > 0 && neymarPosition < 100) {
        juiz.style.animation = 'none';
        juiz.style.left = `${juizPosition}px`;

        neymar.style.animation = 'none';
        neymar.style.bottom = `${neymarPosition}px`;

        neymar.src = 'assets/imgs/11-ezgif.com-crop.png';
        neymar.style.width = '130px';
        neymar.style.marginLeft = '15px';

        gameOver.style.visibility = 'visible';

        verificarRecorde();
        clearInterval(loop);
    }
}, 10);

const restart = () => {
    gameOver.style.visibility = 'hidden';
    juiz.style.animation = 'juiz-animations 1.5s infinite linear';
    juiz.style.left = ``;

    neymar.src = 'assets/imgs/vinijrnovo.gif';
    neymar.style.width = '150px';
    neymar.style.bottom = '0px';
    neymar.style.marginLeft = '';
    neymar.style.animation = '';

    contadorPulos = 0;
    txtPulosAtual.innerText = contadorPulos;

    const loop = setInterval(() => {
        const juizPosition = juiz.offsetLeft;
        const neymarPosition = +window.getComputedStyle(neymar).bottom.replace('px', '');

        if (juizPosition <= 120 && juizPosition > 0 && neymarPosition < 100) {
            juiz.style.animation = 'none';
            juiz.style.left = `${juizPosition}px`;

            neymar.style.animation = 'none';
            neymar.style.bottom = `${neymarPosition}px`;

            neymar.src = 'assets/imgs/11-ezgif.com-crop.png';
            neymar.style.width = '130px';
            neymar.style.marginLeft = '15px';

            gameOver.style.visibility = 'visible';

            verificarRecorde();
            clearInterval(loop);
        }
    }, 10);
}

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
restartButton.addEventListener('click', restart);