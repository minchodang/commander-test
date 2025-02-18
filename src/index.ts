#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { exec } from 'node:child_process';

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
        const sum = Number.parseFloat(num1) + Number.parseFloat(num2);
        console.log(chalk.blue(`Result: ${sum}`));
    });

program
    .command('generate')
    .description('Generate API types from an OpenAPI spec using openapi-typescript')
    .action(async () => {
        // 1단계: OpenAPI 스펙 URL 입력받기
        const { inputUrl } = await inquirer.prompt([
            {
                type: 'input',
                name: 'inputUrl',
                message: 'Enter the OpenAPI specification URL:',
                validate: value => (value ? true : 'URL을 입력하세요.'),
            },
        ]);

        // 2단계: 출력 디렉토리 입력받기 (기본값 제공)
        const { outputDir } = await inquirer.prompt([
            {
                type: 'input',
                name: 'outputDir',
                message: 'Enter the output directory:',
                default: './src/__generated__',
            },
        ]);

        // 최종 생성 파일 경로
        const outputFile = `${outputDir}/api.ts`;
        const command = `pnpm openapi-typescript ${inputUrl} -o ${outputFile}`;

        console.log(chalk.yellow(`\n실행할 명령어: ${command}\n`));

        // 명령어 실행
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(chalk.red(`Error: ${error.message}`));
                return;
            }
            if (stderr) {
                console.error(chalk.red(`stderr: ${stderr}`));
            }
            console.log(chalk.green(`stdout: ${stdout}`));
            console.log(chalk.green('API types generated successfully!'));
        });
    });

program.parse(process.argv);
