'use strict';

let money = +prompt("Ваш месячный доход?"),
income = "фриланс",
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
deposit = confirm("Есть ли у вас депозит в банке?"),
mission = 3000,
period = 6,
expenses1 = prompt("Введите обязательную статью расходов?"),
amount1 = +prompt("Во сколько это обойдется?"),
expenses2 = prompt("Введите обязательную статью расходов?"),
amount2 = +prompt("Во сколько это обойдется?");

/* тип данных */
let showTypeOf = function(data){
    return typeof(data);
};

console.log("money: ", showTypeOf(money));
console.log("income: ", showTypeOf(income));
console.log("deposit: ", showTypeOf(deposit));

console.log(addExpenses.length);
/* console.log("Период равен",`${period}`, "месяцев" + ' и ' + 
    "Цель заработать", `${mission}`, "рублей/долларов/гривен/юани");  */

console.log(addExpenses.toLowerCase().split(','));

/* сумму всех обязательных расходов за месяц */
const getExpensesMonth = function(){
    return amount1 + amount2;
};

getExpensesMonth(amount1, amount2);
console.log("Расход за месяц", getExpensesMonth(amount1, amount2));

/* Накопления за месяц (Доходы минус расходы) */
const getAccumulatedMonth = function(){
    return money - getExpensesMonth();
};

const accumulatedMonth  = getAccumulatedMonth(money, getExpensesMonth);

console.log("Месячный бюджет = ", accumulatedMonth);

/* за какой период будет достигнута цель */
const getTargetMonth = function(a){
    return Math.ceil(mission / a);
};

//getTargetMonth(accumulatedMonth);

console.log("За", getTargetMonth(accumulatedMonth), "месяцев будет достигнута цель", `${mission}`);

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