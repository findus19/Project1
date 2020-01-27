'use strict';

let money = +prompt("Ваш месячный доход?"),
income = "фриланс",
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
deposit = prompt("Есть ли у вас депозит в банке?"),
mission = 3000,
period = 6,
expenses1 = prompt("Введите обязательную статью расходов?"),
amount1 = +prompt("Во сколько это обойдется?"),
expenses2 = prompt("Введите обязательную статью расходов?"),
amount2 = +prompt("Во сколько это обойдется?");

if(deposit == 'да') {
    console.log(!!deposit);  
} else if (deposit == "нет") {
    !deposit;
    console.log(!deposit);
} else {
    alert("Вы ввели неверно депозит");
}; 

/* console.log(addExpenses.length);
console.log("Период равен",`${period}`, "месяцев" + ' и ' + 
    "Цель заработать", `${mission}`, "рублей/долларов/гривен/юани"); 

console.log(addExpenses.toLowerCase().split(','));*/

let budgetMonth = money - (amount1 + amount2);
console.log("Месячный бюджет = ", budgetMonth);

let budgetDay = budgetMonth / 30;
console.log("Дневной бюджет = ", budgetDay);

let intent = Math.ceil(mission / budgetMonth);
console.log("За",`${intent}`, "месяцев будет достигнута цель", `${mission}`);

if(budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");  
} else if (budgetDay >= 600 && budgetDay <=1200) {
    console.log("У вас средний уровень дохода");
} else if (budgetDay >= 0 && budgetDay <=600){
    console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay < 0){
    console.log("Что то пошло не так");
}; 