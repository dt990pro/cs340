function updateweapon(pwid){
    $.ajax({
        url: '/page/' + pwid,
        type: 'PUT',
        data: $('#update-weapon').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};