const areaPresentationProduct = $("#area-presentation-product");
const areaThumbnails = $('<div id="area-thumbnails-products"></div>');
const imageCurrentProduct = $('<img id="current-image"/>');

let currentImageProduct = "";
let imagesProducts = [
    {
        thumbnail: {
            source: "./assets/images/image-product-1-thumbnail.jpg",
            alt: "thumbnail image produto 1",
            selected: true
        },
        normal: {
            source: "./assets/images/image-product-1.jpg",
            alt: "image produto 1"
        }
    },
    {
        thumbnail: {
            source: "./assets/images/image-product-2-thumbnail.jpg",
            alt: "thumbnail image produto 2",
            selected: false
        },
        normal: {
            source: "./assets/images/image-product-2.jpg",
            alt: "image produto 2"
        }
    },
    {
        thumbnail: {
            source: "./assets/images/image-product-3-thumbnail.jpg",
            alt: "thumbnail image produto 3",
            selected: false
        },
        normal: {
            source: "./assets/images/image-product-3.jpg",
            alt: "image produto 3"
        }
    },
    {
        thumbnail: {
            source: "./assets/images/image-product-4-thumbnail.jpg",
            alt: "thumbnail image produto 4",
            selected: false
        },
        normal: {
            source: "./assets/images/image-product-4.jpg",
            alt: "image produto 4"
        }
    },
];

const imagesInHTML = imagesProducts.map((item, index) => {
    const { 
        source, 
        alt,
        selected
    } = item.thumbnail;

    return (
        `<img
            class="image-thumbnail-product"
            src="${source}"
            alt="${alt}"
            data-id="${index}"
            data-selected="${selected}"
        />`
        )
    });
    
areaThumbnails.appendTo(areaPresentationProduct);

imagesInHTML.forEach(item => (
    areaThumbnails.append(item)
));

function loadImageCurrentProduct(id) {
    currentImageProduct = imagesProducts[id].normal;

    imageCurrentProduct.attr("src", currentImageProduct.source);
    imageCurrentProduct.attr("alt", currentImageProduct.alt);

    areaPresentationProduct.prepend(imageCurrentProduct);
}


const imagesRendered = $(".image-thumbnail-product");
imagesRendered.click(({ target }) => {
    const { selected } = target.dataset;

    switch(selected) {
        case "true":
            target.dataset.selected = "false";
            break;
        case "false":
            target.dataset.selected = "true";
            break;
        default:
    }

    const arrayElementsBrothers = [ ...$(target).siblings() ];

    arrayElementsBrothers.forEach(item => {
        item.dataset.selected = false;
    });

    const arrayThumbnails = [ ...imagesRendered ];

    arrayThumbnails.forEach(item => {
        const { 
            selected, 
            id 
        } = item.dataset;

        if(selected === "true") {
            loadImageCurrentProduct(id);
        }

    });
});

// Ao carregar a página
imagesProducts.forEach((item, index) => {
    const { selected } = item.thumbnail;

    if(selected) {
        loadImageCurrentProduct(index);
    }
});

// LightBox

class LightBoxProduct {
    constructor({
        thumbnails
    } = {}) {
        function createThumbnailElements({
            thumbnails = [],
            element
        }) {
            const arrayFull = [];

            const elementsThumbnailArray = thumbnails.map((item, index) => {
                const { 
                    thumbnail
                } = item;

                element.attr("src", thumbnail.source);
                element.attr("alt", thumbnail.alt);
                element.attr("data-id", index);

                return [ ...element ];
            });

            elementsThumbnailArray.forEach(item => {
                arrayFull.push(...item);
            })

            return arrayFull;
        }

        const stylesElements = {
            area: {
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "center",
                "align-items": "center"
            },
            currentElementImage: {
                "width": "300"
            },
            areaThumbnails: {
                "display": "flex",
                "justify-content": "space-around",
                "align-items": "center"
            },
            backgroundDark: {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "background-color": "rgba(29, 32, 37, 0.5)",
                "width": "100%",
                "height": "103vh",
                "display": "flex",
                "justify-content": "center",
                "align-items": "center"
            }
        }

        const backgroundDark = $("<div></div>");
        const area = $("<div></div>");
        const currentElementImage = $("<img/>");
        const areaThumbnails = $("<div/>");
        const thumbnailElement = $("<img/>");
        
        backgroundDark.css(stylesElements.backgroundDark);
        areaThumbnails.css(stylesElements.areaThumbnails);
        area.css(stylesElements.area);
        currentElementImage.css(stylesElements.currentElementImage);

        const { normal } = thumbnails[0];

        currentElementImage.attr("src", normal.source);
        currentElementImage.attr("alt", normal.alt);

        this._backgroundDark = backgroundDark;
        this._area = area;
        this._currentElementImage = currentElementImage;
        this._areaThumbnails = areaThumbnails;
        this._thumbnailsElements = createThumbnailElements({
            thumbnails,
            element: thumbnailElement
        });
    }

    get backgroundDark() {
        return this._backgroundDark;
    }

    get area() {
        return this._area;
    };

    get currentElementImage() {
        return this._currentElementImage;
    };

    get areaThumbnails() {
        return this._areaThumbnails;
    }
    
    get thumbnailsElements() {
        return this._thumbnailsElements;
    }

    show() {
        const {
            backgroundDark,
            area,
            currentElementImage,
            areaThumbnails,
            thumbnailsElements
        } = this;

        function mountLightBox({
            backgroundDark,
            area,
            currentElementImage,
            areaThumbnails,
            thumbnailsElements
        }) {
            $("body").append(backgroundDark);
            backgroundDark.append(area);
            area.append(currentElementImage);
            area.append(areaThumbnails);
            thumbnailsElements.forEach(item => {
                areaThumbnails.append(item);
                console.log(item);
            });
        }

        mountLightBox({
            backgroundDark,
            area,
            currentElementImage,
            areaThumbnails,
            thumbnailsElements
        });


    }
};

const lightbox = new LightBoxProduct({
    thumbnails: imagesProducts
});

imageCurrentProduct.click(() => {
    lightbox.show();
});