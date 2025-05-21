const perguntas = [
    {
        pergunta: "O que é uma bomba solar?",
        alternativas: [
            "Uma bomba movida a gasolina",
            "Um equipamento que utiliza energia solar para bombear água",
            "Uma bomba elétrica comum",
            "Um painel que gera eletricidade para casas"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é a principal fonte de energia das bombas solares?",
        alternativas: [
            "Combustível fóssil",
            "Energia eólica",
            "Energia solar",
            "Bateria comum"
        ],
        correta: 2
    },
    {
        pergunta: "Qual das opções abaixo é uma vantagem da bomba solar?",
        alternativas: [
            "Alto consumo de energia",
            "Necessidade de combustível",
            "Economia de energia elétrica",
            "Poluição do ar"
        ],
        correta: 2
    },
    {
        pergunta: "Qual sistema de irrigação economiza mais água?",
        alternativas: [
            "Aspersão tradicional",
            "Irrigação por gotejamento",
            "Enchimento manual com balde",
            "Inundação do solo"
        ],
        correta: 1
    },
    {
        pergunta: "Por que a irrigação é importante em hortas domésticas?",
        alternativas: [
            "Evitar que a terra fique dura",
            "Garantir água suficiente para o crescimento saudável",
            "Apenas para enfeitar o jardim",
            "Para manter o solo seco"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é uma desvantagem das bombas solares?",
        alternativas: [
            "Funcionam somente com combustível",
            "Produzem muito barulho",
            "Dependem da luz solar para funcionar bem",
            "Geram muita poluição"
        ],
        correta: 2
    },
    {
        pergunta: "A irrigação regular ajuda a:",
        alternativas: [
            "Evitar o crescimento das plantas",
            "Economizar sementes",
            "Manter as plantas bem nutridas e saudáveis",
            "Aumentar a quantidade de pragas"
        ],
        correta: 2
    },
    {
        pergunta: "Uma bomba solar pode ser útil em qual situação?",
        alternativas: [
            "Local com acesso fácil à rede elétrica",
            "Locais com sombra constante",
            "Locais sem energia elétrica e com muito sol",
            "Regiões muito frias e sem luz solar"
        ],
        correta: 2
    },
    {
        pergunta: "Qual dessas é uma função do painel solar na bomba solar?",
        alternativas: [
            "Controlar a irrigação",
            "Gerar energia elétrica com a luz do sol",
            "Armazenar água",
            "Remover impurezas da água"
        ],
        correta: 1
    },
    {
        pergunta: "O uso de tecnologias como bombas solares e irrigação eficiente contribui para:",
        alternativas: [
            "Aumento do desperdício de água",
            "Agricultura mais poluente",
            "Produção sustentável e economia de recursos",
            "Aumento do consumo de energia elétrica"
        ],
        correta: 2
    }
];

let erros = 0;
let indiceAtual = 0;
let perguntasSelecionadas = [];

function embaralharArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function atualizarCoracoes() {
    const coracoes = document.querySelectorAll('.heart');
    coracoes.forEach((coracao, index) => {
        if (index < erros) {
            coracao.src = "coracao1.png";
            coracao.classList.add('lost');
        } else {
            coracao.src = "coracao.png";
            coracao.classList.remove('lost');
        }
    });
}

function mostrarTelaInicial() {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            padding: 20px;
        ">
            <img src="inicio.png" alt="Quiz!" style="max-width: 100%; height: auto; margin-bottom: 30px;">
            <button class="button-alt1">Começar</button>
        </div>
    `;

    const iniciarBtn = document.querySelector('.button-alt1');
    iniciarBtn.addEventListener('click', () => {
        iniciarBtn.classList.add('explosion');
        setTimeout(() => {
            iniciarQuiz();
        }, 1000);
    });
}

function iniciarQuiz() {
    document.body.innerHTML = `
        <div class="heart-container">
            <img class="heart" src="coracao.png">
            <img class="heart" src="coracao.png">
            <img class="heart" src="coracao.png">
            <img class="heart" src="coracao.png">
            <img class="heart" src="coracao.png">
        </div>
        <div id="image-container">
            <div class="message"></div>
            <div id="button-container"></div>
        </div>
        <audio id="som-acerto" src="acerto.mp3"></audio>
        <audio id="som-erro" src="erro.mp3"></audio>
    `;

    erros = 0;
    indiceAtual = 0;
    perguntasSelecionadas = embaralharArray([...perguntas]).slice(0, 5);

    atualizarCoracoes();
    mostrarPergunta();
}

function mostrarTelaFinal() {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 200vh;
            text-align: center;
            padding: 20px;
        ">
            <img src="fim.jpg" alt="Fim!" style="max-width: 100%; height: auto; margin-bottom: 30px;">
            <button class="button-alt1">Reiniciar</button>
        </div>
    `;

    const reiniciarBtn = document.querySelector('.button-alt1');
    reiniciarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        reiniciarBtn.classList.add('explosion');
        setTimeout(() => {
            location.reload();
        }, 1000);
    });
}

function mostrarTelaFalha() {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            padding: 20px;
        ">
            <img src="errou.jpg" alt="Errou!" style="max-width: 100%; height: auto; margin-bottom: 30px;">
            <button class="button-alt1">Tentar novamente</button>
        </div>
    `;

    const reiniciarBtn = document.querySelector('.button-alt1');
    reiniciarBtn.addEventListener('click', () => {
        reiniciarBtn.classList.add('explosion');
        setTimeout(() => {
            location.reload();
        }, 1000);
    });
}

function mostrarPergunta() {
    const perguntaAtual = perguntasSelecionadas[indiceAtual];

    const alternativasComIndice = perguntaAtual.alternativas.map((texto, i) => ({
        texto,
        originalIndex: i
    }));

    const alternativasEmbaralhadas = embaralharArray(alternativasComIndice);

    document.querySelector('.message').textContent = perguntaAtual.pergunta;
    const container = document.getElementById('button-container');
    container.innerHTML = "";

    alternativasEmbaralhadas.forEach((alt, i) => {
        const botao = document.createElement("button");
        botao.textContent = alt.texto;

        const isCorreta = alt.originalIndex === perguntaAtual.correta;
        botao.className = isCorreta ? "button-alt1" : "button-alt2";

        botao.addEventListener('click', function handleClick() {
    if (botao.classList.contains('clicado')) return;
    botao.classList.add('clicado');
    botao.classList.add('hovered');
            if (isCorreta) {
                document.getElementById('som-acerto').play();
                botao.classList.add('explosion');
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

                setTimeout(() => {
                    indiceAtual++;
                    if (indiceAtual < perguntasSelecionadas.length) {
                        mostrarPergunta();
                    } else {
                        mostrarTelaFinal();
                    }
                }, 2000);
            } else {
                document.getElementById('som-erro').play();
                botao.classList.add('explosionf');
                erros++;
                atualizarCoracoes();

                if (erros >= 5) {
                    setTimeout(() => {
                        mostrarTelaFalha();
                    }, 1000);
                }
            }
        });

        container.appendChild(botao);
    });
}

window.onload = () => {
    document.documentElement.addEventListener('click', () => {
        const el = document.documentElement;
        const requestMethod = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (requestMethod) requestMethod.call(el);
    }, { once: true });

    mostrarTelaInicial();
};
