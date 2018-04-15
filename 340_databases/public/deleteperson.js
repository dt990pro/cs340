function deletePerson(pwid){
    $.ajax({
        url: '/page/' + pwid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};