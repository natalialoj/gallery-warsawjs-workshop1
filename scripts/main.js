
var images = ['img/abstract01.jpg',
                'img/abstract02.jpg',
                'img/abstract03.jpg',
                'img/abstract04.jpg',
                'img/nightlife05.jpg'];

class Gallery {
    constructor(galleryEl) {
        this.$gallery = galleryEl;
        this.$area = document.querySelector('#slider');
        this.$sliderHolder = document.querySelector('#sliderHolder');
        this.$list = document.querySelector('#list');
        this.$close  = document.querySelector('#closeBtn');
        this.$content = document.querySelector('#content');
        this.$rightArrow = document.querySelector('#rightArrow');
        this.$leftArrow = document.querySelector('#leftArrow');

        this._setupEvents();
        this._toggleSlider();

        createList(images).map((value) => {
            this.$list.appendChild(value);
        });
        console.log(this.$list);
    }
    _setupEvents() {
        this.$content.addEventListener('click', this._onImgClick.bind(this));
        this.$close.addEventListener('click', this._toggleSlider.bind(this));
        this.$rightArrow.addEventListener('click', this._slideRight.bind(this));
        this.$leftArrow.addEventListener('click', this._slideLeft.bind(this));

    }
    _toggleSlider() {
        this.$area.style.display = "none";
    }
    _onImgClick(evt) {
        let $clickedElementSrc = buildImage(evt.target.src);

        this.$current = evt.target;
        this.$sliderHolder.innerHTML = "";
        this.$area.style.display = "block";
        this.$sliderHolder.appendChild($clickedElementSrc);
    }
    _slideRight() {
        let current = this.$current.getAttribute('data-index');
        //console.log(current);
        current++;
        if(current > images.length - 1)
            current = 0;

        this._setImageByIndex(current);
    }
    _slideLeft() {
        let current = this.$current.getAttribute('data-index');
        //console.log(current);
        current--;
        if (current < 0)
            current = images.length - 1;

        this._setImageByIndex(current);
    }

    _setImageByIndex(index) {
        let src = images[index];
        let pic = buildImage(src);

        pic.setAttribute('data-index', index);

        this.$current = pic;
        this.$sliderHolder.innerHTML = "";
        this.$sliderHolder.appendChild(pic);
    }
}

function buildImage(url) {
    let $image = document.createElement('img');
    $image.setAttribute('src', url);
    return $image;
}

//dynamiczne tworzenie listy
function createList(arr) {
    //funkcja zwraca tablicê
    return arr.map(function(src, index) {
        //map wykonuje funkcjê na ka¿dym elemencie tablicy
        let $listElement = document.createElement('li');
        let $smallImg = buildImage(arr[index]); //$smallImg = src <img>
        //console.log($smallImg);
        $smallImg.setAttribute('class', 'sliderHolder'); //
        $smallImg.setAttribute('data-index', index); //
        //console.log(index);
        $smallImg.setAttribute('src', src);
        //console.log($listElement);
        $listElement.appendChild($smallImg);
        return $listElement; //zwraca nowy element listy
    });
}

window.addEventListener('DOMContentLoaded', function(){
    let galleryElement = document.querySelector('#gallery');
    new Gallery(galleryElement);
});
