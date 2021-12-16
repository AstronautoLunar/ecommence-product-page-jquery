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
})

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

const lightbox = new LightBoxProduct({
    data: imagesProducts,
    srcImageButtonLeft: "./assets/images/icon-previous.svg",
    srcImageButtonRight: "./assets/images/icon-next.svg"
});

imageCurrentProduct.click(() => {
    lightbox.show();
});