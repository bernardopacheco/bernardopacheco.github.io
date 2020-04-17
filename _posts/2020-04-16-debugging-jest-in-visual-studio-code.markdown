---
layout: post
title:  "Debugging Jest in Visual Studio Code"
description: How to debug Jest in Visual Studio Code
permalink: /debugging-jest-in-visual-studio-code
---

I've been working on different <a href="https://github.com/bernardopacheco/javascript-data-structures-algorithms" target="_blank">data structures and algorithms in JavaScript</a> recently. <a href="https://jestjs.io/en/" target="_blank">Jest</a> is the workforce to write and run my tests and Visual Studio Code is my preferred editor for coding. Here is the most simple way to debug your code using Jest and Visual Studio Code together.

<!--excerpt_separator-->

 While coding Quicksort tests were broken with no clue. I wish I could be able to put breakpoints and then step through the source with the inputs from my tests. I invested some time searching different blog posts and Stack Overflow questions and found out different approaches on how to do it, but they were old and had deprecated instructions. 
 
 Until I read <a href="https://jestjs.io/docs/en/troubleshooting#debugging-in-vs-code" target="_blank">Jest documentation</a>. Yes, I should have <a href="https://en.wikipedia.org/wiki/RTFM" target="_blank">RTFM</a>.

 Without further chatter, you only have to update your `.vscode/launch.json` file in Visual Studio Code with the content below, put a breakpoint in the code and press `F5` key to start debugging.

{% highlight javascript %}
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
{% endhighlight %}

I hope this tip can save you precious minutes of your time.
