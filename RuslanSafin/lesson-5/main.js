
$(document).ready(()=>{
    $.get('/all', function(res){
        console.log(res)
        for(let i = 0; i < res.length; i++){
            $('tbody').append(`<tr data-id="${res[i].id}"><td>${res[i].name}</td><td>${res[i].quantity}</td><td>${res[i].shop_name}</td><td class="action-btn"><button type="button" class="btn btn-outline-info btn-rounded btn-sm editItem waves-effect" ><i class="fas fa-pen fa-lg"></i></button><button type="button" class="btn btn-outline-danger btn-rounded btn-sm deleteItem waves-effect"><i class="far fa-trash-alt fa-lg"></i></button></td></tr>`)
        }
    })

    
})

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$('#addItem').click(function(){
    const item = $('#item').val().capitalize();
    const quantity = $('#quantity').val();
    const shopVal = $('#shop').val();
    const shopText = $('#shop option:selected').text();
    const data = `item=${item}&quantity=${quantity}&shop=${shopVal}`;
    if(item && quantity && shop){
        
        fetch('/',{
            method: 'POST',
            body:data,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(result => {
            return result.json();
        })
        .then(resData => {
            const id = resData[0].insertId;
            $('tbody').append(`<tr data-id=${id}><td>${item}</td><td>${quantity}</td><td>${shopText}</td><td class="action-btn"><button type="button" class="btn btn-outline-info btn-rounded btn-sm  waves-effect editItem"> <i class="fas fa-pen fa-lg"></i></button><button type="button" class="btn btn-outline-danger btn-rounded btn-sm deleteItem waves-effect"><i class="far fa-trash-alt fa-lg"></i></button></td></tr>`)
        })
        .catch(error => console.error('Error:', error))
        
        $('#item').val('');
        $('#quantity').val('1');
    }
        
})

$("tbody").on('click', '.deleteItem' ,function(){
    const id = $(this).parents('tr').attr('data-id');
    const data = `id=${id}`;
    $(this).parents('tr').empty();
    fetch('/', {
        method: 'DELETE',
        body: data,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        console.log(response.status)
    })
    .catch(error => console.error('Error:', error))
 })
 

 $('tbody').on('click', '.editItem', function(){
    const id = $(this).parents('tr').attr('data-id');
    const name = $(this).parents('tr').children('td').eq(0).text();
    const quantity = $(this).parents('tr').children('td').eq(1).text();
    const shop = $(this).parents('tr').children('td').eq(2).text();
    const options =Array.from($('#editShop').children());
    $('#editItem').val(name);
    $('#editQuantity').val(quantity);
    $('.pos-abs').attr('data-id', id)
    
    for(let i = 0; i<options.length; i++){
        options[i].selected = false;
        if(options[i].text === shop){
            options[i].selected = true;
        } 
    }

    $('#toBlur').toggleClass('blur');
    $('.pos-abs').toggleClass('flex-center-mod')
 })

 $('.editItem-btn').click(function(){
    const id = $('.pos-abs').attr('data-id');
    const item = $('#editItem').val().capitalize();
    const quantity = $('#editQuantity').val();
    const shopVal = $('#editShop').val();
    const shopText = $('#editShop option:selected').text();
    const data = `item=${item}&quantity=${quantity}&shop=${shopVal}&id=${id}`;
    if(item && quantity && shop){
        
        fetch('/',{
            method: 'PUT',
            body:data,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(result => {
            if(result.status === 200){
                $(`tr[data-id='${id}']`).children('td').eq(0).text(item);
                $(`tr[data-id='${id}']`).children('td').eq(1).text(quantity);
                $(`tr[data-id='${id}']`).children('td').eq(2).text(shopText);
            };
        })
        .catch(error => console.error('Error:', error))       
    }
        

    $('#toBlur').toggleClass('blur');
    $('.pos-abs').toggleClass('flex-center-mod')
 })