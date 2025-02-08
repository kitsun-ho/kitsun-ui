import { execSync } from 'child_process';
import process from 'process';
import chalk from 'chalk';
import inquirer from 'inquirer';

// 📌 確保 `dev` 和 `main` 都是最新的，然後合併
function executeCICD() {
  try {
    console.log(chalk.yellow('\n🔄 檢查並更新 dev 分支...'));
    execSync('git checkout dev', { stdio: 'inherit' });
    execSync('git pull origin dev', { stdio: 'inherit' });

    console.log(chalk.yellow('\n🔄 切換到 main 分支並更新...'));
    execSync('git checkout main', { stdio: 'inherit' });
    execSync('git pull origin main', { stdio: 'inherit' });

    console.log(chalk.yellow('\n🔄 合併 dev 分支到 main（使用 --no-ff）...'));
    execSync('git merge --no-ff dev -m "Merge dev into main for release"', { stdio: 'inherit' });

    console.log(chalk.green('\n🚀 推送 main 分支到遠端...'));
    execSync('git push origin main', { stdio: 'inherit' });

    console.log(chalk.green('\n✅ 發佈完成！'));

    console.log(chalk.yellow('\n🔄 切換回 dev 分支，以繼續開發...'));
    execSync('git checkout dev', { stdio: 'inherit' });
  } catch (error) {
    console.error(chalk.red('\n❌ 發生錯誤:'), chalk.red(error.message));
    console.log(chalk.red('\n⚠️ 可能需要手動解決衝突！請使用 `git status` 查看詳細資訊。'));
    process.exit(1);
  }
}

// 📌 執行完整流程
async function runRelease() {
  try {
    const answers = await inquirer.prompt([
      {
        name: 'rebuild',
        type: 'confirm',
        message: '是否確認執行此次發佈？',
      },
    ]);

    if (answers.rebuild) {
      executeCICD();
    } else {
      console.log(chalk.red('\n🚫 發佈已取消！'));
    }
  } catch (error) {
    console.error(chalk.red('\n❌ 發生錯誤:'), chalk.red(error.message));
    process.exit(1);
  }
}

runRelease();
