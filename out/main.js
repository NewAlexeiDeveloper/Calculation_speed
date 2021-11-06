import { get_random, operator_for_user, calculate_two_number } from './supplement.js';
// global variables
const calculation = document.getElementById('calculation'), animation = document.querySelector('.animation'), start = document.getElementById('start'), operation = document.getElementById('operation'), number_digits = document.getElementById('number_digits'), result = document.getElementById('result'), place_for_time = document.getElementById('place_for_time'), time_for_move = document.getElementById('time_for_move'), game_over = document.querySelector('.game_over');
let id_counter = 0, iteration_number, calculation_result, time_for_moveValue, game_played_not_first_time = false, the_game_is_played = false;
// fill the calculation area with squares. Will create as a function, so that if the screen is resized then squares are as well
function createSquares() {
    // detect the window height and depends on that assign iteration and division
    let division_number, window_width = window.innerWidth;
    if (window_width >= 576) {
        division_number = 10;
        iteration_number = 100;
        // place animation in another place
        animation.style.left = '37%';
        animation.style.top = '39%';
    }
    else if (window_width < 576 && window_width > 350) {
        division_number = 9;
        iteration_number = 81;
        // place animation in another place
        animation.style.left = '45%';
        animation.style.top = '45%';
    }
    else {
        division_number = 8;
        iteration_number = 64;
        // place animation in another place
        animation.style.left = '44%';
        animation.style.top = '64%';
    }
    const calculation_width = Number(window.getComputedStyle(calculation).width.match(/\d+/)[0]);
    const calculation_height = Number(window.getComputedStyle(calculation).height.match(/\d+/)[0]);
    for (let i = 0; i < iteration_number; i++) {
        const id = i;
        const square = document.createElement('div');
        square.style.width = (calculation_width / division_number) + 'px';
        square.style.height = (calculation_height / division_number) + 'px';
        square.classList.add('square');
        square.setAttribute('id', id.toString());
        calculation.appendChild(square);
    }
}
createSquares();
window.addEventListener('resize', () => {
    calculation.innerHTML = '';
    createSquares();
});
// Add event listener to the start button
start.addEventListener('click', () => {
    // delete previous data
    if (game_played_not_first_time) {
        startGame();
    }
    // animation
    let counter_animation = 3;
    animation.textContent = counter_animation.toString();
    setTimeout(() => {
        counter_animation--;
        animation.textContent = counter_animation.toString();
    }, 1000);
    setTimeout(() => {
        counter_animation--;
        animation.textContent = counter_animation.toString();
    }, 2000);
    animation.style.animation = 'increase 1s linear 3';
    setTimeout(() => {
        animation.style.animation = '';
        animation.textContent = '';
        addValues();
        result.addEventListener('keypress', e => {
            e.key == 'Enter' ? check_result_of_user() : '';
        });
        // add timer
        timer();
    }, 3000);
    // disable select elements
    operation.disabled = true;
    time_for_move.disabled = true;
    number_digits.disabled = true;
    start.disabled = true;
    // add values to the calculation area
    function addValues() {
        const operationValue = operation.value;
        time_for_moveValue = Number(time_for_move.value);
        const number_digitsValue = number_digits.value;
        if (id_counter === 0) {
            // the beginning of the game
            let random_one = get_random(number_digitsValue);
            let random_two = get_random(number_digitsValue);
            const operation = operator_for_user(operationValue);
            // protection agains 0 in multiplications
            while (number_digitsValue == '1' && operation == '*' && (random_one == 0 || random_two == 0)) {
                random_one = get_random(number_digitsValue);
                random_two = get_random(number_digitsValue);
            }
            // write the values in the calculation area
            document.getElementById(id_counter.toString()).textContent = random_one.toString();
            document.getElementById((id_counter + 1).toString()).textContent = operation;
            document.getElementById((id_counter + 2).toString()).textContent = random_two.toString();
            // calculate the result
            calculation_result = calculate_two_number(random_one, random_two, operation);
            id_counter = 3;
        }
        else {
            // some values are already presented, check if 2 squares are available
            if (document.getElementById(`${id_counter + 1}`)) {
                let random_one = get_random(number_digitsValue);
                const operation = operator_for_user(operationValue);
                // protection agains 0 in multiplications
                while (number_digitsValue == '1' && operation == '*' && random_one == 0) {
                    random_one = get_random(number_digitsValue);
                }
                // write the values in the calculation area
                document.getElementById(id_counter.toString()).textContent = operation;
                document.getElementById((id_counter + 1).toString()).textContent = random_one.toString();
                calculation_result = calculate_two_number(calculation_result, random_one, operation);
                id_counter += 2;
            }
            else {
                gameOver('win');
            }
        }
    }
    // compare the entered result with the actual one
    function check_result_of_user() {
        if (the_game_is_played)
            return;
        if (+result.value === calculation_result) {
            addValues();
            time_for_moveValue = Number(time_for_move.value);
            place_for_time.textContent = time_for_moveValue.toString();
            result.value = '';
        }
    }
    // game over
    function gameOver(status) {
        // prevent timer from running
        the_game_is_played = true;
        // enable select elements
        operation.disabled = false;
        time_for_move.disabled = false;
        number_digits.disabled = false;
        start.disabled = false;
        // disable input 
        result.disabled = true;
        // show game over and add animation (depends on the result)
        if (status == 'loose') {
            game_over.style.display = 'block';
            game_over.style.color = 'red';
            game_over.textContent = 'Game over';
            game_over.style.animation = 'game_over 2s linear 1';
            game_played_not_first_time = true;
            result.value = '';
        }
        else {
            game_over.style.display = 'block';
            game_over.style.color = 'green';
            game_over.textContent = 'You win';
            game_over.style.animation = 'game_over 2s linear 1';
            game_played_not_first_time = true;
            result.value = '';
        }
    }
    // timer
    function timer() {
        place_for_time.textContent = time_for_moveValue.toString();
        const decreaseTimer = setInterval(() => {
            if (the_game_is_played)
                clearInterval(decreaseTimer);
            time_for_moveValue--;
            if (time_for_moveValue <= 0) {
                clearInterval(decreaseTimer);
                place_for_time.textContent = '0';
                gameOver('loose');
            }
            else {
                place_for_time.textContent = time_for_moveValue.toString();
            }
        }, 1000);
    }
    // remove data from the previous game
    function startGame() {
        // enable input 
        result.disabled = false;
        // hide game over 
        game_over.style.display = 'none';
        game_over.style.animation = '';
        // clear text content and id counter to 0
        for (let i = 0; i <= id_counter; i++) {
            const square = document.getElementById(i.toString());
            square.textContent = '';
        }
        id_counter = 0;
        the_game_is_played = false;
        result.value = '';
    }
});
