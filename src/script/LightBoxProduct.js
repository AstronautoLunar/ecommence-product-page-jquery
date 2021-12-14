
class LightBoxProduct {
    constructor({
        data,
        srcImageButtonLeft,
        srcImageButtonRight,
        srcImageExit
    } = {}) {
        function createThumbnailArray(thumbnails) {
            const elementsThumbnailArray = thumbnails.map((item, index) => {
                const arrayElementCreated = $("<img/>");
                const areaElementCreated = $("<div class='area-thumbnail'>");

                arrayElementCreated.css({
                    "width": "100%",
                    "border-radius": "inherit",
                    "transition": "opacity 500ms"
                });
                
                areaElementCreated.css({
                    "width": "15%",
                    "margin-right": 8,
                    "margin-left": 8,
                    "border-radius": 10,
                    "background-color": "#fff",
                    "display": "flex",
                    "justify-content": "center",
                    "align-items": "center"
                });

                arrayElementCreated.attr("src", item.source);
                arrayElementCreated.attr("alt", item.alt);
                arrayElementCreated.attr("data-id", index);
    
                areaElementCreated.append(arrayElementCreated);
                const [ area ] = areaElementCreated;
                
                
                return area;
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
            },
            iconExit: {
                "margin-bottom": 16,
                "margin-right": 48,
                "align-self": "end"
            }
        }

        const thumbnails = data.map(item => item.thumbnail);

        const backgroundDark = $("<div class='background-dark'></div>");
        const area = $("<div class='area'></div>");
        const areaCurrentImage = $("<div class='area-current-image'></div>");
        const currentElementImage = $("<img class='current-element-image'/>");
        const areaThumbnails = $("<div class='area-thumbnails'/>");
        const iconLeftButton = $(`<img
            class="icon-left-button"
            src="${ srcImageButtonLeft }"
            alt="Image Button"
        />`);
        const iconRightButton = $(`<img
            class="icon-right-button"
            src="${ srcImageButtonRight }"
            alt="Image Button"
        />`);
        const iconExit = $(`<img
            class="icon-exit"
            src="${srcImageExit}"
            alt="image exit"
        />`)

        backgroundDark.css(stylesElements.backgroundDark);
        areaThumbnails.css(stylesElements.areaThumbnails);
        area.css(stylesElements.area);
        areaCurrentImage.css(stylesElements.areaCurrentImage);
        currentElementImage.css(stylesElements.currentElementImage);
        iconExit.css(stylesElements.iconExit);

        const { normal } = data[0];

        currentElementImage.attr("src", normal.source);
        currentElementImage.attr("alt", normal.alt);

        this._backgroundDark = backgroundDark;
        this._area = area;
        this._areaCurrentImage = areaCurrentImage;
        this._currentElementImage = currentElementImage;
        this._areaThumbnails = areaThumbnails;
        this._thumbnailsElements = createThumbnailArray(thumbnails);
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
        this._iconExit = iconExit;
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

    get iconExit() {
        return this._iconExit;
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
            data,
            iconExit
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
            area.append(iconExit);
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
                    const [ thumbnail ] = currentTarget.children;
                    const { id } = thumbnail.dataset;
                    const idNumber = Number(id);

                    $(currentTarget).css("border", "2px solid var(--orange)");
                    $(thumbnail).css("opacity", 0.5);

                    image.src = dataImages[idNumber].source;
                    const elementsBrother = $(currentTarget).siblings();

                    elementsBrother.each((index, element) => {
                        const [ thumbnail ] = element.children;
                        
                        $(element).css("border", "none");
                        $(thumbnail).css("opacity", 1)
                    });

                    indexNumber = idNumber;
                });
            });

            function selectedThumbnailsForStyle(indexSelected) {
                const areaThumbnails = $(".area-thumbnail");

                areaThumbnails.each((index, item) => {
                    if(indexSelected === index) {
                        styleThumbnail({
                            item,
                            type: "selected"
                        });
                    } else {
                        styleThumbnail({
                            item,
                            type: "notSelected"
                        });
                    }
                });

                function styleThumbnail({ 
                    item, 
                    type 
                }) {
                    const [ image ]= item.children;

                    switch(type) {
                        case "selected":
                            $(item).css("border", "2px solid var(--orange)");
                            $(image).css("opacity", 0.5);
                            
                            break;
                        case "notSelected":
                            $(item).css("border", "none");
                            $(image).css("opacity", 1);

                            break;
                        default:
                            throw new Error("Invalidate Type");
                    }
                    
                }
            }
            
            function setImage(index) {
                image.src = dataImages[index].source;
            }

            selectedThumbnailsForStyle(indexNumber);

            buttonLeft.on("click", () => {
                indexNumber--;

                
                if(indexNumber < 0) {
                    indexNumber = (dataImages.length - 1);
                    setImage(indexNumber);
                    
                    selectedThumbnailsForStyle(indexNumber);
                } else {
                    setImage(indexNumber);
                    
                    selectedThumbnailsForStyle(indexNumber);
                }
            });

            buttonRight.on("click", () => {
                indexNumber++;

                
                if(indexNumber >= dataImages.length) {
                    indexNumber = 0;
                    setImage(indexNumber);

                    selectedThumbnailsForStyle(indexNumber);
                } else {
                    setImage(indexNumber);
                    
                    selectedThumbnailsForStyle(indexNumber);
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