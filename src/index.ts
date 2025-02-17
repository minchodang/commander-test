import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program.name('my-cli').description('A simple CLI built with Commander.js').version('1.0.0');

program
    .command('greet <name>')
    .description('Say hello to someone')
    .action(name => {
        console.log(chalk.green(`Hello, ${name}!`));
    });

program
    .command('sum <num1> <num2>')
    .description('Calculate the sum of two numbers')
    .action((num1, num2) => {
        const sum = parseFloat(num1) + parseFloat(num2);
        console.log(chalk.blue(`Result: ${sum}`));
    });

program.parse(process.argv);
