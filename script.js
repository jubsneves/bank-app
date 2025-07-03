'use strict';

/////////// BANKIST APP

// Data
const account1 = {
    owner: 'James Murphy',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    photo: '/assets/jm.png',
    movementsDates: [
        '2024-11-18T21:31:17.178Z',
        '2024-12-23T07:42:02.383Z',
        '2025-01-28T09:15:04.904Z',
        '2025-04-01T10:17:24.185Z',
        '2025-05-08T14:11:59.604Z',
        '2025-05-27T17:01:17.194Z',
        '2025-07-11T23:36:17.929Z',
        '2025-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT',
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    photo: '/assets/jd.png',
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    photo: '/assets/stw.png',
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT',
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    photo: '/assets/ss.png',
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

//Elements
const containerApp = document.querySelector('.app');
const containerUser = document.getElementById('containerUser');
const containerLogin = document.querySelector('.login__container');
const containerMovements = document.querySelector('.movements__list');
const labelUserName = document.querySelector('.user__name');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelDate = document.querySelector('.date');
const btnLogin = document.querySelector('.btn__login');
const btnTransfer = document.querySelector('.btn__operation--transfer');
const btnLoan = document.querySelector('.btn__operation--loan');
const btnCloseAcc = document.querySelector('.btn__close-account');
const btnSort = document.querySelector('.btn__sort');
const iconSort = document.querySelector('.icon__sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.getElementById('transfer__username');
const inputTransferAmount = document.getElementById('transfer__amount');
const inputLoanAmount = document.getElementById('loan__amount');
const inputCloseUsername = document.getElementById('close-account--username');
const inputClosePin = document.getElementById('close-account--pin');

// Movements list
let sortState = 'default';
const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    let sortedMovements = acc.movements;
    if (sort) {
        if (sortState === 'default') {
            sortedMovements = acc.movements.slice().sort((a, b) => a - b);
            sortState = 'asc';
            iconSort.src = '/assets/sort-asc.png';
        } else if (sortState === 'asc') {
            sortedMovements = acc.movements.slice().sort((a, b) => b - a);
            sortState = 'desc';
            iconSort.src = '/assets/sort-desc.png';
        } else if (sortState === 'desc') {
            sortedMovements = acc.movements;
            sortState = 'default';
            iconSort.src = '/assets/sort-default.png';
        }
    }

    sortedMovements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const date = new Date(acc.movementsDates[i]);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();
        const displayDate = `${day}/${month}/${year}`
        const html = `
                <div class="movements__row movements__type--${type}">
                    <div class="movements__detail">
                        <img src="/assets/${type}-icon.png" alt="${type} icon" class="${type}-icon">
                        <div class="movement__detail--alignment">
                            <span class="movements__value">€ ${mov.toFixed(2)}</span>
                            <span class="date movements__date">${displayDate}</span>
                        </div>
                    </div>
                    <div class="tag movements__label--${type}">${type}</div>
                </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    })
}

btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, true)
})

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Balance
const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `€${acc.balance.toFixed(2)}`;
};

//Summary
const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `€${incomes.toFixed(2)}`;

    const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `€${Math.abs(outcomes).toFixed(2)}`

    const interest = acc.movements.filter(mov => mov > 0).map(dep => (dep * acc.interestRate) / 100)
        .filter(int => int >= 1).reduce((acc, int) => acc + int);
    labelSumInterest.textContent = `€${interest.toFixed(2)}`;
}


//Username
const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    })
};
createUsername(accounts);

//Update UI
const updateUI = function (acc) {
    displayMovements(acc);
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
}

//Event handler
let currentAccount;

//***‼️Fake always logged in‼️*** */‼
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;

//Login
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    currentAccount = accounts.find(account => account.username === inputLoginUsername.value);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        containerUser.innerHTML = '';
        const html = `
            <div class="user">
                <img src="${currentAccount.photo}" alt="user photo profile" class="user__profile">
                <div class="user__details">
                    <p class="user__greet">Good afternoon</p>
                    <strong class="user__name">${currentAccount.owner.split(' ')[0]} 👋🏼</strong>
                </div>
            </div>
        `;
        containerUser.insertAdjacentHTML('afterbegin', html);
        containerApp.style.opacity = 1;
        //Create date
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hr = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        labelDate.textContent = `${day}/${month}/${year}, ${hr}:${min}`;

        containerLogin.classList.add('hidden');
        containerLogin.classList.remove('login__container');
        //Update UI
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    inputTransferAmount.value = inputTransferTo.value = '';

    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        //Transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        //Add date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());
        //update UI
        updateUI(currentAccount);
    }

});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        currentAccount.movements.push(amount);
        //Add date
        currentAccount.movementsDates.push(new Date().toISOString());
        //Update UI
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
});

btnCloseAcc.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        //Delete account
        accounts.splice(index, 1);
        //Hide UI
        containerApp.style.opacity = 0;
        containerLogin.classList.remove('hidden');
        containerLogin.classList.add('login__container');
        containerUser.classList.add('hidden');
        inputCloseUsername.value = inputClosePin.value = '';
        inputLoginUsername.value = inputLoginPin.value = '';
    }
});