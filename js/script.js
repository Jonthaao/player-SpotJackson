// declaração dos elementos do player
const music_player = document.querySelector("#music-player");
const music_title = document.querySelector("#titulo-musica");
const artist_title = document.querySelector("#titulo-artista");
const music_img = document.querySelector("#imagem-musica");
const color_album = document.querySelector("body");
const next_music = document.querySelector("#musica-a-seguir");
const next_artist = document.querySelector("#artista-a-seguir");

// declaração dos botões
const play_pause_btn = document.querySelector("#playPause-btn");
const previous_btn = document.querySelector("#prev-btn");
const next_btn = document.querySelector("#next-btn");
const random_btn = document.querySelector("#random-btn");
const volume_btn = document.querySelector(".volume");
const btn_volume = document.querySelector("#btn-volume");
const icone_volume = document.querySelector('.icone-volume');

// declaração das barras de progresso e de tempo
const current_time = document.querySelector("#tempo-atual");
const duration = document.querySelector("#duracao");
const progress_bar = document.querySelector(".barra");
const progress = document.querySelector(".progresso");
const lista = document.querySelector("#lista");


//importando as músicas
import songs from "./musicas.js";

//criando as variaveis de troca de visual do botao
const play_btn ='<img class="play-icone" src="./icons/play/reproduzir32.png" alt="">';
const pause_btn ='<img class="play-icone" src="./icons/pausa/pausa32.png" alt="">';





//chamando função no click
previous_btn.addEventListener("click", () => prevNextMusic("prev"));
next_btn.addEventListener("click", () => prevNextMusic("next"));

//declaração do evento de play e pause
play_pause_btn.addEventListener("click", () => playPause());

//declaração do evento de aleatório
random_btn.addEventListener("click", () => reproduzirAleatorio());

//chamando função de mute
icone_volume.addEventListener("click", () => mute());

//chamando função controle volume
btn_volume.addEventListener("mouseover", () => volumeShow());
btn_volume.addEventListener("mouseleave", () => volumeHide());

//função play pause e modificando imagem do play/pause
const playPause = () => {
  if (music_player.paused) {
    music_player.play();
    color_album.style.animation = "changecolor 4s ease-in-out infinite";
    color_album.style.backgroundSize = "600% 100%"
    play_pause_btn.innerHTML = pause_btn;
    
  } else {
    music_player.pause();
    color_album.style.animation = "changecolor 5s ease-in-out 1";
    color_album.style.backgroundSize = "600% 100%"
    play_pause_btn.innerHTML = play_btn;
  }

  
};

//funcao para reproduzir musica aleatoria
const reproduzirAleatorio = () => {
  const random_index = Math.floor(Math.random() * songs.length); //Seleciona um índice aleatório entre 0 e o número total de músicas
  music_index = random_index;

  music_player.src = songs[music_index].musica;
  music_title.innerHTML = songs[music_index].nome_musica;
  artist_title.innerHTML = songs[music_index].nome_artista;
  music_img.style = "background-image: url('" + songs[music_index].imagem_musica + "')";
    

  if (music_index === songs.length - 1) {
    next_music.innerHTML = songs[0].nome_musica;
    next_artist.innerHTML = songs[0].nome_artista;
  } else {
    next_music.innerHTML = songs[music_index + 1].nome_musica;
    next_artist.innerHTML = songs[music_index + 1].nome_artista;
  }

  playPause();
  selecionaMusica(music_index);

  color_album.style.animation = "changecolor 4s ease-in-out infinite";
  color_album.style.backgroundSize = "600% 100%"
};

// criando as funções e variaveis para atualizar o tempo
music_player.ontimeupdate = () => updateTime();

const updateTime = () => {
  const minuto_atual = Math.floor(music_player.currentTime / 60); //pega o minuto atual arredonda com o math.floor
  const segundo_atual = Math.floor(music_player.currentTime % 60); // pega o resto da operação para fazer os segundos

  current_time.textContent = minuto_atual + ":" + formatTempo(segundo_atual); // passa para variavel e concatena os valores

  // formatar a duração da música
  const duracao_formatada = isNaN(music_player.duration)
    ? 0
    : music_player.duration;
  const duracao_minutos = Math.floor(duracao_formatada / 60);
  const duracao_segundos = Math.floor(duracao_formatada % 60);

  duration.textContent = duracao_minutos + ":" + formatTempo(duracao_segundos);
  // seleciona.textContent += duracao_minutos + ":" + format_tempo(duracao_segundos);

  // criando o efeito da barra, tamanho do progresso.
  const tempo_progresso = duracao_formatada
    ? (music_player.currentTime / duracao_formatada) * 100
    : 0;

  progress.style.width = tempo_progresso + "%";

  if (tempo_progresso === 100) prevNextMusic("next"); // passa automaticamente a música assim que ela termina.
};

const formatTempo = (n) => (n < 10 ? "0" + n : n); // para transformar o número em 0+numero

// setando o novo tempo da música pela barra de progresso...
progress_bar.addEventListener("click", (e) => {
  //pega a posição na horizontal e divide pelo tamanho da progress_bar X a duração do player ded audio -> passa para o currentTime a nova posição.
  const novo_tempo =
    (e.offsetX / progress_bar.offsetWidth) * music_player.duration;
  music_player.currentTime = novo_tempo;
});

// funcao de voltar ou passar a musica
const prevNextMusic = (type = "next") => {
  
  //verificar se for a primeira vez que carreguei o documento, ou se for a última música vai voltar pra primeira
  if (
    (type == "next" && music_index + 1 === songs.length) ||
    (type === "iniciar")
  ) {
    music_index = 0;

  } else if (type == "prev" && music_index === 0) {
    music_index = songs.length; // se estou na primeira musica, ele vai voltar pra última musica
  } else {
    music_index =
      type === "prev" && music_index ? music_index - 1 : music_index + 1;
  } // se nao vai voltar apenas 1 index se nao aumenta 1

  // chamando e imprimindo na tela as músicas e os nomes do MUSICAS.JS
  music_player.src = songs[music_index].musica;
  music_title.innerHTML = songs[music_index].nome_musica;
  artist_title.innerHTML = songs[music_index].nome_artista;
  music_img.style = "background-image: url('" + songs[music_index].imagem_musica + "')";
  

  if (music_index === songs.length - 1) {
    next_music.innerHTML = songs[0].nome_musica;
    next_artist.innerHTML = songs[0].nome_artista;

  } else {
    next_music.innerHTML = songs[music_index + 1].nome_musica;
    next_artist.innerHTML = songs[music_index + 1].nome_artista;
    corImagem();
  }

  // se for diferente do primeiro carregamento da página, chama a função play/pause
  if (type !== "iniciar") playPause(); //funcao também será colocar no play/pause-btn(declarado nos eventListener)
 
  updateTime(); //função para atualizar o tempo na barra de progresso
  selecionaMusica(music_index);

};

//função para alterar cor de fundo
const corImagem = () => {

  function arredonda(v) {
    return 5 * (Math.round(v / 5));
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgb_to_hex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  // carrega uma imagem
  var img = new Image();
  img.src = songs[music_index].imagem_musica;
  img.onload = () => {

    // cria um canvas invisível
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext('2d');

    // desenha a imagem no canvas
    context.drawImage(img, 0, 0);

    // recupera vetor de cores
    var map = context.getImageData(0, 0, img.width, img.height).data;

    var hex, r, g, b; //,alpha;
    var histograma = {};
    for (var i = 0, len = map.length; i < len; i += 4) {

      // recupera componentes de um ponto
      r = arredonda(map[i]);
      g = arredonda(map[i + 1]);
      b = arredonda(map[i + 2]);
      // alpha = map[i+2]; //ignora canal alpha

      // valor em hexadecimal
      hex = rgb_to_hex(r, g, b);

      // adiciona no histograma ou incrementa se já existir
      if (histograma[hex] === undefined) {
        histograma[hex] = 1;
      } else {
        histograma[hex]++;
      }
    };

    // recupera cor mais comum
    var corMaisComum = null;
    var frequenciaCorMaisComum = 0;
    for (var cor in histograma) {
      if (frequenciaCorMaisComum < histograma[cor]) {
        corMaisComum = cor;
        frequenciaCorMaisComum = histograma[cor];
      }
    };
    color_album.style = "background-image: linear-gradient(45deg," + corMaisComum + ",rgb(94, 180, 238) ,#a457ec," + corMaisComum;
    color_album.style.animation = "changecolor 4s ease-in-out infinite";
  }
};

// função de mute e unmute aterando as imagens do botão
const mute = () => {
  if (music_player.volume !== 0) {
    music_player.volume = 0;
    icone_volume.src = "./icons/mudo/mudo32.png";
  } else {
    music_player.volume = 0.5;
    icone_volume.src = "./icons/vol_medio/vol_medio32.png";
  }
};

// Controlador de volume por slide aparece quando quando passar o mouse sobre o icone de volume
const volumeShow = () => {
  volume_btn.hidden = false;
  };
const volumeHide = () => {
  volume_btn.hidden = true;
};

// Function para mudar o volume de acordo com o araste.
volume_btn.addEventListener("input", (e) => {
  const novo_volume = e.target.value;

  music_player.volume = novo_volume;

  // console.log(music_player.volume);

  // Alterar o icone do volume de acordo com o araste
  if ((music_player.volume > 0) && (music_player.volume < 0.35)) {
    icone_volume.src = "./icons/vol_baixo/vol_baixo32.png";
  } else if ((music_player.volume > 0.35) && (music_player.volume < 0.67)) {
    icone_volume.src = "./icons/vol_medio/vol_medio32.png";
  } else if (music_player.volume > 0.70) {
    icone_volume.src = "./icons/vol_alto/vol_alto32.png";
  }
});

//musica atual
let music_index = 0;

// lista de musica na tela
const criarLista = () => {
  lista.innerHTML = ''

  songs.forEach((song, index) => {
    let listItem = document.createElement('li');
    listItem.className = 'btn-lista';
    listItem.dataset.index = index;
    listItem.innerText = `${song.nome_musica} `;

    // Adiciona o evento de clique em cada item da lista
    listItem.addEventListener('click', () => {
      selecionaMusica(index);
    });

    lista.appendChild(listItem);
  });
};


const selecionaMusica = (index) => {
  // Remove a cor de todos os itens da lista
  let listaItens = document.querySelectorAll('.btn-lista');
  listaItens.forEach(item => {
    item.style.color = "";
  });

  // Adiciona a cor ao item selecionado
  let itemSelecionado = document.querySelector(`.btn-lista[data-index="${index}"]`);
  itemSelecionado.style.color = "#ff93f6";
  // Reproduz a música selecionada
  playMusica(index);

};
// Função para reproduzir uma música ao clicar na lista
const playMusica = (index) => {
  music_index = index;

  music_player.src = songs[music_index].musica;
  music_title.innerHTML = songs[music_index].nome_musica;
  artist_title.innerHTML = songs[music_index].nome_artista;
  music_img.style = `background-image: url('${songs[music_index].imagem_musica}')`;
  

  if (music_index === songs.length - 1) {
    next_music.innerHTML = songs[0].nome_musica;
    next_artist.innerHTML = songs[0].nome_artista;
  } else {
    next_music.innerHTML = songs[music_index + 1].nome_musica;
    next_artist.innerHTML = songs[music_index + 1].nome_artista;
  }

  if (music_player.paused) {
    music_player.play();
    color_album.style.animation = "changecolor 4s ease-in-out infinite";
    color_album.style.backgroundSize = "600% 100%"
    play_pause_btn.innerHTML = pause_btn;
  } else {
    music_player.pause();
    color_album.style.animation = "changecolor 5s ease-in-out 1";
    color_album.style.backgroundSize = "600% 100%"
    play_pause_btn.innerHTML = play_btn;
  }

  music_player.play();
  color_album.style.animation = "changecolor 4s ease-in-out infinite";
  color_album.style.backgroundSize = "600% 100%";
};

// Chama a função para criar a lista inicialmente
criarLista();

// carregar a primeira musica
prevNextMusic("iniciar");

