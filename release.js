import { execSync } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';

async function runRelease() {
  try {
    // 問題列表 (版號、是否為全國客製、是否需要執行CI/CD、是否需要建立Tag)
    const answers = await inquirer.prompt([
      {
        name: 'version',
        type: 'input',
        message: '請輸入版號:',
        validate: (input) => {
          if (!input)
            return '版號不得為空';
          if (!/^\d+\.\d+\.\d+$/.test(input))
            return '版號格式錯誤，請輸入正確的格式，例如: 1.0.0';
          return true;
        },
      },
      {
        name: 'tag',
        type: 'confirm',
        message: '是否需要建立Tag?',
        validate: input => input ? true : '版號不得為空',
      },
    ]);

    const { version, tag } = answers;

    // 確認是否執行此次發佈
    const { confirm } = await inquirer.prompt([
      {
        name: 'confirm',
        type: 'confirm',
        message: chalk.yellow('是否確認執行此次發佈?'),
      },
    ]);

    // 若取消發佈，則結束
    if (!confirm) {
      console.log(chalk.red('\nRelease canceled.'));
      return;
    }

    // 執行 CI/CD
    if (rebuild) {
      // 更新 package.json 中的版本號
      const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      packageJson.version = version;
      fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
      execSync('git add package.json', { stdio: 'inherit' });
      console.log(chalk.green(`\npackage.json 版本號已更新為: ${version}`));
    }

    // 建立 Tag
    if (tag) {
      console.log(chalk.yellow(`\nCreating tag for version ${version}...`));
      execSync(`git tag -a ${version} -m "" -fa`, { stdio: 'inherit' });
      execSync(`git push origin ${version} -f`, { stdio: 'inherit' });
      console.log(chalk.green(`Tag ${version} created successfully.`));
    }
  }
  catch (error) {
    console.error(chalk.red('\nAn error occurred:'), chalk.red(error));
  }
}

runRelease();
