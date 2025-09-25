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

        /**
         * @member {HTMLDivElement} button - The button to dropdown the menu. Note, not a HTMLButtonElement.
         * @public
         */
        this.button;
        /**
         * @member {HTMLDivElement} menu - The menu dropped down.
         * @public
         */
        this.menu;

        /**
         * @member {boolean} menuVisible - Internal tracker for menu visibility.
         * @private
         */
        this.menuVisible = false;
    }

    connectedCallback() {
        // Emulates a button.
        // Uses the first child of root as the innards of the button, if there is a child.
        this.button = document.createElement("div");
        this.button.style.display = "inline-block";

        if (this.firstElementChild) {
            this.button.appendChild(this.firstElementChild);
        }

        // Dropdown menu with some sensible styles.
        // Rest of children from root are transferred to menu.
        // Styles targeting root are passed on to menu.
        this.menu = document.createElement("div");

        this.menu.style.cssText = this.style.cssText;
        this.style.cssText = "";

        this.menu.style.visibility = "hidden";
        this.menu.style.position = "absolute";
        this.menu.style.border = "solid 2px black";
        this.menu.style.zIndex = "1";

        this.menu.innerHTML = this.innerHTML;
        this.innerHTML = "";

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

        // Append button and menu to root.
        this.appendChild(this.button);
        this.appendChild(this.menu);
    }
}

export default DropdownMenu;