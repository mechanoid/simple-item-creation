class MagicForm extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.form = this.querySelector('form')
    if(!this.form) { throw new Error('no form') }

    const targetSelector = this.getAttribute('target')
    const target = document.querySelector(targetSelector)

    this.form?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = serializeForm(this.form)

      const path = this.form.getAttribute('action')
      const method = this.form.getAttribute('method') || 'GET'

      const response = await fetch(path, {
        headers: {
          'Content-Type': 'application/json',
          "Is-Fetch-Request": true

        },
        method,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('could not create new item!')
      }

      const result = await response.text()

      target.insertAdjacentHTML("afterbegin",`<li>${result}</li>`)
    })
  }
}

customElements.define('magic-form', MagicForm)


function serializeForm (form) {
	const obj = {};
	const formData = new FormData(form);

  for (const key of formData.keys()) {
		obj[key] = formData.get(key);
	}

	return obj;
};
