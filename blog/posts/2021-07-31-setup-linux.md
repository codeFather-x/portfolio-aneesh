---
title: How to automatically setup your linux environment
date: 2021-07-31 
excerpt: >
  Setting up linux is a common part of every developer's journey. However, the setup after OS installation is very tedious and time consuming. Or is it?
tags: [Linux, Tech]
---

![linux](../images/linux_automate/1.png)

## What do I mean by environment setup?
Linux installations can be easily messed up if you are still a beginner or intermediate developer. Often, I personally found myself reinstalling the OS completely as I had messed up some configuration or the other. Once, I tried to install a newer version (not update, I was trying a new release altogether) of the linux kernel. Oh boy, did I mess up my Ubuntu. So, if you also find yourself installing and setting up your linux environment time and again like me, I have just the thing that will smooth the process like butter on warm bread. <br/><br/>

There is a plethora of linux distros available now, with many coming with inbuilt packages for various use cases. However, more often than not you still need to install many packages and softwares for your setup. For most, installing their favourite browser and IDE falvour are the things they need to setup separately. You may wish to install your development lanugages and accordingly alter the system environment variables. For a penetration tester or security engineer, you may require installation of various tools. In my experience, many times we need to install dependencies separately as well for the tools to run. Open Source tools especially don't often come packaged in a .deb or apt package and hence we need to install their dependencies on our own. I find myself even adding extra package installers (like snap and yum) for my usage. 


## How do we automate it?

![linux](../images/linux_automate/2.jpg)

I don't want you to think the title to be a clickbait, so I will cut to the chase. I assume you understand the installation of tools and packages using bash (terminal) commands. The commands we usually run in a terminal can be written in a bash .sh script that executes these commands sequentially. All one has to do then is to run "chmod +x ./file_name.sh" to give run permission to the script, run it and then sit back and have their favourite beverage while the script takes care of every single thing in your setup. I agree this is not a new concept or something out of the world that I am talking about. But one can't deny that it is not a popular practice, even though its pure efficiency without compromise. There are enough bash scripting resources on the internet to get you started, hence I will just link one below to get you started: [Bash Scripting](https://ryanstutorials.net/bash-scripting-tutorial/bash-script.php)

I might be the very few people to say this but code speaks louder than words (especially nicely written code :P ). So here is my init bash script for my personal linux environment setup: [Link](https://gist.github.com/codeFather-x/661c6fb8a47399f8ecc2ea877ac2806b). You will find echo commands that explain what gets installed as well. Feel free to fork it and add your flavour of setup to it. I will keep updating the gist according to my needs of course. Automating all tasks, one at a time!


Image Credit: [OpenSource](https://opensource.com/sites/default/files/styles/image-full-size/public/lead-images/command_line_prompt.png?itok=wbGiJ_yg),[MemeCreator](https://www.memecreator.org/static/images/memes/5307414.jpg)

