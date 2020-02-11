'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    addlIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salary = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    inputPlaceName = document.querySelectorAll('input[placeholder="Наименование"]'),
    inputPlaceSum = document.querySelectorAll('input[placeholder="Сумма"]'),
    inputText = document.querySelectorAll('input[type="text"]');


const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses =[];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
}; 

AppData.prototype.check = function (){
    salary.addEventListener('input', function () {
        start.disabled = !salary.value.trim();
    });
};

AppData.prototype.start = function(){      
    salary = document.querySelector('.salary-amount')
    this.budget = +salary.value;

    this.pressStart();

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncomeMonth();
    
    this.getBudget();

    this.showResults(); 

    this.pressCancel();
};

AppData.prototype.showResults = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', this.range);
};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(function (item){
        item.value = "";
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach( function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== "" && cashExpenses !== ""){
            this.expenses[itemExpenses] = Number(cashExpenses);
        }

    },this);
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(function (item){
        item.value = "";
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        incomePlus.style.display = 'none';
    };
    inputText += incomeItems; 
};

AppData.prototype.getIncome = function(){
    incomeItems.forEach( function(item) {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;

        if(itemIncome !== "" && cashIncome !== ""){
            console.log(this);
            this.income[itemIncome] = Number(cashIncome);
        }  
    }, this);
};

AppData.prototype.getAddExpenses = function() {
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ""){
            this.addExpenses.push(item);
        }
    }, this) 
};

AppData.prototype.getAddIncome = function() {
    addlIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ""){
            this.addIncome.push(itemValue);
        }
    }, this)
};

/* сумму всех дополнительных доходов за месяц */
AppData.prototype.getIncomeMonth = function(){
    for(let i in this.income){
        this.incomeMonth += +this.income[i];
    }
    return this.incomeMonth
};

/* сумму всех обязательных расходов за месяц */
AppData.prototype.getExpensesMonth = function(){
    for(let i in this.expenses){
        this.expensesMonth += +this.expenses[i];
    }
    return this.expensesMonth
};

/* Накопления за месяц (Доходы минус расходы) */
AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
    return this.budgetMonth;        
};

/* за какой период будет достигнута цель  */
AppData.prototype.getTargetMonth = function(){
    let month = Math.ceil(targetAmount.value / this.budgetMonth)
    if(month > 0) {
        return month;
    } else if(month < 0) {
        return "Цель не будет достигнута";
    };
};

AppData.prototype.getStatusIncome = function() {
    if(this.budgetDay >= 1200) {
        return("У вас высокий уровень дохода");  
    } else if (this.budgetDay >= 600 && this.budgetDay <=1200) {
        return("У вас средний уровень дохода");
    } else if (this.budgetDay >= 0 && this.budgetDay <=600){
        return("К сожалению у вас уровень дохода ниже среднего");
    } else if (this.budgetDay < 0){
        return("Что то пошло не так");
    }; 
};

/* информация о депозите */
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        let percent, moneyDep = 0;
        do{
            percent = prompt("Какой годовой процент", "Введите число");
        }
        while (!isNumber(percent));
        this.percentDeposit = Number(percent);
        
        do{
            moneyDep = prompt("Какая сумма заложена?", "Введите число");
        }
        while (!isNumber(moneyDep));
        this.moneyDeposit = Number(moneyDep);
    }  
};

AppData.prototype.range = function() {
    const _this = this;
    periodAmount.innerHTML = periodSelect.value;
    incomePeriodValue.value = _this.calcPeriod();
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.pressStart = function() {
    inputText = document.querySelectorAll('input[type="text"]');
    start.style.display = 'none';
    cancel.style.display = 'block';
    inputText.forEach(function(item) {
        item.disabled = true;
    });
};

AppData.prototype.pressCancel = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses =[];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    cancel.addEventListener('click', function(){
        inputText.forEach(function(item) {
            item.disabled = false;
            item.value = '';
        });
    start.style.display = 'block';
    cancel.style.display = 'none';
    start.disabled = true;
    });
};

AppData.prototype.EventsListeners = function() {
    start.addEventListener('click', this.start.bind(appData));
    periodSelect.addEventListener('input', this.range.bind(appData));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(appData));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(appData));
};



const appData = new AppData();
console.log(AppData.prototype);




start.disabled = true;
AppData.prototype.check();
AppData.prototype.EventsListeners();

/* start.addEventListener('click', appData.start.bind(appData));
 */
/* periodSelect.addEventListener('input', appData.range.bind(appData)); */

/* incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData)); */

inputPlaceName.forEach(function(item){
    item.addEventListener('input', function(){
        let inputValue = item.value;
        let reg = /[.:;/a-zA-Z0-9 ]/;
        if (reg.test(inputValue)){
            inputValue = inputValue.replace(reg, '');
            item.value = inputValue;
        } /* /^[a-zA-Z0-9]+$/i */
    });
});

inputPlaceSum.forEach(function(item){
    item.addEventListener('input', function(){
        let inputValue = item.value;
        let reg = /[.:;,/a-zA-Zа-яА-Я ]/;
        if (reg.test(inputValue)){
            inputValue = inputValue.replace(reg, '');
            item.value = inputValue;
        }
    });
});
 
 
