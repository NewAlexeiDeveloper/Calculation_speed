function get_random(select_value: string): number {
    switch(select_value){
        case '1':
            return Math.floor(Math.random() * 10)
            break;
            case '2':
            return Math.floor(Math.random() * 90) + 10
            break;
        case '3':
            return Math.floor(Math.random() * 900) + 100
            break;
        default:
            const random = Math.floor(Math.random() * 3)
            if(random == 0){
                return Math.floor(Math.random() * 10)
            }else if(random == 1){
                return Math.floor(Math.random() * 90) + 10
            }else{
                return Math.floor(Math.random() * 900) + 100
            }
    }
}

function operator_for_user(operator: string): string {
    switch(operator){
        case 'Multiply':
            return '*'
            break;
        case 'Add':
            return '+'
            break;
        case 'Minus':
            return '-'
            break;
        default:
            const random = Math.floor(Math.random() * 3)
            if(random == 0){
                return '*'
            }else if(random == 1){
                return '+'
            }else{
                return '-'
            }
    }
}

function calculate_two_number(num1: number, num2: number, operator: string): number {
    switch(operator){
        case '*':
            return num1 * num2
            break;
        case '+':
            return num1 + num2
            break;
        case '-':
            return num1 - num2
            break;
        default:
            throw new Error('For some reason the operator is not *, + or -');
    }
}

export {get_random, operator_for_user, calculate_two_number}