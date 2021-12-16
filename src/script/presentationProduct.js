const areaPresentationProduct = $("#area-presentation-product");
const areaThumbnails = $('<ul id="area-thumbnails-products"></ul>');
const imageCurrentProduct = $('<img id="current-image"/>');
const areaImageCurrentProduct = $("<div id='area-image-current-product'></div>");

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
        `<li class="item-thumbnail">
            <img
                class="image-thumbnail-product"
                src="${source}"
                alt="${alt}"
                data-id="${index}"
                data-selected="${selected}"
            />
        </li>`
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

    areaImageCurrentProduct.append(imageCurrentProduct);
    areaPresentationProduct.prepend(areaImageCurrentProduct);
}


const thumbnailsItems = $(".item-thumbnail");

thumbnailsItems.click(({ 
    target, 
    currentTarget 
}) => {
    const { selected } = target.dataset;

    $(currentTarget).css("border", "2px solid var(--orange)");

    switch(selected) {
        case "true":
            target.dataset.selected = "false";
            break;
        case "false":
            target.dataset.selected = "true";
            break;
        default:
    }

    const parent = $(target).parent();

    const arrayElementsBrothers = [ ...parent.siblings() ];

    arrayElementsBrothers.forEach(item => {
        const [ img ] = $(item).children();

        $(item).css("border", "none");

        img.dataset.selected = false;
    });

    const arrayThumbnailsItems = [ ...thumbnailsItems ];

    arrayThumbnailsItems.forEach(item => {
        const [ image ] = $(item).children();

        const { 
            selected, 
            id 
        } = image.dataset;

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
    data: imagesProducts
});

imageCurrentProduct.click(() => {
    lightbox.show();
});