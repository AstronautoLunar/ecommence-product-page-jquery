
class LightBoxProduct {
    constructor({
        data
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
                "align-items": "center",
                "margin-bottom": 50
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
                "height": "120vh",
                "display": "flex",
                "justify-content": "center",
                "align-items": "flex-end"
            },
            AreaButtonIconExit: {
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
        const iconLeftButton = $(`<svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
        `);
        const iconRightButton = $(`<svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
        `);
        const areaButtonIconExit = $("<div class='area-button-icon-exit'></div>");
        const iconExit = $(`<svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#ffffff" fill-rule="evenodd"/></svg>`);

        areaButtonIconExit.append(iconExit);

        backgroundDark.css(stylesElements.backgroundDark);
        areaThumbnails.css(stylesElements.areaThumbnails);
        area.css(stylesElements.area);
        areaCurrentImage.css(stylesElements.areaCurrentImage);
        currentElementImage.css(stylesElements.currentElementImage);
        areaButtonIconExit.css(stylesElements.AreaButtonIconExit);

        const { normal } = data[0];

        currentElementImage.attr("src", normal.source);
        currentElementImage.attr("alt", normal.alt);

        this._backgroundDark = backgroundDark;
        this._area = area;
        this._areaCurrentImage = areaCurrentImage;
        this._currentElementImage = currentElementImage;
        this._areaThumbnails = areaThumbnails;
        this._divThumbnailsElements = createThumbnailArray(thumbnails);
        this._buttonLeft = createButton({
            icon: iconLeftButton,
            positionX: "0%",
            type: "left"
        });
        this._iconLeftButton = iconLeftButton;
        this._buttonRight = createButton({
            icon: iconRightButton,
            positionX: "100%",
            type: "right"
        });
        this._iconRightButton = iconRightButton;
        this._indexNumber = 1;
        this._data = data;
        this._areaButtonIconExit = areaButtonIconExit;
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
    
    get divThumbnailsElements() {
        return this._divThumbnailsElements;
    }

    get buttonLeft() {
        return this._buttonLeft;
    }

    get iconLeftButton() {
        return this._iconLeftButton;
    }

    get buttonRight() {
        return this._buttonRight;
    }

    get iconRightButton() {
        return this._iconRightButton;
    }

    get index() {
        return this._indexNumber;
    }

    get data() {
        return this._data;
    }

    get areaButtonIconExit() {
        return this._areaButtonIconExit;
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
            divThumbnailsElements,
            buttonLeft,
            iconLeftButton,
            buttonRight,
            iconRightButton,
            indexNumber,
            data,
            areaButtonIconExit,
            iconExit
        } = this;

        function mountLightBox({
            backgroundDark,
            area,
            currentElementImage,
            areaThumbnails,
            divThumbnailsElements
        }) {
            $("body").append(backgroundDark);
            backgroundDark.append(area);
            area.append(areaButtonIconExit);
            area.append(areaCurrentImage);
            areaCurrentImage.append(currentElementImage);
            areaCurrentImage.append(buttonLeft);
            areaCurrentImage.append(buttonRight);
            area.append(areaThumbnails);
            divThumbnailsElements.forEach(item => {
                areaThumbnails.append(item);
            });

            const dataImages = data.map(item => item.normal);
            const [ image ] = currentElementImage;

            indexNumber = 0;

            divThumbnailsElements.forEach(item => {
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

            function styleSvg({ 
                svg, 
                areaOfSvg 
            }) {
                const [ path ] = svg.children()

                areaOfSvg.mouseenter( () => {
                    $(path).css("stroke", "#ff7d1a")
                });

                areaOfSvg.mouseleave( () => {
                    $(path).css("stroke", "#1D2026")
                });
            }

            styleSvg({
                svg: iconLeftButton,
                areaOfSvg: buttonLeft
            });

            styleSvg({
                svg: iconRightButton,
                areaOfSvg: buttonRight
            });

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

            const [ path ] = iconExit.children();
            const [ elementPureButtonIcon ] = areaButtonIconExit;

            elementPureButtonIcon.addEventListener('mouseenter', () => {
                $(path).css("fill", "#ff7d1a");
            }, true);

            elementPureButtonIcon.addEventListener('mouseleave', () => {
                $(path).css("fill", "#f7f8fd");
            }, true);

            $(elementPureButtonIcon).click(() => {
                $("body > div").remove(".background-dark");

                $(path).css("fill", "#f7f8fd");
            })
        }

        mountLightBox({
            backgroundDark,
            area,
            currentElementImage,
            areaThumbnails,
            divThumbnailsElements
        });
    }
};