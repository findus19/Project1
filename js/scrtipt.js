'use strict';

let calculate = document.getElementById('start'),
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
    periodAmount = document.querySelector('.period-amount');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function(n) {
    let value = n;
    let reg = /[,/a-zA-Zа-яА-Я ]/;
        if (reg.test(value)) {
            return value;
        } else{
            alert("Некоректный ввод");
        }
};

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses:[],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function(){
        /* do{
            money = prompt("Ваш месячный доход?", "Введите число");
        }
        while (!isNumber(money)); */
        
        appData.budget = +salary.value;

        appData.getExpenses();
        appData.getIncome()
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.getIncomeMonth();
        
        
        
        appData.getBudget();

        appData.showResults(); 
    },
    showResults: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.floor(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(', ');
        addIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', appData.range);
    },
    addExpensesBlock : function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach( function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== "" && cashExpenses !== ""){
                appData.expenses[itemExpenses] = Number(cashExpenses);
            }

        });
    },
    addIncomeBlock : function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function(){
        incomeItems.forEach( function(item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== "" && cashIncome !== ""){
                appData.income[itemIncome] = Number(cashIncome);
            }

            
        });
    },
    getAddExpenses: function() {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ""){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        addlIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ""){
                appData.addIncome.push(itemValue);
            }
        })
    },
    asking: function() {

        if(confirm("Есть ли у вас дополнительный заработок?")){
            let itemIncome ;
            do{
                itemIncome = prompt("Какой у вас дополнительный заработок?");
            }
            while (!isString(itemIncome));
            let cashIncome;
            do{
                cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", "Введите число");
            }
            while (!isNumber(cashIncome));
            appData.income[itemIncome] = Number(cashIncome);
            console.log(appData.income);
        }

        let addExpenses;
        do{
            addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        }
        while (!isString(addExpenses));
        
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        console.log(appData.addExpenses.map(word => word[0].toUpperCase() + word.toLowerCase().slice(1)).join(', '));

        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        let amount, expense;
    
        for (let i = 0; i < 2; i++){
            do{
                expense = prompt("Введите обязательную статью расходов?");
            }
            while (!isString(expense));

            do{
                amount = prompt("Во сколько это обойдется?", "Введите число");
            }
            while (!isNumber(amount));
            appData.expenses[expense] = Number(amount);
        };
    },
    /* сумму всех дополнительных доходов за месяц */
    getIncomeMonth: function(){
        for(let i in appData.income){
            appData.incomeMonth += +appData.income[i];
        }
        return appData.incomeMonth
    },
    /* сумму всех обязательных расходов за месяц */
    getExpensesMonth: function(){
        for(let i in appData.expenses){
            appData.expensesMonth += +appData.expenses[i];
        }
        return appData.expensesMonth
    },
    /* Накопления за месяц (Доходы минус расходы) */
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
        return appData.budgetMonth;        
    },
    /* за какой период будет достигнута цель  */
    getTargetMonth: function(){
        let month = Math.ceil(targetAmount.value / appData.budgetMonth)
        if(month > 0) {
            return month;
        } else if(month < 0) {
            return "Цель не будет достигнута";
        };
    }, 
    getStatusIncome: function() {
        if(appData.budgetDay >= 1200) {
            return("У вас высокий уровень дохода");  
        } else if (appData.budgetDay >= 600 && appData.budgetDay <=1200) {
            return("У вас средний уровень дохода");
        } else if (appData.budgetDay >= 0 && appData.budgetDay <=600){
            return("К сожалению у вас уровень дохода ниже среднего");
        } else if (appData.budgetDay < 0){
            return("Что то пошло не так");
        }; 
    },
    /* информация о депозите */
    getInfoDeposit: function(){
        if(appData.deposit){
            let percent, moneyDep = 0;
            do{
                percent = prompt("Какой годовой процент", "Введите число");
            }
            while (!isNumber(percent));
            appData.percentDeposit = Number(percent);
            
            do{
                moneyDep = prompt("Какая сумма заложена?", "Введите число");
            }
            while (!isNumber(moneyDep));
            appData.moneyDeposit = Number(moneyDep);
        }  
    },
    range: function() {
        periodAmount.innerHTML = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod();
    },
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    }
};

calculate.disabled = true;
salary.addEventListener('input', function () {
  if (salary.value === '') {
    calculate.disabled = true;
  } else {
    calculate.disabled = false;
    calculate.addEventListener('click', appData.start);
  }
});
//calculate.addEventListener('click', appData.start);
periodSelect.addEventListener('input', appData.range);

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);

/* console.log("Расход за месяц", appData.expensesMonth);

console.log(appData.getTargetMonth());

console.log(appData.getStatusIncome());

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney()) */

/* console.log("Наша программа включает в себя данные:");
for (var prop in appData) {
    console.log("appData." + prop + " = " + appData[prop]);
}
console.log(calculate);
console.log(incomeAdd);
console.log(expensesAdd);
console.log(depositCheck);
console.log(additionalIncome);

console.log(budgetMonth);
console.log(budgetDay);
console.log(expensesMonth);
console.log(addIncomeValue);
console.log(addExpensesValue);
console.log(incomePerios);
console.log(targetMonth);

console.log(salary);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(epsensesAmount);
console.log(addExpenses);
console.log(mission);
console.log(period);
*/
 