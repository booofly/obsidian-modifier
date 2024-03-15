# Obsidian Plugin - Taskmgr

这是一个帮你把多行文本生成Markdown任务列表的工具。
目前只是一个最早测试版本，不建议任何人使用。

This is a tool that helps you generate a Markdown task list from multi-line text.
It is currently only an early testing version and is not recommended for anyone to use.

### 背景 Background
Markdown要生成任务列表其实很简单了。  
但是我给大家讲个故事，是这样的。有一个周末，我在obsidian中填写我老婆下一周的菜单，因为我老婆正在怀孕，所以每周的菜单都是我提前计划的营养餐。当把菜单填完的时候，我总是用dataviewjs汇总下一周菜单，方便我每天查看，并且我需要根据这个菜单在网上购买所需要材料。可是在我买完材料后，总会发现又漏买了一些材料。因为一周这么多菜，太容易出错了，而且我没有checklist可以查看，这样会花费我很多的时间。于是我决定写个程序，根据已经定好的菜单，自动生成我需要采购的做菜材料。
至于为什么需要一个插件，而不是直接把购买的材料展现在页面上，这是熟知obsidian的人都知道的，数据总是会重新加载，我的任务列表失去了完成状态，所以我不得不开发一个插件，才有写文档的权限，这样方便把统计出来的采购任务放到一个文件中，每次重新统计也只会更新这个任务列表，同时保留它的完成状态，而不是全部任务都变成了未完成。

It is actually very simple to generate a task list in Markdown.
But let me tell you a story, it goes like this. One weekend, I filled out my wife's menu for the next week in obsidian. Because my wife is pregnant, the weekly menu is all nutritious meals that I plan in advance. When I finish filling out the menu, I always use dataviewjs to summarize the menu for the next week, which is convenient for me to check every day, and I need to purchase the required materials online based on this menu. But after I buy the materials, I always find that I missed buying some more materials. Because there are so many dishes a week, it’s too easy to make mistakes, and I don’t have a checklist to check, which will take a lot of time. So I decided to write a program to automatically generate the cooking ingredients I need to purchase based on the menu I have set.
As for why a plug-in is needed instead of directly displaying purchased materials on the page, this is known to anyone familiar with obsidian. The data will always be reloaded and my task list lost its completion status, so I had to develop a Only the plug-in has the permission to write documents, so that it is convenient to put the counted procurement tasks into a file. Each time the statistics is re-calculated, only this task list will be updated, while its completion status will be retained, instead of all tasks becoming undone.