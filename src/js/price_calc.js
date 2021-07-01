//this is the calculator class which is responsible for converting the price

export class price_calc {
    constructor() {
        this.prices = {
            products: 0.5,
            orders: 0.25,
            accounting: 35,
            terminal: 5,
            package: {
                basic: 0,
                professional: 25,
                premium: 60
            }
        }

        //for eventListeners
        this.form = {
            products: document.querySelector("#products"),
            orders: document.querySelector("#orders"),
            package: document.querySelector("#package"),
            accounting: document.querySelector("#accounting"),
            terminal: document.querySelector("#terminal"),
            select: document.querySelectorAll("#packages__list li")
        }

        //for price summaries
        this.summary = {
            list: document.querySelector("#calc__pricesList"),
            products: document.querySelector("#products__summary"),
            orders: document.querySelector("#orders__summary"),
            package: document.querySelector("#package__summary"),
            accounting: document.querySelector("#accounting__summary"),
            terminal: document.querySelector("#terminal__summary"),
            total: document.querySelector("#total-price")
        }
    }

    // displaying the final price
    update_total() {

        //checking the pricing elements
        const show = document.querySelectorAll(" #calc__pricesList .open").length > 0
        if (show) {
            this.summary.total.classList.add("open")

            //sum of all
            const productSum = this.form.products.value < 0 ? 0 : this.form.products.value * this.prices.products;
            const ordersSum = this.form.orders.value < 0 ? 0 : this.form.orders.value * this.prices.orders;
            const packagePrice = this.form.package.dataset.value.length === 0 ? 0 : this.prices.package[this.form.package.dataset.value];
            const accounting = this.form.accounting.checked ? this.prices.accounting : 0;
            const terminal = this.form.terminal.checked ? this.prices.terminal : 0;

            const final_price = this.summary.total.lastElementChild

            //final price
            final_price.innerText = "$" + (productSum + ordersSum + packagePrice + accounting + terminal)

        } else {
            //if the user has not entered anything, do not display the final price
            this.summary.total.classList.remove("open")
        }
    }

    //updating single price
    // params //
    // id --> id on the basis of which an element is retrieved from dom
    // calc --> price calc (5 * $10*)
    // total -->  final summary
    update_summary(id, calc, total) {
        const summary = this.summary.list.querySelector("#" + id);
        const summaryCalc = summary.querySelector(".item__calc");
        const summaryTotal = summary.querySelector(".item__price");

        //price calc
        if (summaryCalc !== null) {
            summaryCalc.innerText = calc;
        }

        //final summary
        summaryTotal.innerText = "$" + total;

    }

    // updating single product
    // params //
    // type --> for addEventListener
    update_product(type) {
        this.form.products.addEventListener(type, (e) => {
            const value = e.target.valueAsNumber

            //show only when value is bigger than 0
            if (isNaN(value) === false && value > 0) {
                const calc_price = `${value} * ${this.prices.products}`
                const final_price = value * this.prices.products
                this.update_summary("products__summary", calc_price, final_price)
                this.summary.products.classList.add("open")
            }

            // else hide
            if (isNaN(value)) {
                this.summary.products.classList.remove("open")
            }

            //updating total
            this.update_total()
        })
    }

    // just like above but for orders
    update_orders(type) {
        this.form.orders.addEventListener(type, (e) => {
            const value = e.target.valueAsNumber
            if (isNaN(value) === false && value > 0) {

                const calc_price = `${value} * ${this.prices.orders}`
                const final_price = value * this.prices.orders

                this.update_summary("orders__summary", calc_price, final_price)
                this.summary.orders.classList.add("open")
            }
            if (isNaN(value)) {
                this.summary.orders.classList.remove("open")
            }
            this.update_total()
        })
    }

    // for accounting checkbox
    checkboxAccounting() {
        this.form.accounting.addEventListener("change", (e) => {
            const checked = e.currentTarget.checked;

            //show summary only when checked
            if (checked) {
                this.summary.accounting.classList.add("open")
                this.update_summary("accounting__summary", "", this.prices.accounting)
                ;
            }

            // else hide
            else {
                this.summary.accounting.classList.remove("open")
            }

            // updating total
            this.update_total()
        })
    }

    // just like above
    checkboxTerminal() {
        this.form.terminal.addEventListener("change", (e) => {
            const checked = e.currentTarget.checked;
            if (checked) {
                this.summary.terminal.classList.add("open")
                this.update_summary("terminal__summary", "", this.prices.terminal)
                ;
            } else {
                this.summary.terminal.classList.remove("open")
            }
            this.update_total()
        })

    }

    // selecting packages
    selectPackage() {
        this.form.package.addEventListener("click", (e) => {

                // when the user click selection bar, then show list with packages
                this.form.package.classList.toggle("open")

                // add package only when its not undefined
                if (e.target.dataset.value !== undefined) {
                    const text = e.target.dataset.value
                    this.form.package.dataset.value = text
                    this.form.package.firstElementChild.innerText = text
                    this.summary.package.classList.add("open")
                    this.update_summary("package__summary", text, this.prices.package[text])
                }

               // if the user selected a package and pressed again, delete it
                else {
                    this.summary.package.classList.remove("open")
                    this.form.package.firstElementChild.innerText = "Choose package"
                }
                this.update_total()
            }
        )
    }

    //initialization of the above functions
    initEvents() {
        this.update_product("change")
        this.update_product("keyup")
        this.update_orders("change")
        this.update_orders("keyup")
        this.checkboxAccounting()
        this.checkboxTerminal()
        this.selectPackage()
    }
}




