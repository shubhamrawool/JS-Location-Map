export class Modal {
    constructor(contentId, fallbackText){
        this.modalContentEl = document.getElementById(contentId);
        this.mainModalEl = document.getElementById('modal-template');
        this.fallbackText = fallbackText;
    }

    show(){
        const modalElements = document.importNode(this.mainModalEl.content, true);
        const contentEl = document.importNode(this.modalContentEl.content, true);
        this.modalDiv = modalElements.querySelector('.modal');
        this.backDropDiv = modalElements.querySelector('.backdrop');

        this.modalDiv.appendChild(contentEl);

        document.body.insertAdjacentElement('afterbegin', this.modalDiv);
        document.body.insertAdjacentElement('afterbegin', this.backDropDiv);
    }

    hide(){
        document.body.removeChild(this.modalDiv);
        document.body.removeChild(this.backDropDiv);
        this.modalDiv = null;
        this.backDropDiv = null;
    }
}