const areaPresentationProduct = $("#area-presentation-product");
const areaThumbnails = $('<ul id="area-thumbnails-products"></ul>');
const imageCurrentProduct = $('<img id="current-image"/>');
const areaImageCurrentProduct = $("<div id='area-image-current-product'></div>");
let currentImageProduct = "";

let imagesInHTML;

function createThumbnailsOfMain() {
    imagesInHTML = imagesProducts.map((item, index) => {
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
    });
}

function renderThumbnailsOfMain() {
    imagesInHTML.forEach(item => (
        areaThumbnails.append(item)
    ));
}

function loadImageCurrentProduct(id) {
    currentImageProduct = imagesProducts[id].normal;

    imageCurrentProduct.attr("src", currentImageProduct.source);
    imageCurrentProduct.attr("alt", currentImageProduct.alt);

    areaImageCurrentProduct.append(imageCurrentProduct);
    areaPresentationProduct.prepend(areaImageCurrentProduct);
}

function addEventForThumbnails() {
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
}

function loadSelectCurrentImagePage() {
    imagesProducts.forEach((item, index) => {
        const { selected } = item.thumbnail;
    
        if(selected) {
            loadImageCurrentProduct(index);
        }
    });
}

function renderLightBoxProduct() {
    const lightbox = new LightBoxProduct({
        data: imagesProducts
    });
    
    imageCurrentProduct.click(() => {
        lightbox.show();
    });
}

createThumbnailsOfMain();
areaThumbnails.appendTo(areaPresentationProduct);
renderThumbnailsOfMain();
addEventForThumbnails();
loadSelectCurrentImagePage();
renderLightBoxProduct();