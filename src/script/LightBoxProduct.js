
class LightBoxProduct {
    constructor({
        data
    } = {}) {
        function createImageArray(thumbnails) {
            const elementsThumbnailArray = thumbnails.map((item, index) => {
                const arrayElementCreated = $("<img/>");
    
                arrayElementCreated.attr("src", item.source);
                arrayElementCreated.attr("alt", item.alt);
                arrayElementCreated.attr("data-id", index);
    
                const [ image ] = arrayElementCreated;
                return image;
            });        
            
            return elementsThumbnailArray;
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

        const thumbnails = data.map(item => item.thumbnail);

        const backgroundDark = $("<div></div>");
        const area = $("<div></div>");
        const currentElementImage = $("<img/>");
        const areaThumbnails = $("<div/>");
        
        backgroundDark.css(stylesElements.backgroundDark);
        areaThumbnails.css(stylesElements.areaThumbnails);
        area.css(stylesElements.area);
        currentElementImage.css(stylesElements.currentElementImage);

        const { normal } = data[0];

        currentElementImage.attr("src", normal.source);
        currentElementImage.attr("alt", normal.alt);

        this._backgroundDark = backgroundDark;
        this._area = area;
        this._currentElementImage = currentElementImage;
        this._areaThumbnails = areaThumbnails;
        this._thumbnailsElements = createImageArray(thumbnails)
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