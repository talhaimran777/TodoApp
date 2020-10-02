document.addEventListener('click', (e) => {
    // console.log(e.target.getAttribute('data-id'));
    if(e.target.classList.contains('btn-outline-success')){
        let userUpdatedItem = prompt('Enter updated value: ');
        if(userUpdatedItem != null){
            
            let id = e.target.getAttribute('data-id');
            axios.post('/update-item', {text: userUpdatedItem, id})
            .then(() =>{
                // Reloading Browser
                location.reload();
            })
            .catch(() =>{
                console.log('Error Occured');
            });

        }
    }
    else if(e.target.classList.contains('btn-outline-danger')){
        let id = e.target.getAttribute('data-id');
        console.log("ID To be deleted: " + id);
        axios.post('/delete-item', {id: id})
        .then(() =>{
            // Reloading Browser
            location.reload();
        })
        .catch(() =>{
            console.log('Error Occured');
        });
    }
});