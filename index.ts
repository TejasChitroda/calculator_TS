enum Operation {
    ADD = "+",
    SUBTRACT = "-",
    MULTIPLY = "*",
    DIVIDE = "/",
    POWER = "^",
    SQUARE_ROOT = "2√x",
    FACTORIAL = "n!",
    ABSOLUTE = "| x |",
    LOG = "log",
    LN = "ln",
    PI = "π",
    E = "e",
    DEGREE = "Deg",
    RADIAN = "Red",
    SIN = "sin",
    COS = "cos",
    TAN = "tan",
    SEC = "sec",
    CSC = "csc",
    COT = "cot",
    ASIN = "asin",
    ACOS = "acos",
    ATAN = "atan",
    EQUALS = "=",
    DOT = ".",
    BACKSPACE = "BackSpace",
    CLEAR = "CE",
    MOD = "%",
    RANDOM = "rand",
    INV = "1/x",
    PLUSMINUS = "+/-",
    SQuer = "x²",
    TENPOW = '10^x',
    FLOOR = "⌊x⌋",
    CEIL = "⌈x⌉",
    RAND = 'rand',
    XPOWY = 'x^3',
    EXP = 'exp'

  }

  let main = document.getElementById('main')
  document.addEventListener("DOMContentLoaded", () => {
    let theme: string = localStorage.getItem("theme") || "theme_light";
   
    main?.classList.add(theme);
    
  });

  type themeClassType = "theme_light" | "theme_dark";
function changeTheme():void {
    let themeClass: themeClassType;
  
    if (main?.classList.contains("theme_light")) {

        main.classList.replace("theme_light", "theme_dark"); // dark mode
        themeClass = "theme_dark";
    } else {
        main?.classList.replace("theme_dark", "theme_light"); // light mode
        themeClass = "theme_light";
    }
 
    try {
        localStorage.setItem('theme', themeClass);
    } catch (err) {
        console.error(`error in storing theme: ${err}`)
    }
}

  let excludeOperator : string[] = ['1/x' , 'x^3', 'exp' , 'rand' , '⌊x⌋', '⌈x⌉', '+/-' , 'ln' ,'2√x' , 'log' ,'Red', 'Deg' ,'10^x' , '2nd' , 'x²' ,'Trigonometry' , 'Trigonometry(Inverse)' , 'Hyp' , 'Hyp(Inverse)' , 'Function'];
  
  type DisplayElement = HTMLInputElement;
  
  interface ICalculator {
    currentValue: string;
    display: DisplayElement;
    append(value: string): void;
    evaluate(currentValue: string): string;
    delete(): void;
    clear(): void;
    factorial(n: number): string;
    sqrt(currentValue: string): string;
    power(currentValue: string): string;
  }
  
  class Calculator implements ICalculator {
    currentValue: string = '';
    display: DisplayElement;
  
    constructor(display: DisplayElement) {
      this.display = display;
    }
  
    private updateScreen(): void {
      this.display.value = this.currentValue;
    }
  
    append(value: string): void {
      if (value === Operation.PI) {
        this.currentValue += Math.PI.toString();
      } else if (value === Operation.E) {
        this.currentValue += Math.E.toString();
      } else if (excludeOperator.includes(value)) {
        
      }
       else {
        this.currentValue += value;
        
      }
      
      this.updateScreen();
    }
  
    evaluate(currentValue: string): string {
      try {
        currentValue = this.safeParser(currentValue);
        const result = new Function('return ' + currentValue)();
        return isNaN(result) ? 'Error' : result.toString();
      } catch (err) {
        console.error('Evaluation error:', err);
        return 'Error';
      }
    }
  
    private safeParser(input: string): string {
      return input
        .replace('log', 'Math.log10')
        .replace('π', Math.PI.toString())
        .replace('e', Math.E.toString())
        .replace('√', 'Math.sqrt');
    }
  
    delete(): void {
      this.currentValue = this.currentValue.slice(0, -1);
      this.updateScreen();
    }
  
    clear(): void {
      this.currentValue = '';
      this.updateScreen();
    }
  
    factorial(n: number): string {
      if (n < 0) return 'Error';
      let result = 1;
      for (let i = 1; i <= n; i++) {
        result *= i;
      }
      return result.toString();
    }
  
    sqrt(currentValue: string): string {
      const num = parseFloat(currentValue);
      return num >= 0 ? Math.sqrt(num).toString() : 'Invalid Input';
    }
  
    power(currentValue: string): string {
      const values = currentValue.split(Operation.POWER);
      if (values.length === 2) {
        const base = parseFloat(values[0]);
        const exponent = parseFloat(values[1]);
        if (!isNaN(base) && !isNaN(exponent)) {
          return Math.pow(base, exponent).toString();
        }
      }
      return 'Invalid Format';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('spanOutput') as DisplayElement;
    const calculator = new Calculator(display);
  
    const buttons : NodeListOf<HTMLElement> = document.querySelectorAll('.btn');
  
    buttons.forEach((button: HTMLElement) => {
      button.addEventListener('click', () => {
        const value = button.innerText.trim();
  
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
                display.value = (Math.abs(Number(calculator.currentValue)).toString());
                break;
            case Operation.INV:
                display.value = (Math.pow(Number(calculator.currentValue) , -1).toString())
                break;
            case Operation.FLOOR : 
                display.value = (Math.floor(Number(calculator.currentValue))).toString();
                break;
            case Operation.CEIL : 
                display.value = (Math.ceil(Number(calculator.currentValue))).toString();
                break
            case Operation.RAND : 
                display.value = (Math.random()).toString();
                break;
            case Operation.SQuer:
                display.value = (Math.pow(Number(calculator.currentValue) , 2)).toString();
                break;
                case Operation.XPOWY:
                    display.value = (Math.pow(Number(calculator.currentValue) , 3)).toString();
                    break;
              case Operation.PLUSMINUS:
                        display.value = "-" + calculator.currentValue;
                        break;
                 
            case Operation.EXP:
                display.value = (Math.exp(Number(calculator.currentValue))).toString();
                    
                case Operation.TENPOW:
                    display.value = (Math.pow(10 ,Number(calculator.currentValue))).toString();
                    break;
                case Operation.LN:
                    display.value = (Math.log(Number(calculator.currentValue))).toString();
                    break;
                    case Operation.LOG:
                        display.value = (Math.log10(Number(calculator.currentValue))).toString();
                        break;
          default:
            calculator.append(value);
            break;
        }
      });
    });
  
    // Additional code for handling trigonometric operations
    const redian = document.getElementById('redian') as HTMLElement;
    let redFlag: number = 0;
    redian.addEventListener('click', function () {
      if (redFlag === 0) {
        redFlag = 1;
        redian.innerHTML = "Deg"; // Display "Deg" when flag is 1
      } else {
        redFlag = 0;
        redian.innerHTML = "Red"; // Display "Red" when flag is 0
      }
    });
  
    

    const trigButtons = ['sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'asin', 'acos', 'atan'];
    const inverseTrigButtons = ['asec', 'acsc', 'acot'];
    const hyperbolicTrigButtons = ['sinh', 'cosh', 'tanh', 'sech', 'csch', 'coth'];
    const inverseHyperbolicTrigButtons = ['arsinh', 'arcosh', 'artanh', 'arsech', 'arcsch', 'arcoth'];
    
    trigButtons.forEach((trig) => {
      const trigButton = document.getElementById(trig) as HTMLElement;
      trigButton.addEventListener('click', () => {
        
      
        // If redFlag is 1, convert input to radians before calculation
        if (redFlag === 1) {
          calculator.currentValue = (parseFloat(calculator.currentValue) * (Math.PI / 180)).toString();
        }
      
        // Perform the trigonometric operation
        switch (trig) {
          case 'sin':
            calculator.currentValue = Math.sin(parseFloat(calculator.currentValue)).toString();
            break;
          case 'cos':
            calculator.currentValue = Math.cos(parseFloat(calculator.currentValue)).toString();
            break;
          case 'tan':
            calculator.currentValue = Math.tan(parseFloat(calculator.currentValue)).toString();
            break;
          case 'sec':
            calculator.currentValue = (1 / Math.cos(parseFloat(calculator.currentValue))).toString();
            break;
          case 'csc':
            calculator.currentValue = (1 / Math.sin(parseFloat(calculator.currentValue))).toString();
            break;
          case 'cot':
            calculator.currentValue = (1 / Math.tan(parseFloat(calculator.currentValue))).toString();
            break;
          case 'asin':
            let asinResult = Math.asin(parseFloat(calculator.currentValue)); // in radians
            if (redFlag === 1) {
              // If redFlag is 1, convert result to degrees
              calculator.currentValue = (asinResult * 180 / Math.PI).toString(); // radians to degrees
            } else {
              calculator.currentValue = asinResult.toString(); // radians (default)
            }
            break;
          case 'acos':
            let acosResult = Math.acos(parseFloat(calculator.currentValue)); // in radians
            if (redFlag === 1) {
              // If redFlag is 1, convert result to degrees
              calculator.currentValue = (acosResult * 180 / Math.PI).toString(); // radians to degrees
            } else {
              calculator.currentValue = acosResult.toString(); // radians (default)
            }
            break;
          case 'atan':
            let atanResult = Math.atan(parseFloat(calculator.currentValue)); // in radians
            if (redFlag === 1) {
              // If redFlag is 1, convert result to degrees
              calculator.currentValue = (atanResult * (180 / Math.PI)).toString(); // radians to degrees
            } else {
              calculator.currentValue = atanResult.toString(); // radians (default)
            }
           
            break;
        }
      
        // Update the display
        display.value = calculator.currentValue;
      });
      
      
    });
    
    // Inverse Trigonometric Functions
    inverseTrigButtons.forEach((trig) => {
      const trigButton = document.getElementById(trig) as HTMLElement;
      trigButton.addEventListener('click', () => {
        if (redFlag === 1) {
          calculator.currentValue = (parseFloat(calculator.currentValue) * (Math.PI / 180)).toString();
        }
        switch (trig) {
          case 'asec':
            if (Math.abs(parseFloat(calculator.currentValue)) >= 1) {
              calculator.currentValue = Math.acos(1 / parseFloat(calculator.currentValue)).toString();
            } else {
              calculator.currentValue = "Undefined"; // undefined for |x| < 1
            }
            break;
          case 'acsc':
            if (Math.abs(parseFloat(calculator.currentValue)) >= 1) {
              calculator.currentValue = Math.asin(1 / parseFloat(calculator.currentValue)).toString();
            } else {
              calculator.currentValue = "Undefined"; // undefined for |x| < 1
            }
            break;
          case 'acot':
            if (Math.abs(parseFloat(calculator.currentValue)) >= 1) {
              calculator.currentValue = Math.atan(1 / parseFloat(calculator.currentValue)).toString();
            } else {
              calculator.currentValue = "Undefined"; // undefined for |x| < 1
            }
            break;
        }
        display.value = calculator.currentValue;
      });
    });
    
    // Hyperbolic Trigonometric Functions
    hyperbolicTrigButtons.forEach((trig) => {
      const trigButton = document.getElementById(trig) as HTMLElement;
      trigButton.addEventListener('click', () => {
        switch (trig) {
          case 'sinh':
            calculator.currentValue = Math.sinh(parseFloat(calculator.currentValue)).toString();
            break;
          case 'cosh':
            calculator.currentValue = Math.cosh(parseFloat(calculator.currentValue)).toString();
            break;
          case 'tanh':
            calculator.currentValue = Math.tanh(parseFloat(calculator.currentValue)).toString();
            break;
          case 'sech':
            if (Math.cosh(parseFloat(calculator.currentValue)) !== 0) {
              calculator.currentValue = (1 / Math.cosh(parseFloat(calculator.currentValue))).toString();
            } else {
              calculator.currentValue = "Undefined"; // sech(x) is undefined at x = 0
            }
            break;
          case 'csch':
            if (Math.sinh(parseFloat(calculator.currentValue)) !== 0) {
              calculator.currentValue = (1 / Math.sinh(parseFloat(calculator.currentValue))).toString();
            } else {
              calculator.currentValue = "Undefined"; // csch(x) is undefined at x = 0
            }
            break;
          case 'coth':
            if (Math.tanh(parseFloat(calculator.currentValue)) !== 0) {
              calculator.currentValue = (1 / Math.tanh(parseFloat(calculator.currentValue))).toString();
            } else {
              calculator.currentValue = "Undefined"; // coth(x) is undefined at x = 0
            }
            break;
        }
        display.value = calculator.currentValue;
      });
    });
    
    // Inverse Hyperbolic Trigonometric Functions
    inverseHyperbolicTrigButtons.forEach((trig) => {
      const trigButton = document.getElementById(trig) as HTMLElement;
      trigButton.addEventListener('click', () => {
        switch (trig) {
          case 'arsinh':
            calculator.currentValue = Math.asinh(parseFloat(calculator.currentValue)).toString();
            break;
          case 'arcosh':
            if (parseFloat(calculator.currentValue) >= 1) {
              calculator.currentValue = Math.acosh(parseFloat(calculator.currentValue)).toString();
            } else {
              calculator.currentValue = "Undefined";
            }
            break;
          case 'artanh':
            if (parseFloat(calculator.currentValue) > -1 && parseFloat(calculator.currentValue) < 1) {
              calculator.currentValue = Math.atanh(parseFloat(calculator.currentValue)).toString();
            } else {
              calculator.currentValue = "Undefined";
            }
            break;
          case 'arsech':
            if (parseFloat(calculator.currentValue) >= 0 && parseFloat(calculator.currentValue) <= 1) {
              calculator.currentValue = Math.acosh(1 / parseFloat(calculator.currentValue)).toString();
            } else {
              calculator.currentValue = "Undefined";
            }
            break;
          case 'arcsch':
            if (parseFloat(calculator.currentValue) !== 0) {
              calculator.currentValue = Math.asinh(1 / parseFloat(calculator.currentValue)).toString();
            } else {
              calculator.currentValue = "Undefined";
            }
            break;
          case 'arcoth':
            if (Math.abs(parseFloat(calculator.currentValue)) > 1) {
              calculator.currentValue = Math.atanh(1 / parseFloat(calculator.currentValue)).toString();
            } else {
              calculator.currentValue = "Undefined";
            }
            break;
        }
        display.value = calculator.currentValue;
      });
    });
  });
  



