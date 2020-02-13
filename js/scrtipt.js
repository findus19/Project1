'use strict';

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.getElementById('deposit-check'),
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
    inputPlaceSum = document.querySelectorAll('input[placeholder="Сумма"]'),
    inputPercent = document.querySelectorAll('input[placeholder="Процент"]'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

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
        this.budget = +salary.value;

        this.pressStart();
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getInfoDeposit()
        this.getIncomeMonth();        
        this.getBudget();
        this.showResults(); 

    };

    showResults() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        if(targetMonthValue.value)      
        incomePeriodValue.value = this.calcPeriod();  
        periodSelect.addEventListener('input', this.range());
    };

    addExpIncBlock(plus, items){
            let startStr;
            items.forEach( function(el) {
                startStr = el;
            });
            startStr = startStr.className.split('-')[0];
            let cloneAddExpIncItem = items[0].cloneNode(true);
            cloneAddExpIncItem.querySelectorAll('input').forEach(e =>{
                e.value = "";
            });
            items[0].parentNode.insertBefore(cloneAddExpIncItem, plus);
            startStr = document.querySelectorAll(`.${startStr}-items`);
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
                this[startStr][itemTitel] = Number(itemAmount);
            };
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);
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
        let incomeMon = document.querySelectorAll('.income-items');
        //this.income += incomeMon;
        for(let i in this.income){
            console.log(incomeItems);
            console.log(this.income);
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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
        }else {
            return targetAmount.value = 0;
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
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }  
    };

    changePercent(){
        const valueSelect = this.value;

        if(valueSelect === 'other'){
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }

    }
    
    depositHandler() {
        if(depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else{
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    };

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    };

    range() {
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.value = this.calcPeriod();
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
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        for(let i = 1; i < incomeItems.length; i++){
            if(i !== 0) {
                incomeItems[i].parentNode.removeChild(incomeItems[i]);
               }
            incomePlus.style.display = 'block';
        };
        for(let i = 1; i < expensesItems.length; i++){
            if(i !== 0) {
                expensesItems[i].parentNode.removeChild(expensesItems[i]);
               }
            expensesPlus.style.display = 'block';
        };
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
        inputText.forEach(item => {
            item.disabled = false;
            item.value = '';
        start.style.display = 'block';
        cancel.style.display = 'none';
        start.disabled = true;
        });
        incomePlus.style.disabled = false;
        expensesPlus.style.disabled = false;
        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
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

    checkPercent() {
        inputPercent.forEach(item =>{
            item.addEventListener('input', () => {
                let percentValue = +item.value;
                console.log(percentValue)
                let reg = /[.:;,/a-zA-Zа-яА-Я ]]/;
                if (!reg.test(percentValue)){
                    
                    if(percentValue < 100 && percentValue > 0){
                        start.disabled = false;
                    } else {
                        alert('Введите корректно процентную ставку');
                        start.disabled = true;
                    }
                } else {
                    percentValue = percentValue.replace(reg, '');
                    percentValue.value = percentValue;
                }
            });
        });
    }

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
        cancel.addEventListener('click', this.pressCancel.bind(appData));   
        depositCheck.addEventListener('change', this.depositHandler.bind(appData));
    };
};

const appData = new AppData();
start.disabled = true;
appData.check();
appData.EventsListeners();
appData.checkName();
appData.checkSumm();
appData.checkPercent();

 
 
