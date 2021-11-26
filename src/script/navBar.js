const listNavBar = $("#list-items-navBar");

const data = [
    "Collections",
    "Men",
    "Women",
    "About",
    "Contact"
];

const itemsArrayHTML = data.map(item => (
    `
        <li class="item-navBar">
            <a href="#">
                ${ item }
            </a>
        </li>
    `
));

const itemsHTML = itemsArrayHTML.join("");

listNavBar.append(itemsHTML);