var UI = require('ui');
var ajax = require('ajax');

var themes=['дизайнеру','кодеру','верстальщику','фотографу','копирайтеру','маркетологу','сеошнику','водителю','музыканту','фокуснику','врачу','студенту','за жизнь','для него','для неё'];

var cur_theme=localStorage.getItem('theme');
if (!cur_theme){cur_theme=0;}

var main = new UI.Card({
  banner: 'images/app_icon.png',
  subtitle:'',
  body: '',
});

function update(){
  ajax({ url: 'http://fucking-great-advice.ru/api/random_by_tag/'+themes[cur_theme]+'/', type: 'json' },
  function(data) {
    main.subtitle(themes[cur_theme]);
    main.body(data.text.replace(/&nbsp;/g, ' '));
  }
); 
}

function changeTheme(){
  cur_theme++;
  if (cur_theme==themes.length){cur_theme=0;}
  localStorage.setItem('theme',cur_theme);
  update(); 
}

main.show();
main.on('click','select',update);
main.on('longClick','select',changeTheme);
update();