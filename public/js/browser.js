document.addEventListener('click', (e) => {
    // console.log(e.target.getAttribute('data-id'));
    if(e.target.classList.contains('btn-outline-success')){
        let userUpdatedItem = prompt('Enter updated value: ');
        let id = e.target.getAttribute('data-id');

        axios.post('/update-item', {text: userUpdatedItem, id})
        .then(() =>{
            location.reload();
        })
        .catch(() =>{
            console.log('Error Occured');
        });
    }
});