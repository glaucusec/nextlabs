const cron = require("node-cron");
const puppeteerExtra = require("puppeteer-extra");
const stealth = require("puppeteer-extra-plugin-stealth");
const Task = require("../models/Task");

puppeteerExtra.use(stealth());

async function fetchAndRunDailyTasks() {
  try {
    const tasksWithAttributes = await Task.findAll({
      attributes: ["id", "link"],
    });

    await runDailyTasks(tasksWithAttributes);
  } catch (error) {
    console.error("Error fetching and running daily tasks:", error);
  }
}

async function runDailyTasks(tasks) {
  try {
    const browser = await puppeteerExtra.launch({
      headless: false,
      defaultViewport: null,
      userDataDir: "./tmp",
      args: ["--no-sandbox"],
    });

    for (const task of tasks) {
      const category = await getCategoryFromTaskLink(browser, task.link);
      if (category) {
        await updateTaskOnDatabase(task.id, category);
      } else {
        console.log("Invalid category | can't be fetched! not updated");
      }
    }

    await browser.close();
    console.log("All categories have been successfully fetched and updated");
  } catch (error) {
    console.error("Error running daily tasks:", error);
  }
}

async function getCategoryFromTaskLink(browser, link) {
  let page;
  try {
    page = await browser.newPage();
    await page.goto(link);
    const outerDiv = await page.$(".Uc6QCc");

    if (outerDiv) {
      const innerText = await outerDiv.$eval(".VfPpkd-vQzf8d", (element) => element.innerText);
      const words = innerText.split(" ");
      const lastWord = words[words.length - 1];
      return lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  } finally {
    await page.close();
  }
}

async function updateTaskOnDatabase(taskId, category) {
  try {
    const currTask = await Task.findByPk(taskId);
    currTask.category = category;
    currTask.subcategory = category;
    await currTask.save();
  } catch (error) {
    console.error("Error updating task on database:", error);
  }
}

cron.schedule("0 2 * * *", async () => {
  console.log("Running the nightly cron job...");
  await fetchAndRunDailyTasks();
  console.log("Finished the nightly cron job...");

});
