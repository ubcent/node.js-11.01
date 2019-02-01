$('#translate').click(()=>{
    const toTranslate = $('#form1').val();

    $.get( "/translate",`text=${toTranslate}`,function( data ) {
        $('#form2').val(data)
        console.log( "Load was performed." );
      });

     
})