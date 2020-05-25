$(document).ready(function () {


    $('.devour').on('click', function (event) {
        event.preventDefault();
        console.log(event)
        console.log(this);

        var id = $(this).data('value');
        var newEatState = {
            devoured: true
        };

        console.log('burger id', id);
        $.ajax('/burgers/update/', {
            type: 'PUT',
            data: newEatState
        }).then(function () {

            console.log('changed to', newEatState);
            location.reload();
        })
    })

    $('.create-form').on('submit', function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $('#createBurger').val().trim(),
            devoured: 0
        };
        $.ajax('/burgers/create', {
            type: 'POST',
            data: newBurger
        }).then(
            function () {
                console.log('Created Burger');
                location.reload()
            }
        )
    })




});