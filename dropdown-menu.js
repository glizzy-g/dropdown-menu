/**
 * @author Glizzy G <gliccy.g@outlook.com>
 * @copyright Glizzy G 2025. Freely under GPLv3.
 * 
 */

/**
 * Dropdown menu from button.
 *
 * @class DropdownMenu
 * @typedef {DropdownMenu}
 * @extends {HTMLElement}
 */
class DropdownMenu extends HTMLElement {
    /**
     * Creates an instance of DropdownButton.
     *
     * @constructor
     */
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });

        /**
         * @member {HTMLDivElement} button - The button to dropdown the menu. Note, not a HTMLButtonElement.
         * @public
         */
        this.button = document.createElement("div");
        this.button.part = "button";

        /**
         * @member {HTMLDivElement} menu - The menu dropped down.
         * @public
         */
        this.menu = document.createElement("div");
        this.menu.part = "menu";

        /**
         * @member {boolean} menuVisible - Internal tracker for menu visibility.
         * @private
         */
        this.menuVisible = false;

        this.shadow.appendChild(this.button);
        this.shadow.appendChild(this.menu);
    }

    connectedCallback() {
        this.button.style.display = "inline-block";

        let buttonSlot = document.createElement("slot");
        buttonSlot.name = "button";
        this.button.appendChild(buttonSlot);

        this.menu.style.visibility = "hidden";
        this.menu.style.position = "absolute";
        this.menu.style.border = "solid 2px black";
        this.menu.style.zIndex = "1";

        let menuSlot = document.createElement("slot");
        menuSlot.name = "menu";
        this.menu.appendChild(menuSlot);

        // Mouse events to show and hide the menu.
        this.button.addEventListener("click", (e) => {
            this.menuVisible = !this.menuVisible;
            if (this.menuVisible) {
                this.menu.style.visibility = "visible";
            } else {
                this.menu.style.visibility = "hidden";
            }
        });
        this.addEventListener("mouseenter", (e) => {
            this.menu.style.visibility = "visible";
        });
        this.addEventListener("mouseleave", (e) => {
            if (!this.menuVisible) {
                this.menu.style.visibility = "hidden";
            }
        });
    }
}

export default DropdownMenu;