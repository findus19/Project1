'use strict';

const calculate = document.getElementById('start'),
    incomeAdd = document.getElementsByTagName('button')[0],
    expensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),
    budgetMonth = document.getElementsByClassName('budget_month-value'),
    budgetDay = document.getElementsByClassName('budget_day-value'),
    expensesMonth = document.getElementsByClassName('expenses_month-value'),
    addIncomeValue = document.getElementsByClassName('additional_income-value'),
    addExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePerios = document.getElementsByClassName('income_period-value'),
    targetMonth = document.getElementsByClassName('target_month-value'),
    salary = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    epsensesAmount = document.querySelector('.expenses-amount'),
    addExpenses = document.querySelector('.additional_expenses-item'),
    mission = document.querySelector('.target-amount'),
    period = document.querySelector('.period-amount');
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






























/* 
let money;

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

const start = function(){
    do{
        money = prompt("Ваш месячный доход?", "Введите число");
    }
    while (!isNumber(money));
};

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses:[],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 3000,
    period: 3,
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
    /* сумму всех обязательных расходов за месяц 
    getExpensesMonth: function(){
        for(let i in appData.expenses){
            appData.expensesMonth += appData.expenses[i];
        }
        return appData.expensesMonth
    },
    /* Накопления за месяц (Доходы минус расходы) 
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
        return appData.budgetMonth;        
    },
    /* за какой период будет достигнута цель  
    getTargetMonth: function(){
        let month = Math.ceil(appData.mission / appData.budgetMonth)
        if(month > 0) {
            return(`За ${month} месяцев будет достигнута цель ${appData.mission}`);
        } else if(month < 0) {
            return("Цель не будет достигнута");
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
    /* информация о депозите 
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
    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};
appData.asking();

appData.getExpensesMonth();
console.log("Расход за месяц", appData.expensesMonth);

appData.getBudget();
console.log(appData.getTargetMonth());

console.log(appData.getStatusIncome());

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney())

/* console.log("Наша программа включает в себя данные:");
for (var prop in appData) {
    console.log("appData." + prop + " = " + appData[prop]);
} */
 