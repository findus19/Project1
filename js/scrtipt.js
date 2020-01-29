'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
income = "фриланс",
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
deposit = confirm("Есть ли у вас депозит в банке?"),
mission = 3000,
period = 6,
expenses = [];

const start = function(){
    do{
        money = prompt("Ваш месячный доход?");
        console.log(typeof(money));
    }
    while (!isNumber(money));
};

start();

/* тип данных */
const showTypeOf = function(data){
    return typeof(data);
};
console.log("money: ", showTypeOf(money));
console.log("income: ", showTypeOf(income));
console.log("deposit: ", showTypeOf(deposit));

console.log(addExpenses.toLowerCase().split(','));

/* сумму всех обязательных расходов за месяц */
const getExpensesMonth = function(){
    let sumAmount = 0, amont;

    for (let i = 0; i < 2; i++){
        expenses[i] = prompt("Введите обязательную статью расходов?")
        do{
            amont = prompt("Во сколько это обойдется?");
        }
        while (!isNumber(amont));
        sumAmount += Number(amont);
    }
    
    return sumAmount;
};

const ExpensesMounth =  getExpensesMonth();
console.log("Расход за месяц", ExpensesMounth);

/* Накопления за месяц (Доходы минус расходы) */
const getAccumulatedMonth = function(){
    return money - ExpensesMounth;
};

const accumulatedMonth  = getAccumulatedMonth(money, getExpensesMonth);

console.log("Месячный бюджет = ", accumulatedMonth);

/* за какой период будет достигнута цель */
const getTargetMonth = function(a){
    let month = Math.ceil(mission / a)
    if(month > 0) {
        return(`За ${month} месяцев будет достигнута цель ${mission}`);
    } else if(month < 0) {
        return("Цель не будет достигнута");
    };
};

console.log(getTargetMonth(accumulatedMonth));


let budgetDay = accumulatedMonth / 30;
console.log("Дневной бюджет = ", budgetDay);

let getStatusIncome = function() {
    if(budgetDay >= 1200) {
        return("У вас высокий уровень дохода");  
    } else if (budgetDay >= 600 && budgetDay <=1200) {
        return("У вас средний уровень дохода");
    } else if (budgetDay >= 0 && budgetDay <=600){
        return("К сожалению у вас уровень дохода ниже среднего");
    } else if (budgetDay < 0){
        return("Что то пошло не так");
    }; 
};

console.log(getStatusIncome());