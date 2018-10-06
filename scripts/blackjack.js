//BlackJack
//PLuralsight Course Project*

//Card Variables
let suits = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

//DOM Variables
let blackjack_start_button = document.getElementById('blackjack_start_button');
let blackjack_hit_button = document.getElementById('blackjack_hit_button');
let blackjack_stay_button = document.getElementById('blackjack_stay_button');
let blackjack_text_area = document.getElementById('blackjack_text_area');
let blackjack_restart_button = document.getElementById('blackjack_restart_button');
let blackjack_reset_button = document.getElementById('blackjack_reset_button');
let blackjack_player_cards_area = document.getElementById('blackjack_player_cards_area');
let blackjack_dealer_cards_area = document.getElementById('blackjack_dealer_cards_area');

//Game Variables
let game_started = false,
    game_over = false,
    player_won = false,
    dealer_cards = [],
    player_cards = [],
    dealer_score = 0,
    player_score = 0,
    deck = [];

//DOM Initiation
blackjack_hit_button.style.display = 'none';
blackjack_stay_button.style.display = 'none';
blackjack_restart_button.style.display = 'none';
blackjack_reset_button.style.display = 'none';
blackjack_player_cards_area.style.display = 'none';
blackjack_dealer_cards_area.style.display = 'none';
show_status();

//Start Game
blackjack_start_button.addEventListener('click', function () {
    game_started = true;
    game_over = false;
    player_won = false;

    deck = create_deck();
    shuffle_deck(deck);
    blackjack_hit_button.style.display = 'inline';
    blackjack_stay_button.style.display = 'inline';
    blackjack_start_button.style.display = 'none';
    blackjack_restart_button.style.display = 'none';
    show_status();
});

blackjack_hit_button.addEventListener('click', function () {
    player_cards.push(get_next_card());
    check_for_end_of_game();
    show_status();
})

blackjack_stay_button.addEventListener('click', function () {
    game_over = true;
    check_for_end_of_game();
    show_status();
})

//Functions
function create_deck() {
    for (let suit_index = 0; suit_index < suits.length; suit_index++) {
        for (let value_index = 0; value_index < values.length; value_index++) {
            let card = {
                suit: suits[suit_index],
                value: values[value_index]
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffle_deck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swap_index = Math.trunc(Math.random() * deck.length);
        let temporary_deck = deck[swap_index];
        deck[swap_index] = deck[i];
        deck[i] = temporary_deck;
    }
}

function get_card_string(card) {
    return card.value + ' of ' + card.suit;
}

function get_next_card() {
    return deck.shift();
}

function get_card_numerical_value() {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function get_score(card_array) {
    let score = 0;
    let has_ace = false;
    for (let i = 0; i < card_array.length; i++) {
        let card = card_array[i];
        score += get_card_numerical_value(card);
        if (card.value === 'Ace') {
            has_ace = true;
        }
    }
    if (has_ace && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function update_scores() {
    dealer_score = get_score(dealer_cards);
    player_score = get_score(player_cards);
}

function check_for_end_of_game() {
    update_scores();

    if (game_over) {
        while (dealer_score < player_score
            && player_score <= 21
            && dealer_score <= 21) {
            dealer_cards.push(get_next_card());
            update_scores();
        }
    }

    if (player_score > 21) {
        player_won = false;
        game_over = true;
    }

    else if (dealer_score > 21) {
        player_won = true;
        game_over = true;
    }

    else if (game_over) {
        if (player_score > dealer_score) {
            player_won = true;
        }
        else {
            player_won = false;
        }
    }
}

function show_status() {
    if (!game_started) {
        blackjack_text_area.innerText = 'Boi';
        return;
    }

    let dealer_card_string = '';
    for (let i = 0; i < dealer_cards.length;) {
        dealer_card_string += get_card_string(dealer_cards[i]) + '\n';
    }

    let player_card_string = '';
    for (let i = 0; i < player_cards.length;) {
        player_card_string += get_card_string(player_cards[i]) + '\n';
    }

    update_scores();

    blackjack_text_area.innerText =
        'Dealer has:\n' +
        dealer_card_string +
        '(score: ' + dealer_score + ')\n\n' +

        'Player has:\n' +
        player_card_string +
        '(score: ' + player_score + ')\n\n';

    for (var i = 0; i < deck.length; i++) {
        blackjack_text_area.innerText += '\n' + get_card_string(deck[i]);
    }
}

if (game_over) {
    if (player_won) {
        blackjack_text_area.innerText = "Congratualtions! You won the game";
    }

    else {
        blackjack_text_area.innerText = 'Sorry, the dealer won and you took an L\n' + 'Would you like to play again?';

        blackjack_restart_button.style.display = 'inline';
        blackjack_reset_button.style.display = 'inline';
        blackjack_hit_button.style.display = 'none';
        blackjack_stay_button.style.display = 'none';
        blackjack_start_button.style.display = 'none';
    }
}