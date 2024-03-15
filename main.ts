import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, normalizePath,DataAdapter, Vault, FileSystemAdapter, TFile } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

class Task{
	task: string
	check: boolean
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status Bar Text');

		this.registerMarkdownCodeBlockProcessor("task", (source, el, ctx) => {
			/*
				```task
					src "more/task.md"
					task1
					task2
					task3
					...
				```
			*/

			const taskfile = "task.md"
			let file = this.app.vault.getFileByPath(taskfile)
			if(file === null){return}
			// {
			let f = this.app.vault.read(file)
			let fstring = ""
			f.then(v => { 
				// 定义任务识别函数
				let identifyTasks = (content: string) : Task[] => {
					const taskPrefix: string = '- [ ] ';
					const completedPrefix: string = '- [x] ';
					const tasks: string[] = content.split('\n').filter(line => {
						return line.startsWith(taskPrefix) || line.startsWith(completedPrefix);
					});

					return tasks.map(task => {
						const taskWithoutPrefix: string = task.replace(taskPrefix, '').replace(completedPrefix, '');
						const isCompleted: boolean = task.startsWith(completedPrefix);
						return { task: taskWithoutPrefix, check: isCompleted };
					});
				}

				// 比较两个任务数组并更新 taskNew 的 check 属性
				const updateTaskChecks = (taskOld: Task[], taskNew: Task[]): void => {
					for (const task of taskOld) {
						for (const newTask of taskNew) {
							if (newTask.task === task.task) {
								newTask.check = task.check;
							}
						}
					}
				}
				

				// 获取任务对象
				const tasksOld: Task[] = identifyTasks(v);
				let tasksNew = source.split('\n').filter(line => line.trim() !== "").map(task => {
					return {task: task, check: false}
				})
				if(!tasksNew){return}

				updateTaskChecks(tasksOld, tasksNew)
				tasksNew.sort((a, b) => {
					// 如果 a 的 check 属性为 false，而 b 的 check 属性为 true，返回 -1 以将 a 排在前面
					if (a.check === false && b.check === true) {
						return -1;
					}
					// 如果 a 的 check 属性为 true，而 b 的 check 属性为 false，返回 1 以将 b 排在前面
					if (a.check === true && b.check === false) {
						return 1;
					}
					// 其他情况返回 0，保持原来的相对顺序
					return 0;
				})
				
				const planttext =  tasksNew.map(task => `- ${task.check? '[x]' : '[ ]'} ${task.task}`).join("\n");
				
				// console.log(planttext)
				this.app.vault.adapter.write(taskfile, planttext)
			})


			//============================
			// const rows = source.split("\n").filter((row) => row.length > 0);
	  
			// const table = el.createEl("table");
			// const body = table.createEl("tbody");
	  
			// for (let i = 0; i < rows.length; i++) {
			//   const cols = rows[i].split(",");
	  
			//   const row = body.createEl("tr");
	  
			//   for (let j = 0; j < cols.length; j++) {
			// 	row.createEl("td", { text: cols[j] });
			//   }
			// }
		  });


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		// new Setting(containerEl)
		// 	.setName('Setting #1')
		// 	.setDesc('It\'s a secret')
		// 	.addText(text => text
		// 		.setPlaceholder('Enter your secret')
		// 		.setValue(this.plugin.settings.mySetting)
		// 		.onChange(async (value) => {
		// 			this.plugin.settings.mySetting = value;
		// 			await this.plugin.saveSettings();
		// 		}));
	}
}
