const cardList = [
    {
        title: "Inferno",
        image: "images/cs_inferno.jpg",
        link: "https://counterstrike.fandom.com/wiki/Inferno",
        description: "Inferno (de_inferno), is a bomb defusal map featured in the Counter-Strike series."
    },
    {
        title: "Overpass",
        image: "images/cs_overpass.jpg",
        link: "https://counterstrike.fandom.com/wiki/Overpass",
        description: "Overpass (de_overpass) is a Bomb Defusal map for Counter-Strike: Global Offensive & Counter-Strike 2, released in the Winter Offensive update along with the map Cobblestone."
    }
];

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '</span><p><a href="' + item.link + '">About this map</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '</span>' +
            '<p class="card-text black-text">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
}

const addComments = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col-8">' +
            '<div class="card card-white post">' +
            '<div class="post-heading"><a><b>' + item.first_name + item.last_name + '</b></a></div>' +
            '<div class="post-description"><p>' + item.message + '</p>' +
            '</div></div></div>';
        $("#card-comment").append(itemToAppend);
    });
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.email = $('#email').val();
    formData.message = $('#message').val(),

        console.log("Form Data Submitted: ", formData);
    postComment(formData);
}

function postComment(comment) {
    $.ajax({
        url: '/api/comment',
        type: 'POST',
        data: comment,
        success: (result) => {
            if (result.statusCode === 201) {
                // Close the modal
                const modal = M.Modal.getInstance($('#modal1'));
                modal.close();

                alert('Comment Post Successful');

                //Reload page after success
                location.reload();
            }
        }
    });
}

function getAllComments() {
    $.get('/api/comments', (response) => {
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addComments(response.data);
        }
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })

    $('.modal').modal();
    addCards(cardList);
    getAllComments();
});
