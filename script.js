const imagensPadrao = [
  "https://i.pinimg.com/236x/05/ae/c7/05aec7b93d989ffc1f50157e2feaa1ae.jpg",
  "https://static.mundoeducacao.uol.com.br/mundoeducacao/2021/02/1-bugio-vermelho.jpg",
  "https://hypescience.com/wp-content/uploads/2012/01/080619-zooseniors1-hmed-1p.grid-7x2.jpg",
  "https://i.pinimg.com/236x/11/44/28/1144288d77d57028e6ea6c1af9ac9ca7.jpg",
  "https://i.pinimg.com/236x/16/aa/76/16aa76461096f5c97949e11e6b8780c5.jpg",
  "https://i.pinimg.com/236x/6f/1c/79/6f1c79afe8a4320c7b757c48a61f7d6b.jpg",
  "https://i.pinimg.com/236x/0e/08/66/0e086611a459c26b43cd54f9f2316327.jpg",
  "https://i.pinimg.com/236x/5c/cc/95/5ccc951196e533a25c9c2fb917a1d67d.jpg",
  "https://s5.static.brasilescola.uol.com.br/be/2021/02/macaco-aranha-de-cara-preta.jpg",
  "https://media.istockphoto.com/id/824860820/pt/foto/barbary-macaque.jpg?s=612x612&w=0&k=20&c=3Jw8Z6BWMR4g3loNL8niMYQRE7JsRvklL07xqLGKv6E=",
  "https://ichef.bbci.co.uk/ace/ws/640/amz/worldservice/live/assets/images/2015/09/26/150926165742__85730600_monkey2.jpg.webp",
  "https://media.istockphoto.com/id/1404088305/pt/foto/celebes-crested-macaque.jpg?s=612x612&w=0&k=20&c=_MJ5JUc1ccTmbn9E3h0az6PiIB1dsTNCZF-SJecmU2c=",
]

const telaInicio = document.getElementById('start-screen')
const telaComo = document.getElementById('how-screen')
const telaPlacar = document.getElementById('score-screen')
const telaJogo = document.getElementById('game-screen')
const popupFinal = document.getElementById('end-popup')

const tabuleiro = document.getElementById('board')
const controles = document.getElementById('controls')

const btnIniciar = document.getElementById('btnStart')
const btnComo = document.getElementById('btnHow')
const btnFecharComo = document.getElementById('btnCloseHow')
const btnPlacar = document.getElementById('btnPlacar')
const btnFecharPlacar = document.getElementById('btnCloseScore')

const placarP1El = document.getElementById('p1')
const placarP2El = document.getElementById('p2')
const turnoEl = document.getElementById('turn')

const chaveP1 = 'mem_score_p1'
const chaveP2 = 'mem_score_p2'
const chavePartidas = 'mem_matches'

const partidasJogadasEl = document.getElementById('matchesPlayed')

const tituloFinal = document.getElementById('end-title')
const textoFinal = document.getElementById('end-text')

const btnReiniciar = document.getElementById('btnRestart')
const btnSair = document.getElementById('btnExit')

let imagens = []
let baralho = []
let cartasViradas = []
let paresEncontrados = 0
let travado = false
let jogadorAtual = 1

let pontosP1 = parseInt(localStorage.getItem(chaveP1)) || 0
let pontosP2 = parseInt(localStorage.getItem(chaveP2)) || 0
let partidasJogadas = parseInt(localStorage.getItem(chavePartidas)) || 0

placarP1El.textContent = pontosP1
placarP2El.textContent = pontosP2
partidasJogadasEl.textContent = partidasJogadas

btnIniciar.onclick = () => {
  telaInicio.classList.remove('active')
  telaJogo.classList.add('active')
  iniciarJogo()
}

btnComo.onclick = () => telaComo.classList.add('active')
btnFecharComo.onclick = () => telaComo.classList.remove('active')

btnPlacar.onclick = () => telaPlacar.classList.add('active')
btnFecharPlacar.onclick = () => telaPlacar.classList.remove('active')

btnReiniciar.onclick = () => {
  popupFinal.classList.remove('active')
  iniciarJogo()
}

btnSair.onclick = () => {
  popupFinal.classList.remove('active')
  telaJogo.classList.remove('active')
  telaInicio.classList.add('active')
}

function embaralhar(lista){
  for(let i=lista.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1))
    ;[lista[i],lista[j]]=[lista[j],lista[i]]
  }
  return lista
}

async function carregarImagensAPI(){
  try{
    const res = await fetch('api/imagens.php')
    if(!res.ok) throw new Error()
    const dados = await res.json()
    if(Array.isArray(dados) && dados.length>=6) return dados
    return null
  }catch{
    return null
  }
}

async function iniciarJogo(){
  tabuleiro.innerHTML=''
  controles.innerHTML=''
  cartasViradas=[]
  paresEncontrados=0
  travado=false
  jogadorAtual=1
  turnoEl.textContent = jogadorAtual
  popupFinal.classList.remove('active')

  imagens = await carregarImagensAPI() || imagensPadrao

  const quantidade = 18
  const escolhidas = embaralhar([...imagens]).slice(0,quantidade)

  baralho = embaralhar([...escolhidas,...escolhidas])

  baralho.forEach((src,indice)=>{
    const carta = document.createElement('div')
    carta.className='card'
    carta.dataset.index = indice

    const corpo = document.createElement('div')
    corpo.className='card-inner'

    const verso = document.createElement('div')
    verso.className='card-face card-back'

    const frente = document.createElement('div')
    frente.className='card-face card-front'

    const img = document.createElement('img')
    img.src = src

    frente.appendChild(img)
    corpo.appendChild(verso)
    corpo.appendChild(frente)
    carta.appendChild(corpo)
    tabuleiro.appendChild(carta)

    carta.addEventListener('click', ()=> clicarCarta(carta,src,indice))
  })

  const botaoReiniciar = document.createElement('button')
  botaoReiniciar.className='restart'
  botaoReiniciar.textContent = 'REINICIAR'
  botaoReiniciar.onclick = ()=> iniciarJogo()

  const botaoSair = document.createElement('button')
  botaoSair.className='exit'
  botaoSair.textContent = 'SAIR'
  botaoSair.onclick = ()=> {
    telaJogo.classList.remove('active')
    telaInicio.classList.add('active')
  }

  controles.appendChild(botaoReiniciar)
  controles.appendChild(botaoSair)
}

function clicarCarta(carta,src,indice){
  if(travado) return
  if(carta.classList.contains('flipped') || carta.classList.contains('matched')) return

  carta.classList.add('flipped')
  cartasViradas.push({carta,src,indice})

  if(cartasViradas.length===2){
    travado=true
    setTimeout(()=> verificarPar(),700)
  }
}

function verificarPar(){
  const primeira = cartasViradas[0]
  const segunda = cartasViradas[1]

  if(primeira.src === segunda.src){
    primeira.carta.classList.add('matched')
    segunda.carta.classList.add('matched')
    paresEncontrados++
    adicionarPonto(jogadorAtual)
  } else {
    primeira.carta.classList.remove('flipped')
    segunda.carta.classList.remove('flipped')
  }

  cartasViradas=[]
  travado=false

  jogadorAtual = jogadorAtual===1 ? 2 : 1
  turnoEl.textContent = jogadorAtual

  if(paresEncontrados === baralho.length/2){
    finalizarPartida()
  }
}

function adicionarPonto(jogador){
  if(jogador===1){
    pontosP1++
    localStorage.setItem(chaveP1,pontosP1)
    placarP1El.textContent = pontosP1
  } else {
    pontosP2++
    localStorage.setItem(chaveP2,pontosP2)
    placarP2El.textContent = pontosP2
  }
}

function finalizarPartida(){
  partidasJogadas++
  localStorage.setItem(chavePartidas,partidasJogadas)
  partidasJogadasEl.textContent = partidasJogadas

  let vencedor = 'EMPATE'
  if(pontosP1 > pontosP2) vencedor = 'PLAYER 1 VENCEU'
  else if(pontosP2 > pontosP1) vencedor = 'PLAYER 2 VENCEU'

  tituloFinal.textContent = vencedor
  textoFinal.textContent = `Placar final — P1: ${pontosP1}  |  P2: ${pontosP2}`

  popupFinal.classList.add('active')
}
