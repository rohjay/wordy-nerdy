let headers = {
    'Content-Type' : 'application/json',
};
const base_url = 'http://localhost/wordy';
function error_mess( block, message) {
    //console.log( block.children);
    if (block.children(":first").hasClass( "error" )){
        console.log( 'haha');
        block.children(":first").html( message );
    } else {
    let err = $('<p class="error">'+message+'</p>');
    console.log( err );
    block.prepend( err );
    }
}
function ajax_call( method, url, callback, req_headers ) {
    $.ajax({
        url: url,
        type: method,
        success: function( res ) {
            callback( res );
        },
        headers: {req_headers}
      });
}
$("#dump_books").click(function() {
    ajax_call("POST", base_url + '/dump', function ( res ) {
        console.log("Books are loaded!");
    })
})

$( "#logout" ).click(function() {
    ajax_call( "GET", base_url + '/logout', function ( res ) {
        window.location.href = base_url + '/search';
    })
});
$( "#login" ).click(function() {
    window.location.href = base_url + '/auth';
});
$( "#auth_button" ).click(function() {
    let password = $( "#password" ).val();
    let username = $( "#username" ).val();
    
    $.post( base_url + '/login', {password: password, username: username}, function( res ) {
        console.log(res);
        window.location.href = base_url + '/search';
    })
})

$( "#delete_user" ).click(function() {
    if ( $("#delete_user").val().length > 0 ) {
        ajax_call("DELETE", base_url + "/delete/" + $("#delete_user").val(), function ( res ) {
            console.log( res );
            window.location.href = base_url + '/search';
        })
    } else {
        //Check that anything left after the user is cleaned
        console.log('TODO');
    }
});

$( "#web_search" ).click(function() {
    if( $( "#word_input" ).val().length > 0 ){
        headers['Cache-Control'] = 'private, max-age=1000';
        console.log(headers);
        ajax_call("GET", base_url + "/web-search/" + $("#word_input").val(), 
        function ( res ) {
            $( ".result_list" ).html(JSON.parse(res)); 
        });
    } else{
        alert($( "#word_input" ).val());
    }
    
});

$( "#lit_search" ).click(function() {
    if( $( "#word_input" ).val().length > 0 ){
        ajax_call("GET", base_url +"/lit-search/" + $("#word_input").val(), 
        function ( res ) {
            $( ".result_list" ).html(res); 
        });
    } else{
        alert("Enter a word!");
    }
    
});
$( document ).ready( function() {
    //Change user info
    $( document ).on("click", "#save_username", function() {
        if( $(this).prev().val().length > 7 ){
            $.post( base_url + "/reset_username", { new_username: $(this).prev().val() })
            .done( function( res ) {
                console.log( res );
                window.location.reload();
            })
            .fail( function( res ) {
                error_mess( $( '.profile_username' ), res.statusText);
            });
            
        }else {
            error_mess( $( '.profile_username' ), 'Please come up with something a bit longer (8 characters :-))' );
        } 
});
})