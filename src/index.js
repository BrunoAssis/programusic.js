import * as Tone from 'tone'
import Reveal from 'reveal.js'
import hljs from 'highlight.js'

import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'

import 'highlight.js/styles/base16/solarized-dark.css'

function tom(frequencia, duracao = 0.1) {
  new Tone.Synth().toDestination().triggerAttackRelease(frequencia, duracao)
}

function tomSemEnvelope(frequencia, duracao) {
  const envelopeNulo = new Tone.AmplitudeEnvelope({
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0
  })   
  tomComEnvelope(frequencia, duracao, envelopeNulo)
}

function tomComEnvelope(frequencia, duracao, envelope) {
  const e = envelope.toDestination();

  const oscillator = new Tone.Oscillator(frequencia)
    .connect(e)
    .start();

  envelope.triggerAttackRelease(duracao);
}

function ex11() {
  tomSemEnvelope(440, 2)
}

function ex12() {
  tomSemEnvelope(440, 1)
  tomSemEnvelope(440, 1)
}

function ex13() {
  tomSemEnvelope(440, 3)
  tomSemEnvelope(440.5, 3)
}

function ex21() {
  tomSemEnvelope(440, 1)
}

function ex22() {
  tomSemEnvelope(880, 1)
}

function ex23() {
  tomSemEnvelope(220, 1)
}

function ex31() {
  tomComEnvelope(440, 2, new Tone.AmplitudeEnvelope({
    attack: 1,
    decay: 0,
    sustain: 1,
    release: 0
  }))
}

function ex32() {
  tomComEnvelope(440, 2, new Tone.AmplitudeEnvelope({
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 1
  }))
}

function ex33() {
  tomComEnvelope(440, 2, new Tone.AmplitudeEnvelope({
    attack: 1,
    decay: 0,
    sustain: 1,
    release: 1
  }))
}

function tocarSerieHarmonica(frequencia = 440,
  duracao = 6,
  serieHarmonica) {
  serieHarmonica.forEach(({ intervalo, proporcao }) => {
    const nota = frequencia * intervalo
    const tempo = duracao * proporcao
    tom(nota, tempo)
  })
}

function sinoPaia(frequencia = 440, duracao = 6) {
  tocarSerieHarmonica(frequencia, duracao, [
    { intervalo: 1, proporcao: 1.00 },
    { intervalo: 2, proporcao: 0.60 },
    { intervalo: 3, proporcao: 0.40 },
    { intervalo: 4, proporcao: 0.25 },
    { intervalo: 5, proporcao: 0.20 },
    { intervalo: 6, proporcao: 0.15 },
  ])
}

function ex41() {
  sinoPaia(300, 1)
}

function sino(frequencia = 440, duracao = 6) {
  tocarSerieHarmonica(frequencia, duracao, [
    { intervalo: 1, proporcao: 1.00 },
    { intervalo: 2, proporcao: 0.60 },
    { intervalo: 3, proporcao: 0.40 },
    { intervalo: 4.2, proporcao: 0.25 },
    { intervalo: 5.4, proporcao: 0.20 },
    { intervalo: 6.8, proporcao: 0.15 },
  ])
}

function ex42() {
  sino(300, 1)
}

function midiParaHz(midi) {
  return 8.1757989156 * Math.pow(2, midi / 12.0)
}

function campainha(midi) {
  sino(midiParaHz(midi), 1)
}

function ex51() {
  campainha(60)
}

function ex52() {
  campainha(61)
}

function ex53() {
  campainha(62)
}

function pausa(segundos) {
  const hora = Date.now()
  const milisegundos = segundos * 1000
  let horaAtual = null
  do {
    horaAtual = Date.now()
  } while (horaAtual - hora < milisegundos)
}

function nota(tomMidi, pausaEmSegundos, instrumento) {
  instrumento(tomMidi, pausaEmSegundos)
  pausa(pausaEmSegundos)
}

function ex61() {
  nota(50, 1, campainha)
  nota(52, 1, campainha)
  nota(54, 1, campainha)
  nota(55, 1, campainha)
  nota(57, 1, campainha)
  nota(59, 1, campainha)
  nota(61, 1, campainha)
  nota(62, 1, campainha)
}

function melodiaSimples(tons, pausaEntreNotas = 0.5) {
  tons.forEach(tom => nota(tom, pausaEntreNotas, campainha))
}

function ex62() {
  melodiaSimples([50, 51, 52, 53, 54, 55, 56, 57])
  pausa(2)
  melodiaSimples([57, 56, 55, 54, 53, 52, 51, 50])
  pausa(2)
  melodiaSimples([50, 51, 52, 53, 54, 55, 56, 57, 56, 55, 54, 53, 52, 51, 50])
}

function escala(tonica, intervalos) {
  let passo = 0
  return [tonica, ...intervalos.map(intervalo => {
    passo += intervalo
    return tonica + passo
  })]
}

function maior(tonica) {
  return escala(tonica, [2, 2, 1, 2, 2, 2, 1])
}

function ex71() {
  console.log(maior(50)) //=> [50, 52, 54, 55, 57, 59, 61, 62]
}

const d?? = 48

function ex72() {
  // const d?? = 48
  const escalaMaiorEmD?? = maior(d??)
  melodiaSimples(escalaMaiorEmD??)
}

function menor(tonica) {
  return escala(tonica, [2, 1, 2, 2, 1, 2, 2])
}

function ex73() {
  melodiaSimples(menor(d??))
}

function blues(tonica) {
  return escala(tonica, [3, 2, 1, 1, 3, 2])
}

function ex74() {
  melodiaSimples(blues(d??))
}

function pentat??nica(tonica) {
  return escala(tonica, [3, 2, 2, 3, 2])
}

function ex75() {
  melodiaSimples(pentat??nica(d??))
}

function eg??pcia(tonica) {
  return escala(tonica, [2, 3, 2, 3, 2])
}

function ex76() {
  melodiaSimples(eg??pcia(d??))
}

function crom??tica(tonica) {
  return escala(tonica, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
}

function ex77() {
  melodiaSimples(crom??tica(d??))
}

function melodiaAleat??ria(tons, duracaoTotal, pausa = 0.3) {
  let duracao = 0
  while (duracao < duracaoTotal) {
    const tomAleat??rio = tons[Math.floor(Math.random() * tons.length)];
    nota(tomAleat??rio, pausa, campainha)
    duracao += pausa
  }
}

function ex81() {
  melodiaAleat??ria(crom??tica(d??), 6)
}

function ex82() {
  melodiaAleat??ria(maior(d??), 6)
}

function ex83() {
  melodiaAleat??ria(menor(d??), 6)
}

function ex84() {
  melodiaAleat??ria(pentat??nica(d??), 6)
}

function ex85() {
  melodiaAleat??ria(eg??pcia(d??), 6)
}

function doReMiFa(tonica) {
  const tonsEDuracoes = [
    { tom: 0, duracao: 0.25 },
    { tom: 2, duracao: 0.25 },
    { tom: 4, duracao: 0.25 },
    { tom: 5, duracao: 0.4 },
    { tom: 5, duracao: 0.25 },
    { tom: 5, duracao: 0.5 },
    { tom: 0, duracao: 0.25 },
    { tom: 2, duracao: 0.25 },
    { tom: 0, duracao: 0.25 },
    { tom: 2, duracao: 0.4 },
    { tom: 2, duracao: 0.25 },
    { tom: 2, duracao: 0.5 },
    { tom: 0, duracao: 0.25 },
    { tom: 7, duracao: 0.25 },
    { tom: 5, duracao: 0.25 },
    { tom: 4, duracao: 0.4 },
    { tom: 4, duracao: 0.25 },
    { tom: 4, duracao: 0.5 },
    { tom: 0, duracao: 0.25 },
    { tom: 2, duracao: 0.25 },
    { tom: 4, duracao: 0.25 },
    { tom: 5, duracao: 0.4 },
    { tom: 5, duracao: 0.25 },
    { tom: 5, duracao: 0.5 }
  ]

  return tonsEDuracoes.map(({ tom, duracao }) => {
    return { tom: tonica + tom, duracao }
  })
}

function melodia(notas, instrumento) {
  notas.forEach(({ tom, duracao }) => nota(tom, duracao, instrumento))
}

function ex91() {
  melodia(doReMiFa(d??), campainha)
}

function ex92() {
  melodia(doReMiFa(d?? - 10), campainha)
}

function FrereJacques(tonica) {
  const escalaMaior = maior(tonica)
  const [d??, r??, mi, f??, sol, la] = escalaMaior
  const sol3 = sol - 12 // descendo uma escala: existem 12 notas entre uma nota e sua oitava

  return [
    { tom: d??, duracao: 1 },
    { tom: r??, duracao: 1 },
    { tom: mi, duracao: 1 },
    { tom: d??, duracao: 1 },

    { tom: d??, duracao: 1 },
    { tom: r??, duracao: 1 },
    { tom: mi, duracao: 1 },
    { tom: d??, duracao: 1 },

    { tom: mi, duracao: 1 },
    { tom: f??, duracao: 1 },
    { tom: sol, duracao: 2 },

    { tom: mi, duracao: 1 },
    { tom: f??, duracao: 1 },
    { tom: sol, duracao: 2 },

    { tom: sol, duracao: 3/4 },
    { tom: la, duracao: 1/4 },
    { tom: sol, duracao: 1/2 },
    { tom: f??, duracao: 1/2 },
    { tom: mi, duracao: 1 },
    { tom: d??, duracao: 1 },

    { tom: sol, duracao: 3/4 },
    { tom: la, duracao: 1/4 },
    { tom: sol, duracao: 1/2 },
    { tom: f??, duracao: 1/2 },
    { tom: mi, duracao: 1 },
    { tom: d??, duracao: 1 },

    { tom: d??, duracao: 1 },
    { tom: sol3, duracao: 1 },
    { tom: d??, duracao: 2 },

    { tom: d??, duracao: 1 },
    { tom: sol3, duracao: 1 },
    { tom: d??, duracao: 2 }
  ]
}

function partituraNoTempo(notas, bpm = 120) {
  return notas.map(({ tom, duracao }) => {
    return { tom, duracao: duracao / bpm * 60.0 }
  })
}

function ex101() {
  melodia(partituraNoTempo(FrereJacques(d??)), campainha)
}

function ex102() {
  melodia(partituraNoTempo(FrereJacques(d?? - 10), 100), campainha)
}

const instrumentoPiano = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

function piano(frequencia, duracao) {
  // const instrumentoPiano = new Tone.Sampler({
  //   urls: {
  //     C4: "C4.mp3",
  //     "D#4": "Ds4.mp3",
  //     "F#4": "Fs4.mp3",
  //     A4: "A4.mp3",
  //   },
  //   release: 1,
  //   baseUrl: "https://tonejs.github.io/audio/salamander/",
  // }).toDestination();
  instrumentoPiano.triggerAttackRelease(frequencia, duracao);
}

function pianoMidi(midi, duracao = 0.1) {
  piano(midiParaHz(midi), duracao)
}

function ex111() {
  pianoMidi(d??, 0.5)
}

function ex112() {
  melodia(partituraNoTempo(FrereJacques(d??)), pianoMidi)
}

function EineKleineNachtmusik() {
  const claveSol = [
    { tom: "G4", duracao: 1 },
    { tom: null, duracao: 1/2 },
    { tom: "D4", duracao: 1/2 },
    { tom: "G4", duracao: 1 },
    { tom: null, duracao: 1/2 },
    { tom: "D4", duracao: 1/2 },

    { tom: "G4", duracao: 1/2 },
    { tom: "D4", duracao: 1/2 },
    { tom: "G4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "D5", duracao: 1 },
    { tom: null, duracao: 1 },

    { tom: "C5", duracao: 1 },
    { tom: null, duracao: 1/2 },
    { tom: "A4", duracao: 1/2 },
    { tom: "C5", duracao: 1 },
    { tom: null, duracao: 1/2 },
    { tom: "A4", duracao: 1/2 },

    { tom: "C5", duracao: 1/2 },
    { tom: "A4", duracao: 1/2 },
    { tom: "F3", duracao: 1/2 },
    { tom: "A4", duracao: 1/2 },
    { tom: "D3", duracao: 1 },
    { tom: null, duracao: 1 },

    { tom: "G4", duracao: 1 },
    { tom: "G4", duracao: 1 },
    { tom: "G4", duracao: 1/2 },
    { tom: "B5", duracao: 1/2 },
    { tom: "A5", duracao: 1/2 },
    { tom: "G4", duracao: 1/2 },

    { tom: "G4", duracao: 1/2 },
    { tom: "F4", duracao: 1/2 },
    { tom: "F4", duracao: 3/2 },
    { tom: "A5", duracao: 1/2 },
    { tom: "C5", duracao: 1/2 },
    { tom: "F4", duracao: 1/2 },

    { tom: "A5", duracao: 1/2 },
    { tom: "G4", duracao: 1/2 },
    { tom: "G4", duracao: 3/2 },
    { tom: "B5", duracao: 1/2 },
    { tom: "A5", duracao: 1/2 },
    { tom: "G4", duracao: 1/2 },

    { tom: "G4", duracao: 1/2 },
    { tom: "F4", duracao: 1/2 },
    { tom: "F4", duracao: 3/2 },
    { tom: "A5", duracao: 1/2 },
    { tom: "C5", duracao: 1/2 },
    { tom: "F4", duracao: 1/2 },

    { tom: "G4", duracao: 1/2 },
    { tom: "G4", duracao: 1/2 },
    { tom: "G4", duracao: 1/4 },
    { tom: "F4", duracao: 1/4 },
    { tom: "E4", duracao: 1/4 },
    { tom: "F4", duracao: 1/4 },
    { tom: "G4", duracao: 1/2 },
    { tom: "G4", duracao: 1/2 },

    { tom: "B5", duracao: 1/4 },
    { tom: "A5", duracao: 1/4 },
    { tom: "G4", duracao: 1/4 },
    { tom: "A5", duracao: 1/4 },
    { tom: "B5", duracao: 1/2 },
    { tom: "B5", duracao: 1/2 },
    { tom: "D5", duracao: 1/4 },
    { tom: "C5", duracao: 1/4 },
    { tom: "B5", duracao: 1/4 },
    { tom: "C5", duracao: 1/4 },

    { tom: "D5", duracao: 2 },
    { tom: "D5", duracao: 2 },

    { tom: "E5", duracao: 2 },
    { tom: "D5", duracao: 1/2 },
    { tom: "C5", duracao: 1/2 },
    { tom: "C5", duracao: 1 },

    { tom: "C5", duracao: 1/2 },
    { tom: "B5", duracao: 1/2 },
    { tom: "B5", duracao: 1 },
    { tom: "B5", duracao: 1/2 },
    { tom: "A5", duracao: 1/2 },
    { tom: "A5", duracao: 1 },
    { tom: "G4", duracao: 1/2 },
    { tom: "F4", duracao: 1/2 },
    { tom: "E4", duracao: 1/2 },
    { tom: "F4", duracao: 1/2 },
    { tom: "G4", duracao: 1 },
    { tom: "A5", duracao: 1 },
    { tom: "B5", duracao: 2 },
    { tom: "D5", duracao: 2 },
    { tom: "E5", duracao: 2 },
    { tom: "D5", duracao: 1/2 },
    { tom: "C5", duracao: 1/2 },
    { tom: "C5", duracao: 1/2 },
    { tom: "C5", duracao: 1/2 },
    { tom: "C5", duracao: 1/2 },
    { tom: "B5", duracao: 1/2 },
    { tom: "B5", duracao: 1/2 },
    { tom: "B5", duracao: 1/2 },
    { tom: "B5", duracao: 1/2 },
    { tom: "A5", duracao: 1/2 },
    { tom: "A5", duracao: 1/2 },
    { tom: "A5", duracao: 1/2 },
    { tom: "G4", duracao: 1/2 },
    { tom: "F4", duracao: 1/2 },
    { tom: "E4", duracao: 1/2 },
    { tom: "F4", duracao: 1/2 },
    { tom: "G4", duracao: 2 },
    { tom: null, duracao: 2 },
    { tom: "G4", duracao: 1/4 },
    { tom: "D4", duracao: 1/4 },
    { tom: "G4", duracao: 1/4 },
    { tom: "B5", duracao: 1/4 },
    { tom: "D5", duracao: 1 },
    { tom: "F4", duracao: 1 },
    { tom: "G4", duracao: 1 },
    { tom: "G4", duracao: 1 },
    { tom: null, duracao: 2 },
    { tom: "G4", duracao: 1/4 },
    { tom: "D4", duracao: 1/4 },
    { tom: "G4", duracao: 1/4 },
    { tom: "B5", duracao: 1/4 },
    { tom: "D5", duracao: 1 },
    { tom: "F4", duracao: 1 },
    { tom: "G4", duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: "G4", duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: "G4", duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: null, duracao: 2 },
    { tom: null, duracao: 1 }
  ]

  const claveFa = [
    { tom: "G3", duracao: 1 },
    { tom: null, duracao: 1/2 },
    { tom: "D3", duracao: 1/2 },
    { tom: "G3", duracao: 1 },
    { tom: null, duracao: 1/2 },
    { tom: "D3", duracao: 1/2 },
    { tom: "G3", duracao: 1/2 },
    { tom: "D3", duracao: 1/2 },
    { tom: "G3", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "D4", duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: "C4", duracao: 1 },
    { tom: null, duracao: 1/2 },
    { tom: "A4", duracao: 1/2 },
    { tom: "C4", duracao: 1 },
    { tom: null, duracao: 1/2 },
    { tom: "A4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "A4", duracao: 1/2 },
    { tom: "F3", duracao: 1/2 },
    { tom: "A4", duracao: 1/2 },
    { tom: "D3", duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "B4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "C4", duracao: 1/2 },
    { tom: "B4", duracao: 1 },
    { tom: "C4", duracao: 1 },
    { tom: "D4", duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: "G3", duracao: 1 },
    { tom: "A4", duracao: 1 },
    { tom: "B4", duracao: 2 },
    { tom: null, duracao: 4 },
    { tom: "F3", duracao: 2 },
    { tom: "G3", duracao: 2 },
    { tom: "C3", duracao: 2 },
    { tom: "D3", duracao: 2 },
    { tom: "B3", duracao: 1 },
    { tom: "D3", duracao: 1 },
    { tom: "G3", duracao: 2 },
    { tom: null, duracao: 4 },
    { tom: "F3", duracao: 2 },
    { tom: "G3", duracao: 2 },
    { tom: "C3", duracao: 1 },
    { tom: "C3", duracao: 1 },
    { tom: "D3", duracao: 1 },
    { tom: "D3", duracao: 1 },
    { tom: "B4", duracao: 2 },
    { tom: "D4", duracao: 1/4 },
    { tom: "B4", duracao: 1/4 },
    { tom: "G3", duracao: 1/4 },
    { tom: "B4", duracao: 1/4 },
    { tom: "D4", duracao: 1 },
    { tom: null, duracao: 2 },
    { tom: "D4", duracao: 1 },
    { tom: "B4", duracao: 1 },
    { tom: "B4", duracao: 1 },
    { tom: "D4", duracao: 1/4 },
    { tom: "B4", duracao: 1/4 },
    { tom: "G3", duracao: 1/4 },
    { tom: "B4", duracao: 1/4 },
    { tom: "D4", duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: null, duracao: 1 },
    { tom: "D4", duracao: 1 },
    { tom: "B4", duracao: 1 },
    { tom: "D3", duracao: 1/2 },
    { tom: "D3", duracao: 1/2 },
    { tom: "B4", duracao: 1 },
    { tom: "D3", duracao: 1/2 },
    { tom: "D3", duracao: 1/2 },
    { tom: "B4", duracao: 1 },
    { tom: "G2", duracao: 3/4 },
    { tom: "G2", duracao: 1/4 },
    { tom: "G2", duracao: 4 }
  ]

  return { claveSol, claveFa }
}

function agendarNotas(notas) {
  let tempo = 0
  
  notas.forEach(({tom, duracao}) => {
    if (tom != null) {
      Tone.Transport.scheduleOnce(() => {  
        instrumentoPiano.triggerAttackRelease(tom, duracao)
      }, tempo)
    }
    tempo += duracao
  })
}

function melodiaPiano({ claveSol, claveFa }, bpm = 120) {
  Tone.Transport.stop()

  const claveFaNoTempo = partituraNoTempo(claveFa, bpm)
  const claveSolNoTempo = partituraNoTempo(claveSol, bpm)

  agendarNotas(claveFaNoTempo)
  agendarNotas(claveSolNoTempo)
 
  Tone.Transport.start()
}

function ex113() {
  melodiaPiano(EineKleineNachtmusik(), 125)
}

/* Fun????es auxiliares da apresenta????o */
let audioStarted = false
async function startAudio() {
  if (!audioStarted) {
    await Tone.start()
    audioStarted = true
  }
}

function initializeEvents() {
  document.querySelectorAll('div[data-target]').forEach(div => {
    const target = div.dataset['target']
    const linkedFunction = eval(target)

    const pre = document.createElement('pre')
    const code = document.createElement('code')
    code.textContent = linkedFunction.toString()
    pre.appendChild(code)

    div.prepend(pre)

    const playButton = div.querySelector('button')

    if (playButton) {
      playButton.addEventListener('click', startAudio)
      playButton.addEventListener('click', linkedFunction)
    }
  })
}

function initializeCodeBlocks() {
  document.querySelectorAll('code').forEach(e => {
    e.className = 'language-js'
  });
  hljs.highlightAll();
}

function initializeReveal() {
  Reveal.initialize()
}

function initializeApp(_event) {
  initializeEvents()
  initializeCodeBlocks()
  initializeReveal()
}

document.addEventListener('DOMContentLoaded', initializeApp)