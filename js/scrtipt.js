'use strict';

let money;

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function(){
    do{
        money = prompt("Ваш месячный доход?");
        console.log(typeof(money));
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
    mission: 3000,
    period: 3,
    asking: function() {
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpenses = addExpenses.toLowerCase().split(',')
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        let sumAmount = 0, amount, expense;
    
        for (let i = 0; i < 2; i++){
            expense = prompt("Введите обязательную статью расходов?")
            do{
                amount = prompt("Во сколько это обойдется?");
            }
            while (!isNumber(amount));
            appData.expenses[expense] = Number(amount);
        };
    },
    /* сумму всех обязательных расходов за месяц */
    getExpensesMonth: function(){
        for(let i in appData.expenses){
            appData.expensesMonth += appData.expenses[i];
        }
        return appData.expensesMonth
    },
    /* Накопления за месяц (Доходы минус расходы) */
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
        return appData.budgetMonth;        
    },
    /* за какой период будет достигнута цель  */
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
    }
};
appData.asking();

appData.getExpensesMonth();
console.log("Расход за месяц", appData.expensesMonth);

appData.getBudget();
console.log(appData.getTargetMonth());

console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя данные:");
for (var prop in appData) {
    console.log("appData." + prop + " = " + appData[prop]);
}
