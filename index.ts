document.addEventListener("DOMContentLoaded", function () {
    const main = document.getElementById("main") as HTMLElement;
    const theme = localStorage.getItem("theme");
    console.log(`theme class is : ${theme}`);
    main.className = theme ? theme : "theme_light";

    class Calculate {
        currentValue: string;
        display: HTMLInputElement;

        constructor() {
            this.currentValue = '';
            this.display = document.getElementById("spanOutput") as HTMLInputElement;
        }

        evaluate(currentValue: string): string {
            try {
                // Replace the shorthand scientific notation 'e' to 'Math.pow(10, exponent)' form
                currentValue = currentValue.replace(/(\d)e([+-]?\d+)/g, function (_, base, exponent) {
                    return `${base} * Math.pow(10, ${exponent})`;
                });

                // Replace other function names and constants for evaluation
                currentValue = currentValue.replace("log", "Math.log");
                currentValue = currentValue.replace("π", Math.PI.toString());
                currentValue = currentValue.replace("e", Math.E.toString());

                const result = eval(currentValue);
                if (isNaN(result) || result === undefined) {
                    return "Error";
                }
                return result.toString();
            } catch (err) {
                console.error("Evaluation error: ", err);
                return "Error";
            }
        }

        canNotDivide(currentValue: string): string {
            let i = currentValue.includes('/0');
            if (i) {
                return 'Infinity';
            } else {
                return '';
            }
        }

        factorial(n: number): string {
            if (n < 0) return "Error";
            let result = 1;
            for (let i = 1; i <= n; i++) {
                result *= i;
            }
            return result.toString();
        }

        sqrt(currentValue: string): string {
            let num = parseFloat(currentValue);
            return num >= 0 ? Math.sqrt(num).toString() : "Invalid Input";
        }

        power(currentValue: string): string {
            let values = currentValue.split("^");
            if (values.length === 2) {
                let base = parseFloat(values[0]);
                let exponent = parseFloat(values[1]);
                if (!isNaN(base) && !isNaN(exponent)) {
                    return Math.pow(base, exponent).toString();
                }
            }
            return "Invalid Format";
        }

        append(value: string): void {
            if (value === "π") {
                this.currentValue += Math.PI.toString();
            } else if (this.display.value === "0" && value !== ".") {
                this.currentValue = value;
            } else {
                this.currentValue += value;
            }
            this.updateScreen();
        }

        private updateScreen(): void {
            this.display.value = this.currentValue;
        }

        delete(): void {
            this.currentValue = this.currentValue.slice(0, -1);
            this.updateScreen();
        }

        clear(): void {
            this.currentValue = "";
            this.updateScreen();
        }
    }

    const evaluate = new Calculate();
    const display = document.getElementById("spanOutput") as HTMLInputElement;
    let currentValue: string = "";

    document.addEventListener("keydown", (event: KeyboardEvent) => {
        const key = event.key;

        if (!isNaN(Number(key)) || "+-*/().".includes(key)) {
            evaluate.append(key);
        }
        else if (key.toLowerCase() === "p") {
            evaluate.append("π");
        }
        else if (key === "Enter") {
            currentValue = evaluate.evaluate(currentValue);
            display.value = currentValue;
        } else if (key === "Backspace") {
            evaluate.delete();
        } else if (key === "Escape") {
            evaluate.clear();
        }
    });

    const toggleButtons = document.querySelector(".nd_main") as HTMLElement;
    toggleButtons.addEventListener('click', () => {
        const toggle = document.querySelectorAll(".nd_change");

        toggle.forEach((e) => {
            if ((e as HTMLElement).style.display === "none") {
                (e as HTMLElement).style.display = "block";
            } else {
                (e as HTMLElement).style.display = 'none';
            }
        });

        const target = document.querySelectorAll(".nd");
        target.forEach((e) => {
            if ((e as HTMLElement).style.display === "block") {
                (e as HTMLElement).style.display = "none";
            } else {
                (e as HTMLElement).style.display = 'block';
            }
        });
    });

    const buttons = document.getElementsByClassName("btn");

    const redian = document.getElementById('redian') as HTMLElement;
    let redFlage: number = 0;
    redian.addEventListener('click', function () {
        if (redFlage == 0) {
            redFlage = 1;
            redian.innerHTML = "Deg"; // Display "Deg" when flag is 1
        } else {
            redFlage = 0;
            redian.innerHTML = "Red"; // Display "Red" when flag is 0
        }
    });

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i] as HTMLElement;
        button.addEventListener("click", function () {
            const value = button.innerText.trim();

            // Handle special cases like CE, . (decimal point), etc.
            if (value == "CE") {
                currentValue = "";
                display.value = currentValue;
            } else if (value == ".") {
                if (!currentValue.includes('.')) {
                    currentValue += value;
                    display.value = currentValue;
                }
            } else if (value == "=") {
                if (currentValue.includes("^")) {
                    currentValue = evaluate.power(currentValue);
                } else {
                    currentValue = evaluate.evaluate(currentValue);
                }
                display.value = currentValue;
            } else if (value == "BackSpace") {
                currentValue = currentValue.slice(0, -1);
                display.value = currentValue;
            } else if (value == "n!") {
                currentValue = evaluate.factorial(parseInt(currentValue));
                display.value = currentValue;
            } else if (value == "𝜫") {
                currentValue += Math.PI;
                display.value = currentValue;
            } else if (value == "exp") {
                currentValue += "e+";
                display.value = currentValue;
            } else if (value == "e") {
                currentValue += Math.E;
                display.value = currentValue;
            } else if (value == "+/-") {
                currentValue = (-parseFloat(currentValue)).toString();
                display.value = currentValue;
            } else if (value == "x²") {
                currentValue = Math.pow(parseFloat(currentValue), 2).toString();
                display.value = currentValue;
            } else if (value == "2√x") {
                currentValue = evaluate.sqrt(currentValue);
                display.value = currentValue;
            } else if (value == "xʸ") {
                currentValue += "^"; // Append "^" for exponentiation
                display.value = currentValue;
            } else if (value == "mod") {
                currentValue += "%";
                display.value = currentValue;
            } else if (value == "| x |") {
                currentValue = Math.abs(parseFloat(currentValue)).toString();
                display.value = currentValue;
            } else if (value == "1/x") {
                currentValue = (Math.pow(parseFloat(currentValue), -1)).toString();
                display.value = currentValue;
            } else if (value == "10^x") {
                currentValue += "10^";
                display.value = currentValue;
            } else if (value == "log") {
                currentValue = Math.log10(parseFloat(currentValue)).toString();
                display.value = currentValue;
            } 
            else if (value == "ln") {
                currentValue = Math.log(parseFloat(currentValue)).toString();
                display.value = currentValue;
            } else if (value == "2nd") {
                currentValue = currentValue;
            } else if (value == "Trigonometry") {
                display.value = currentValue;
            } else if (value == "Trigonometry(Inverse)") {
                display.value = currentValue;
            } else if (value == 'Hyp') {
                display.value = currentValue;
            } else if (value == "Hyp(Inverse)") {
                display.value = currentValue;
            }
            else if (value == "Function") {
                currentValue = currentValue;
            } else if (value == "| x |" || value == "⌈x⌉" || value == "⌊x⌋" || value == "rand") {
                if (value == "| x |") {
                    currentValue = Math.abs(parseFloat(currentValue)).toString();
                    display.value = currentValue;
                } else if (value == "⌈x⌉") {
                    currentValue = Math.ceil(parseFloat(currentValue)).toString();
                    display.value = currentValue;
                } else if (value == "⌊x⌋") {
                    currentValue = Math.floor(parseFloat(currentValue)).toString();
                    display.value = currentValue;
                } else if (value == "rand") {
                    currentValue = Math.random().toString();
                    display.value = currentValue;
                }
            } else if (value == "Red" || value == "Deg") {

            }
            else if (value == 'sin' || value == 'cos' || value == 'tan' || value == 'sec' || value == 'csc' || value == 'cot') {
                if (redFlage) {
                    currentValue = (parseFloat(currentValue) * (Math.PI / 180)).toString();
                }

                switch (value) {
                    case 'sin':
                        currentValue = Math.sin(parseFloat(currentValue)).toString();
                        break;
                    case 'cos':
                        currentValue = Math.cos(parseFloat(currentValue)).toString();
                        break;
                    case 'tan':
                        currentValue = Math.tan(parseFloat(currentValue)).toString();
                        break;
                    case 'sec':
                        if (Math.cos(parseFloat(currentValue)) !== 0) {
                            currentValue = (1 / Math.cos(parseFloat(currentValue))).toString();
                        } else {
                            currentValue = "Undefined"; // sec(x) is undefined where cos(x) = 0
                        }
                        break;
                    case 'csc':
                        if (Math.sin(parseFloat(currentValue)) !== 0) {
                            currentValue = (1 / Math.sin(parseFloat(currentValue))).toString();
                        } else {
                            currentValue = "Undefined"; // csc(x) is undefined where sin(x) = 0
                        }
                        break;
                    case 'cot':
                        if (Math.tan(parseFloat(currentValue)) !== 0) {
                            currentValue = (1 / Math.tan(parseFloat(currentValue))).toString();
                        } else {
                            currentValue = "Undefined"; // cot(x) is undefined where tan(x) = 0
                        }
                        break;
                }

                display.value = currentValue;

            } else if (value == 'asin' || value == 'acos' || value == 'atan' || value == 'asec' || value == 'acsc' || value == 'acot') {
                if (redFlage) {
                    currentValue = (parseFloat(currentValue) * (Math.PI / 180)).toString();
                }

                switch (value) {
                    case 'asin':
                        currentValue = Math.asin(parseFloat(currentValue)).toString();
                        break;
                    case 'acos':
                        currentValue = Math.acos(parseFloat(currentValue)).toString();
                        break;
                    case 'atan':
                        currentValue = Math.atan(parseFloat(currentValue)).toString();
                        break;
                    case 'asec':
                        if (Math.abs(parseFloat(currentValue)) >= 1) {  // secant must be >= 1 or <= -1
                            currentValue = Math.acos(1 / parseFloat(currentValue)).toString();
                        } else {
                            currentValue = "Undefined"; // asech(x) is undefined for |x| < 1
                        }
                        break;
                    case 'acsc':
                        if (Math.abs(parseFloat(currentValue)) >= 1) { // cosecant must be >= 1 or <= -1
                            currentValue = Math.asin(1 / parseFloat(currentValue)).toString();
                        } else {
                            currentValue = "Undefined"; // acsc(x) is undefined for |x| < 1
                        }
                        break;
                    case 'acot':
                        if (Math.abs(parseFloat(currentValue)) >= 1) { // cotangent must be > 1 or < -1
                            currentValue = Math.atan(1 / parseFloat(currentValue)).toString();
                        } else {
                            currentValue = "Undefined"; // acot(x) is undefined for |x| < 1
                        }
                        break;
                }

                display.value = currentValue;
            }
            
            else if (value == 'arsinh' || value == 'arcosh' || value == 'artanh' || value == 'arsech' || value == 'arcsch' || value == 'arcoth') {
                // Inverse Hyperbolic Trigonometric Functions
                switch (value) {
                    case 'arsinh':
                        currentValue = Math.asinh(parseFloat(currentValue)).toString();
                        break;
                    case 'arcosh':
                        if (parseFloat(currentValue) >= 1) {
                            currentValue = Math.acosh(parseFloat(currentValue)).toString();
                        } else {
                            currentValue = "Undefined";
                        }
                        break;
                    case 'artanh':
                        if (parseFloat(currentValue) > -1 && parseFloat(currentValue) < 1) {
                            currentValue = Math.atanh(parseFloat(currentValue)).toString();
                        } else {
                            currentValue = "Undefined";
                        }
                        break;
                    case 'arsech':
                        if (parseFloat(currentValue) >= 0 && parseFloat(currentValue) <= 1) {
                            currentValue = Math.acosh(1 / parseFloat(currentValue)).toString();
                        } else {
                            currentValue = "Undefined";
                        }
                        break;
                    case 'arcsch':
                        if (parseFloat(currentValue) !== 0) {
                            currentValue = Math.asinh(1 / parseFloat(currentValue)).toString();
                        } else {
                            currentValue = "Undefined";
                        }
                        break;
                    case 'arcoth':
                        if (Math.abs(parseFloat(currentValue)) > 1) {
                            currentValue = Math.atanh(1 / parseFloat(currentValue)).toString();
                        } else {
                            currentValue = "Undefined";
                        }
                        break;
                }
                display.value = currentValue;
            }
            else if (value == 'sinh' || value == 'cosh' || value == 'tanh' || value == 'sech' || value == 'csch' || value == 'coth') {
                // Hyperbolic Trigonometric Functions
                switch (value) {
                    case 'sinh':
                        currentValue = Math.sinh(parseFloat(currentValue)).toString();
                        break;
                    case 'cosh':
                        currentValue = Math.cosh(parseFloat(currentValue)).toString();
                        break;
                    case 'tanh':
                        currentValue = Math.tanh(parseFloat(currentValue)).toString();
                        break;
                    case 'sech':
                        if (parseFloat(currentValue) !== 0) {
                            currentValue = (1 / Math.cosh(parseFloat(currentValue))).toString();
                        } else {
                            currentValue = "Undefined"; // sech(x) is undefined at x = 0
                        }
                        break;
                    case 'csch':
                        if (parseFloat(currentValue) !== 0) {
                            currentValue = (1 / Math.sinh(parseFloat(currentValue))).toString();
                        } else {
                            currentValue = "Undefined"; // csch(x) is undefined at x = 0
                        }
                        break;
                    case 'coth':
                        if (parseFloat(currentValue) !== 0) {
                            currentValue = (1 / Math.tanh(parseFloat(currentValue))).toString();
                        } else {
                            currentValue = "Undefined"; // coth(x) is undefined at x = 0
                        }
                        break;
                }
                display.value = currentValue;
            }
            else {
                currentValue += value;  // Append the value of the clicked button
                display.value = currentValue;
            }
        });
    }
});
