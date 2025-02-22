var Operation;
(function (Operation) {
    Operation["ADD"] = "+";
    Operation["SUBTRACT"] = "-";
    Operation["MULTIPLY"] = "*";
    Operation["DIVIDE"] = "/";
    Operation["POWER"] = "^";
    Operation["SQUARE_ROOT"] = "2\u221Ax";
    Operation["FACTORIAL"] = "n!";
    Operation["ABSOLUTE"] = "| x |";
    Operation["LOG"] = "log";
    Operation["LN"] = "ln";
    Operation["PI"] = "\u03C0";
    Operation["E"] = "e";
    Operation["DEGREE"] = "Deg";
    Operation["RADIAN"] = "Red";
    Operation["SIN"] = "sin";
    Operation["COS"] = "cos";
    Operation["TAN"] = "tan";
    Operation["SEC"] = "sec";
    Operation["CSC"] = "csc";
    Operation["COT"] = "cot";
    Operation["ASIN"] = "asin";
    Operation["ACOS"] = "acos";
    Operation["ATAN"] = "atan";
    Operation["EQUALS"] = "=";
    Operation["DOT"] = ".";
    Operation["BACKSPACE"] = "BackSpace";
    Operation["CLEAR"] = "CE";
    Operation["MOD"] = "%";
    Operation["RANDOM"] = "rand";
    Operation["INV"] = "1/x";
    Operation["PLUSMINUS"] = "+/-";
    Operation["SQuer"] = "x\u00B2";
    Operation["TENPOW"] = "10^x";
    Operation["FLOOR"] = "\u230Ax\u230B";
    Operation["CEIL"] = "\u2308x\u2309";
    Operation["RAND"] = "rand";
    Operation["XPOWY"] = "x^3";
    Operation["EXP"] = "exp";
})(Operation || (Operation = {}));
var main = document.getElementById("main");
document.addEventListener("DOMContentLoaded", function () {
    var theme = localStorage.getItem("theme") || "theme_light";
    main === null || main === void 0 ? void 0 : main.classList.add(theme);
});
function changeTheme() {
    var themeClass;
    if (main === null || main === void 0 ? void 0 : main.classList.contains("theme_light")) {
        main.classList.replace("theme_light", "theme_dark"); // dark mode
        themeClass = "theme_dark";
    }
    else {
        main === null || main === void 0 ? void 0 : main.classList.replace("theme_dark", "theme_light"); // light mode
        themeClass = "theme_light";
    }
    try {
        localStorage.setItem("theme", themeClass);
    }
    catch (err) {
        console.error("error in storing theme: ".concat(err));
    }
}
var excludeOperator = [
    "1/x",
    "x^3",
    "exp",
    "rand",
    "⌊x⌋",
    "⌈x⌉",
    "+/-",
    "ln",
    "2√x",
    "log",
    "Red",
    "Deg",
    "10^x",
    "2nd",
    "x²",
    "Trigonometry",
    "Trigonometry(Inverse)",
    "Hyp",
    "Hyp(Inverse)",
    "Function",
    ".",
    "F-E"
];
var Calculator = /** @class */ (function () {
    function Calculator(display) {
        this.currentValue = "";
        this.display = display;
    }
    Calculator.prototype.updateScreen = function () {
        this.display.value = this.currentValue;
    };
    Calculator.prototype.append = function (value) {
        if (value === Operation.PI) {
            this.currentValue += Math.PI.toString();
        }
        else if (value === Operation.E) {
            this.currentValue += Math.E.toString();
        }
        else if (excludeOperator.includes(value)) {
        }
        else {
            this.currentValue += value;
        }
        this.updateScreen();
    };
    Calculator.prototype.evaluate = function (currentValue) {
        try {
            currentValue = this.safeParser(currentValue);
            var result = new Function("return " + currentValue)();
            return isNaN(result) ? "Error" : result.toString();
        }
        catch (err) {
            console.error("Evaluation error:", err);
            return "Error";
        }
    };
    Calculator.prototype.safeParser = function (input) {
        return input
            .replace("log", "Math.log10")
            .replace("π", Math.PI.toString())
            .replace("e", Math.E.toString())
            .replace("√", "Math.sqrt");
    };
    Calculator.prototype.delete = function () {
        this.currentValue = this.currentValue.slice(0, -1);
        this.updateScreen();
    };
    Calculator.prototype.clear = function () {
        this.currentValue = "";
        this.updateScreen();
    };
    Calculator.prototype.factorial = function (n) {
        if (n < 0)
            return "Error";
        var result = 1;
        for (var i = 1; i <= n; i++) {
            result *= i;
        }
        return result.toString();
    };
    Calculator.prototype.sqrt = function (currentValue) {
        var num = parseFloat(currentValue);
        return num >= 0 ? Math.sqrt(num).toString() : "Invalid Input";
    };
    Calculator.prototype.power = function (currentValue) {
        var values = currentValue.split(Operation.POWER);
        if (values.length === 2) {
            var base = parseFloat(values[0]);
            var exponent = parseFloat(values[1]);
            if (!isNaN(base) && !isNaN(exponent)) {
                return Math.pow(base, exponent).toString();
            }
        }
        return "Invalid Format";
    };
    return Calculator;
}());
document.addEventListener("DOMContentLoaded", function () {
    var display = document.getElementById("spanOutput");
    var calculator = new Calculator(display);
    var buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var value = button.innerText.trim();
            switch (value) {
                case Operation.CLEAR:
                    calculator.clear();
                    break;
                case Operation.EQUALS:
                    display.value = calculator.evaluate(calculator.currentValue);
                    break;
                case Operation.BACKSPACE:
                    calculator.delete();
                    break;
                case Operation.FACTORIAL:
                    display.value = calculator.factorial(parseInt(calculator.currentValue));
                    break;
                case Operation.SQUARE_ROOT:
                    display.value = calculator.sqrt(calculator.currentValue);
                    break;
                case Operation.POWER:
                    calculator.append(Operation.POWER);
                    break;
                case Operation.ABSOLUTE:
                    display.value = Math.abs(Number(calculator.currentValue)).toString();
                    break;
                case Operation.INV:
                    display.value = Math.pow(Number(calculator.currentValue), -1).toString();
                    break;
                case Operation.FLOOR:
                    display.value = Math.floor(Number(calculator.currentValue)).toString();
                    break;
                case Operation.CEIL:
                    display.value = Math.ceil(Number(calculator.currentValue)).toString();
                    break;
                case Operation.RAND:
                    display.value = Math.random().toString();
                    break;
                case Operation.SQuer:
                    display.value = Math.pow(Number(calculator.currentValue), 2).toString();
                    break;
                case Operation.XPOWY:
                    display.value = Math.pow(Number(calculator.currentValue), 3).toString();
                    break;
                case Operation.PLUSMINUS:
                    // Toggle the sign of the current value
                    var currentValNum = parseFloat(calculator.currentValue);
                    if (!isNaN(currentValNum)) {
                        calculator.currentValue = (-1 * currentValNum).toString();
                    }
                    else {
                        calculator.currentValue = "Error"; // If the value is not a number, show error
                    }
                    display.value = calculator.currentValue;
                    break;
                case Operation.EXP:
                    display.value = Math.exp(Number(calculator.currentValue)).toString();
                case Operation.TENPOW:
                    display.value = Math.pow(10, Number(calculator.currentValue)).toString();
                    break;
                case Operation.LN:
                    display.value = Math.log(Number(calculator.currentValue)).toString();
                    break;
                case Operation.LOG:
                    display.value = Math.log10(Number(calculator.currentValue)).toString();
                    break;
                default:
                    calculator.append(value);
                    break;
            }
        });
    });
    // Additional code for handling trigonometric operations
    var redian = document.getElementById("redian");
    var redFlag = 0;
    redian.addEventListener("click", function () {
        if (redFlag === 0) {
            redFlag = 1;
            redian.innerHTML = "Deg"; // Display "Deg" when flag is 1
        }
        else {
            redFlag = 0;
            redian.innerHTML = "Red"; // Display "Red" when flag is 0
        }
    });
    var trigButtons = [
        "sin",
        "cos",
        "tan",
        "sec",
        "csc",
        "cot",
        "asin",
        "acos",
        "atan",
    ];
    var inverseTrigButtons = ["asec", "acsc", "acot"];
    var hyperbolicTrigButtons = [
        "sinh",
        "cosh",
        "tanh",
        "sech",
        "csch",
        "coth",
    ];
    var inverseHyperbolicTrigButtons = [
        "arsinh",
        "arcosh",
        "artanh",
        "arsech",
        "arcsch",
        "arcoth",
    ];
    trigButtons.forEach(function (trig) {
        var trigButton = document.getElementById(trig);
        trigButton.addEventListener("click", function () {
            // If redFlag is 1, convert input to radians before calculation
            if (redFlag === 1) {
                calculator.currentValue = (parseFloat(calculator.currentValue) *
                    (Math.PI / 180)).toString();
            }
            // Perform the trigonometric operation
            switch (trig) {
                case "sin":
                    calculator.currentValue = Math.sin(parseFloat(calculator.currentValue)).toString();
                    break;
                case "cos":
                    calculator.currentValue = Math.cos(parseFloat(calculator.currentValue)).toString();
                    break;
                case "tan":
                    calculator.currentValue = Math.tan(parseFloat(calculator.currentValue)).toString();
                    break;
                case "sec":
                    calculator.currentValue = (1 / Math.cos(parseFloat(calculator.currentValue))).toString();
                    break;
                case "csc":
                    calculator.currentValue = (1 / Math.sin(parseFloat(calculator.currentValue))).toString();
                    break;
                case "cot":
                    calculator.currentValue = (1 / Math.tan(parseFloat(calculator.currentValue))).toString();
                    break;
                case "asin":
                    var asinResult = Math.asin(parseFloat(calculator.currentValue)); // in radians
                    if (redFlag === 1) {
                        // If redFlag is 1, convert result to degrees
                        calculator.currentValue = ((asinResult * 180) / Math.PI).toString(); // radians to degrees
                    }
                    else {
                        calculator.currentValue = asinResult.toString(); // radians (default)
                    }
                    break;
                case "acos":
                    var acosResult = Math.acos(parseFloat(calculator.currentValue)); // in radians
                    if (redFlag === 1) {
                        // If redFlag is 1, convert result to degrees
                        calculator.currentValue = ((acosResult * 180) / Math.PI).toString(); // radians to degrees
                    }
                    else {
                        calculator.currentValue = acosResult.toString(); // radians (default)
                    }
                    break;
                case "atan":
                    var atanResult = Math.atan(parseFloat(calculator.currentValue)); // in radians
                    if (redFlag === 1) {
                        // If redFlag is 1, convert result to degrees
                        calculator.currentValue = (atanResult * (180 / Math.PI)).toString(); // radians to degrees
                    }
                    else {
                        calculator.currentValue = atanResult.toString(); // radians (default)
                    }
                    break;
            }
            // Update the display
            display.value = calculator.currentValue;
        });
    });
    // Inverse Trigonometric Functions
    inverseTrigButtons.forEach(function (trig) {
        var trigButton = document.getElementById(trig);
        trigButton.addEventListener("click", function () {
            if (redFlag === 1) {
                calculator.currentValue = (parseFloat(calculator.currentValue) *
                    (Math.PI / 180)).toString();
            }
            switch (trig) {
                case "asec":
                    if (Math.abs(parseFloat(calculator.currentValue)) >= 1) {
                        calculator.currentValue = Math.acos(1 / parseFloat(calculator.currentValue)).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined"; // undefined for |x| < 1
                    }
                    break;
                case "acsc":
                    if (Math.abs(parseFloat(calculator.currentValue)) >= 1) {
                        calculator.currentValue = Math.asin(1 / parseFloat(calculator.currentValue)).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined"; // undefined for |x| < 1
                    }
                    break;
                case "acot":
                    if (Math.abs(parseFloat(calculator.currentValue)) >= 1) {
                        calculator.currentValue = Math.atan(1 / parseFloat(calculator.currentValue)).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined"; // undefined for |x| < 1
                    }
                    break;
            }
            display.value = calculator.currentValue;
        });
    });
    // Hyperbolic Trigonometric Functions
    hyperbolicTrigButtons.forEach(function (trig) {
        var trigButton = document.getElementById(trig);
        trigButton.addEventListener("click", function () {
            switch (trig) {
                case "sinh":
                    calculator.currentValue = Math.sinh(parseFloat(calculator.currentValue)).toString();
                    break;
                case "cosh":
                    calculator.currentValue = Math.cosh(parseFloat(calculator.currentValue)).toString();
                    break;
                case "tanh":
                    calculator.currentValue = Math.tanh(parseFloat(calculator.currentValue)).toString();
                    break;
                case "sech":
                    if (Math.cosh(parseFloat(calculator.currentValue)) !== 0) {
                        calculator.currentValue = (1 / Math.cosh(parseFloat(calculator.currentValue))).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined"; // sech(x) is undefined at x = 0
                    }
                    break;
                case "csch":
                    if (Math.sinh(parseFloat(calculator.currentValue)) !== 0) {
                        calculator.currentValue = (1 / Math.sinh(parseFloat(calculator.currentValue))).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined"; // csch(x) is undefined at x = 0
                    }
                    break;
                case "coth":
                    if (Math.tanh(parseFloat(calculator.currentValue)) !== 0) {
                        calculator.currentValue = (1 / Math.tanh(parseFloat(calculator.currentValue))).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined"; // coth(x) is undefined at x = 0
                    }
                    break;
            }
            display.value = calculator.currentValue;
        });
    });
    // Inverse Hyperbolic Trigonometric Functions
    inverseHyperbolicTrigButtons.forEach(function (trig) {
        var trigButton = document.getElementById(trig);
        trigButton.addEventListener("click", function () {
            switch (trig) {
                case "arsinh":
                    calculator.currentValue = Math.asinh(parseFloat(calculator.currentValue)).toString();
                    break;
                case "arcosh":
                    if (parseFloat(calculator.currentValue) >= 1) {
                        calculator.currentValue = Math.acosh(parseFloat(calculator.currentValue)).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined";
                    }
                    break;
                case "artanh":
                    if (parseFloat(calculator.currentValue) > -1 &&
                        parseFloat(calculator.currentValue) < 1) {
                        calculator.currentValue = Math.atanh(parseFloat(calculator.currentValue)).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined";
                    }
                    break;
                case "arsech":
                    if (parseFloat(calculator.currentValue) >= 0 &&
                        parseFloat(calculator.currentValue) <= 1) {
                        calculator.currentValue = Math.acosh(1 / parseFloat(calculator.currentValue)).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined";
                    }
                    break;
                case "arcsch":
                    if (parseFloat(calculator.currentValue) !== 0) {
                        calculator.currentValue = Math.asinh(1 / parseFloat(calculator.currentValue)).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined";
                    }
                    break;
                case "arcoth":
                    if (Math.abs(parseFloat(calculator.currentValue)) > 1) {
                        calculator.currentValue = Math.atanh(1 / parseFloat(calculator.currentValue)).toString();
                    }
                    else {
                        calculator.currentValue = "Undefined";
                    }
                    break;
            }
            display.value = calculator.currentValue;
        });
    });
});
