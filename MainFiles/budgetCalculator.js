const fs = require('node:fs/promises');

const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

async function ask(categories) {
    const answer = await rl.question(`Enter an amount for ${categories} \n`);
    return answer;

}

async function main() {
    const data = await fs.readFile('budget.json', 'utf-8'); // reading the JSON file
    const budget = JSON.parse(data); // converting JSON string into object
 
    let totalRemaining = 0;
    for (let category in budget) {

        let moneySpent = await ask(category);
        if (moneySpent === 'reset') {
            for (let cat in budget) {
                budget[cat].spent = 0;
            }
            console.log("All budgets reset");
            break;
        }
        else {
            let amount = Number(moneySpent);
            if (amount > budget[category].totalBudget) {
                console.log(`Bhai paise nhi hai ( ${budget[category].totalBudget} ) \n`);
            }

            else if (amount < 0) {
                console.log(`invalid amount`);
            }

            else {
                budget[category].spent += amount;
            let remaining = budget[category].totalBudget - budget[category].spent;
            console.log(`${category} remaining is ${remaining}`);
            totalRemaining += remaining;
            }

            
        }

    }
    console.log(`Total remaining balance ${totalRemaining}`);
    await fs.writeFile('budget.json', JSON.stringify(budget, null, 2)); // writing the JSON file
    rl.close();
}
main();
