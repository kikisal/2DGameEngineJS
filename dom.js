const elementStock = [
    {
        name: 'time-box',
        build: () => {
            const el = document.createElement('div');
            el.classList.add('time-box');
            const span = document.createElement('span');
            el.appendChild(span);

            el.ref_textElement = span;

            return el;
        }
    }
];

function getElementTemplate(el_name) {
    for (const e of elementStock)
    {
        if (e.name == el_name)
            return e;
    }
    return null;
}

function createElement(el_name) {
    const template = getElementTemplate(el_name);
    if (!template)
        return null;

    return document.body.appendChild(template.build());
}


function createTimeBox() {
    return {
        time: 0,
        delta: 0,
        element: createElement('time-box'),
        setTime: function(time) {
            this.time = time;
        },

        show: function() {
            //  this.element.ref_textElement.innerText = ``;
            this.element.ref_textElement.innerText = `${formatNumber(this.time)}s : ${formatNumber(this.delta)}s`;
        },

        setDelta: function(delta) {
            this.delta = delta;
        },

        update: function () {
            this.show();
        }
    };
}


function formatNumber(x) {
    const t = parseInt(x);
    return t + `.${x-t}`.substring(2, 4);    
} 
