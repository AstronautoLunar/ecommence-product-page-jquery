
class LightBoxProduct {
    constructor({
        data,
        srcImageButtonLeft,
        srcImageButtonRight
    } = {}) {
        function createImageArray(thumbnails) {
            const elementsThumbnailArray = thumbnails.map((item, index) => {
                const arrayElementCreated = $("<img/>");

                arrayElementCreated.css({
                    "width": "15%",
                    "margin-right": 8,
                    "margin-left": 8,
                    "border-radius": 10
                })

                arrayElementCreated.attr("src", item.source);
                arrayElementCreated.attr("alt", item.alt);
                arrayElementCreated.attr("data-id", index);
    
                const [ image ] = arrayElementCreated;
                return image;
            });        
            
            return elementsThumbnailArray;
        }

        function createButton({ 
            icon, 
            positionX, 
            type 
        }) {
            const area = $("<div></div>");
            area.css({
                "width": 50,
                "height": 50,
                "background-color": "#f7f8fd",
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
                "border-radius": "100%",
                "position": "absolute",
                "top": "50%",
                "left": positionX,
                "transform": "translate(-50%, -50%)"
            });
            area.attr("data-type", type);
            area.append(icon);
            return area;
        }

        const stylesElements = {
            area: {
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "center",
                "align-items": "center"
            },
            areaCurrentImage: {
                "position": "relative"
            },
            currentElementImage: {
                "width": 400,
                "border-radius": 10
            },
            areaThumbnails: {
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
                "width": 500,
                "margin-top": 16
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
        const areaCurrentImage = $("<div></div>");
        const currentElementImage = $("<img/>");
        const areaThumbnails = $("<div/>");
        const iconLeftButton = $(`<img
            src="${ srcImageButtonLeft }"
            alt="Image Button"
        />`);
        const iconRightButton = $(`<img
            src="${ srcImageButtonRight }"
            alt="Image Button"
        />`);

        backgroundDark.css(stylesElements.backgroundDark);
        areaThumbnails.css(stylesElements.areaThumbnails);
        area.css(stylesElements.area);
        areaCurrentImage.css(stylesElements.areaCurrentImage);
        currentElementImage.css(stylesElements.currentElementImage);

        const { normal } = data[0];

        currentElementImage.attr("src", normal.source);
        currentElementImage.attr("alt", normal.alt);

        this._backgroundDark = backgroundDark;
        this._area = area;
        this._areaCurrentImage = areaCurrentImage;
        this._currentElementImage = currentElementImage;
        this._areaThumbnails = areaThumbnails;
        this._thumbnailsElements = createImageArray(thumbnails);
        this._buttonLeft = createButton({
            icon: iconLeftButton,
            positionX: "0%",
            type: "left"
        });
        this._buttonRight = createButton({
            icon: iconRightButton,
            positionX: "100%",
            type: "right"
        });

        this._indexNumber = 1;
        this._data = data;
    }

    get backgroundDark() {
        return this._backgroundDark;
    }

    get area() {
        return this._area;
    };

    get areaCurrentImage() {
        return this._areaCurrentImage;
    }

    get currentElementImage() {
        return this._currentElementImage;
    };

    get areaThumbnails() {
        return this._areaThumbnails;
    }
    
    get thumbnailsElements() {
        return this._thumbnailsElements;
    }

    get buttonLeft() {
        return this._buttonLeft;
    }

    get buttonRight() {
        return this._buttonRight;
    }

    get index() {
        return this._indexNumber;
    }

    get data() {
        return this._data;
    }

    show() {
        let {
            backgroundDark,
            area,
            areaCurrentImage,
            currentElementImage,
            areaThumbnails,
            thumbnailsElements,
            buttonLeft,
            buttonRight,
            indexNumber,
            data
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
            area.append(areaCurrentImage);
            areaCurrentImage.append(currentElementImage);
            areaCurrentImage.append(buttonLeft);
            areaCurrentImage.append(buttonRight);
            area.append(areaThumbnails);
            thumbnailsElements.forEach(item => {
                areaThumbnails.append(item);
            });

            const dataImages = data.map(item => item.normal);
            const [ image ] = currentElementImage;

            indexNumber = 0;

            thumbnailsElements.forEach(item => {
                $(item).on("click", ({ currentTarget }) => {    
                    const { id } = currentTarget.dataset;
                    const idNumber = Number(id);

                    $(currentTarget).css("filter", "brightness(1.5)");

                    image.src = dataImages[idNumber].source;
                    const elementsBrother = $(currentTarget).siblings();

                    elementsBrother.each((index, element) => (
                        $(element).css("filter", "brightness(1)")
                    ));

                    indexNumber = idNumber;
                });
            });

            buttonLeft.on("click", () => {
                indexNumber--;
                if(indexNumber < 0) {
                    indexNumber = (dataImages.length - 1);
                    image.src = dataImages[indexNumber].source;
                } else {
                    
                    image.src = dataImages[indexNumber].source;
                }
            });

            buttonRight.on("click", () => {
                indexNumber++;
                if(indexNumber >= dataImages.length) {
                    indexNumber = 0;
                    image.src = dataImages[indexNumber].source;
                } else {
                    image.src = dataImages[indexNumber].source;
                }
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