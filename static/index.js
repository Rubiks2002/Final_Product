$(document).ready(function(){
    let clothingData, schoolData;

    $.ajax({
        url:'http://localhost:5990/data',
        success: function(data){
            clothingData = JSON.parse(data)
            loadSchool('frisco')
            console.log('loaded database')
        },
        error: function(error){
            console.log('error', error)
        }
    });

    function setSchoolData (schoolKey) { 
        schoolData = clothingData[schoolKey]
    };

    function loadSchool (schoolKey) {
        setSchoolData(schoolKey)
        loadCategory('T-Shirts')
    }

    function loadCategory (category){
        $('.main-content').empty()
        console.log('emptied')
        schoolData[category].forEach(appendCard);
    }

    function appendCard (item) {
        $('.main-content').append(`
            <div class="card col-sm-12 col-md-6 col-lg-4 col-xl-3" style="width: 18rem;">
                <img src="${item.img_src}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title"> ${item.title}</h5>
                    <p class="card-text"> ${item.price} </p>
                    <a href="${ item.url }" class="btn btn-primary" target="_blank">View Product</a>
                </div>
            </div>
        `)
    }

    $('.dropdown-item').click(function(){
        console.log('yay')
        loadSchool($(this).attr('id'))
    })

    $('.category').click(function(){
        console.log($(this).attr('id'))
        loadCategory($(this).attr('id'))
    })

})

