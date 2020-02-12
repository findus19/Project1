'use strict';

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salary = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
    addlIncomeItem = document.querySelectorAll('.additional_income-item'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    inputPlaceName = document.querySelectorAll('input[placeholder="Наименование"]'),
    inputPlaceSum = document.querySelectorAll('input[placeholder="Сумма"]');

let inputText = document.querySelectorAll('input[type="text"]'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
    constructor(){
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

    check() {
        salary.addEventListener('input', () => {
            start.disabled = !salary.value.trim();
        });
    };

    start() {      
    //salary = document.querySelector('.salary-amount')
        this.budget = +salary.value;

        this.pressStart();

        this.getExpInc();
        this.getExpensesMonth();

        //this.getAddExpenses();
        //this.getAddIncome();
        this.getAddExpInc();

        this.getIncomeMonth();
        
        this.getBudget();

        this.showResults(); 

        this.pressCancel();
    };

    showResults() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        periodSelect.addEventListener('input', this.range);
        incomePeriodValue.value = this.calcPeriod();    
    };

    /* addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(item =>{
            item.value = "";
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        };
    };

    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(item =>{
            item.value = "";
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        };
        inputText += incomeItems; 
    }; */

    addExpIncBlock(plus, items){
        
            let startStr;
            items.forEach( function(el) {
                startStr = el;
            });
            startStr = startStr.className.split('-')[0];
            //console.log(startStr);
            //console.log(items)
            let cloneAddExpIncItem = items[0].cloneNode(true);
            //console.dir(items[0].cloneNode(true));
            cloneAddExpIncItem.querySelectorAll('input').forEach(e =>{
                e.value = "";
            });
            items[0].parentNode.insertBefore(cloneAddExpIncItem, plus);
            items = document.querySelectorAll(`.${startStr}-items`);
            if(items.length === 3){
                plus.style.display = 'none';
            };
    };

    getExpInc(){
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitel = item.querySelector(`.${startStr}-title`).value,
                itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitel !== "" && itemAmount !== ""){
                console.log(this);
                this[startStr][itemTitel] = Number(itemAmount);
            };
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);
    };

    getAddExpenses() {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if(item !== ""){
                this.addExpenses.push(item);
            }
        }, this) 
    };

    getAddIncome() {
        addlIncomeItem.forEach(item =>{
            let itemValue = item.value.trim();
            if(itemValue !== ""){
                this.addIncome.push(itemValue);
            }
        }, this)
    };

    getAddExpInc(){
        const count = item => {
            
            let itemValue = item.value.trim();
            if(itemValue !== ""){
                this.addIncome.push(itemValue);
            }
        };
        addlIncomeItem.forEach(count);
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if(item !== ""){
                this.addExpenses.push(item);
            }
        });
        
    };

/* сумму всех дополнительных доходов за месяц */
    getIncomeMonth() {
        for(let i in this.income){
            this.incomeMonth += +this.income[i];
        }
        return this.incomeMonth
    };

/* сумму всех обязательных расходов за месяц */
    getExpensesMonth() {
        for(let i in this.expenses){
            this.expensesMonth += +this.expenses[i];
        }
        return this.expensesMonth
    };

/* Накопления за месяц (Доходы минус расходы) */
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
        return this.budgetMonth;        
    };

/* за какой период будет достигнута цель  */
    getTargetMonth(){
        let month = Math.ceil(targetAmount.value / this.budgetMonth)
        if(month > 0) {
            return month;
        } else if(month < 0) {
            return "Цель не будет достигнута";
        };
    };

    getStatusIncome() {
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
    getInfoDeposit() {
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

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    };

    range() {
        const _this = this;
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.innerHTML = this.calcPeriod();
    };
    pressStart() {
        inputText = document.querySelectorAll('input[type="text"]');
        start.style.display = 'none';
        cancel.style.display = 'block';
        inputText.forEach(item => {
            item.disabled = true;
        });
    };

    pressCancel() {
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
        cancel.addEventListener('click', () => {
            inputText.forEach(item => {
                item.disabled = false;
                item.value = '';
            });
        start.style.display = 'block';
        cancel.style.display = 'none';
        start.disabled = true;
        });
    };

    checkName() {
        inputPlaceName.forEach(item =>{
            item.addEventListener('input', () => {
                let inputValue = item.value;
                let reg = /[.:;/a-zA-Z0-9 ]/;
                if (reg.test(inputValue)){
                    inputValue = inputValue.replace(reg, '');
                    item.value = inputValue;
                } /* /^[a-zA-Z0-9]+$/i */
            });
        });
    };

    checkSumm() {
        inputPlaceSum.forEach(item => {
            item.addEventListener('input', () =>{
                let inputValue = item.value;
                let reg = /[.:;,/a-zA-Zа-яА-Я ]/;
                if (reg.test(inputValue)){
                    inputValue = inputValue.replace(reg, '');
                    item.value = inputValue;
                }
            });
        });
    };

    EventsListeners() {
        start.addEventListener('click', this.start.bind(appData));
        periodSelect.addEventListener('input', this.range.bind(appData));
        incomePlus.addEventListener('click', this.addExpIncBlock.bind(appData, incomePlus, incomeItems));
        expensesPlus.addEventListener('click', this.addExpIncBlock.bind(appData, expensesPlus, expensesItems));
    };
};

const appData = new AppData();

start.disabled = true;
appData.check();
appData.EventsListeners();
appData.checkName();
appData.checkSumm();

 
 
