//Начальный POST запрос с последующей отрисовкой, при открытии страницы
$(document).ready(()=>{
  const cat = $('#category').val();
  const source = $('#source').val();
  const show = $('#show').val();
  $.post( `/${source}/${cat}`,function( data ) {
    for(let i = 0; i<data.length && i<show; i++)
  
      $('tbody').append(`<tr><td class="center-text"><strong>${data[i].category}</strong></td><td>${data[i].title}</td><td>${data[i].article}</td></tr>`)
  
  
    });
   
})


//POST запрос  с последующей отрисовкой при изменинии одного из параметров
$('select').change(()=>{
  $('tbody').empty();
  const cat = $('#category').val();
  const source = $('#source').val();
  const show = $('#show').val();
  $.post( `/${source}/${cat}`,function( data ) {
    for(let i = 0; i<data.length && i<show; i++)
  
      $('tbody').append(`<tr><td class="center-text"><strong>${data[i].category}</strong></td><td>${data[i].title}</td><td>${data[i].article}</td></tr>`)
  
  
    })
    // const cookie = document.cookie.split("=");
    // $(`option[value=${cookie[0]}]`).attr('selected');
    // $(`option[value=${cookie[1]}]`).attr('selected');
});



