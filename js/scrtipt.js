let money = 1000,
income = "фриланс",
addExpenses = "ИнТеРнЕт, ДоРоГа, ЕдА, КоМмУнАлКа, ТеЛеФоН",
deposit = true,
mission = 100000,
period = 12;

console.log("money: ", typeof money);
console.log("income: ", typeof income);
console.log("deposit: ", typeof deposit);

console.log(addExpenses.length);

console.log("Период равен",`${period}`, "месяцев" + ' и ' + 
    "Цель заработать", `${mission}`, "рублей/долларов/гривен/юани");

/* addExpenses1 = addExpenses.toLowerCase(); */
console.log(addExpenses.toLowerCase().split(','));

let budgetDay = money / 30;
console.log("Дневной бюджет = ", budgetDay);