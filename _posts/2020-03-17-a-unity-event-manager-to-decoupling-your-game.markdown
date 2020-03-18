---
layout: post
title:  "A Unity Event Manager to Decoupling Your Game"
description: A Unity event manager that helps to decouple your games.
permalink: /a-unity-event-manager-to-decoupling-your-game
---

A common way to compose a game scene in Unity is attaching one GameObject to another to share methods and properties. This practice causes a highly coupled architecture that is hard to maintain. Unity does provide a Messaging System but it limits the parameter's type that can be sent.

<!--excerpt_separator-->

In order to overcome these problems, I created a pure C# Event Manager mechanism. An event-driven architecture dramatically helped to structure my Unity game <a href="/projects#pixel-maze">Pixel Maze</a>. Triggering events to communicate among components allowed to decouple components and compose elaborated functionalities.

## How to Set up

In the first game scene, create an empty Unity GameObject named *EventManager* and **attach** the `EventManager.cs` script to it. This script is set to `DontDestroyOnLoad`, i.e., it won't be destroyed when reloading scene.

<p><strong>EventManager.cs</strong></p>
<script src="https://gist.github.com/bernardopacheco/2b853161a9d3b8088e5f153b83342d92.js?file=01_EventManager.cs"></script>

## How to Use

No parameter:

{% highlight javascript %}
EventManager.TriggerEvent("gameOver", null);
{% endhighlight %}

1 parameter:

{% highlight javascript %}
EventManager.TriggerEvent("gamePause", new Dictionary<string, object> { { "pause", true } });
{% endhighlight %}

2 or more parameters:

{% highlight javascript %}
EventManager.TriggerEvent("addReward", 
  new Dictionary<string, object> {
    { "name", "candy" },
    { "amount", 5 } 
  });
{% endhighlight %}

The `Producer.cs` and `Consumer.cs` classes below show how an event is published and consumed. In this example, when a coin is collected, an `addCoins` event is published with the collected `amount`. A consumer receives the amount of coins collected and update its own coins amount.

<p><strong>Producer.cs</strong></p>
<script src="https://gist.github.com/bernardopacheco/2b853161a9d3b8088e5f153b83342d92.js?file=02_Producer.cs"></script>

<p><strong>Consumer.cs</strong></p>
<script src="https://gist.github.com/bernardopacheco/2b853161a9d3b8088e5f153b83342d92.js?file=03_Consumer.cs"></script>