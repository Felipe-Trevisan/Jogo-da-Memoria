<?php
header('Content-Type: application/json; charset=utf-8');
$imagens = [
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
];
echo json_encode($imagens);
