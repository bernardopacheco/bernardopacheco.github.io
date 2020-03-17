---
layout: page
title: Articles
permalink: /articles/
---
# Articles

<ul id="articles-list">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <div class="post-meta">
        {{ post.date | date: "%B" }}
        {{ post.date | date: "%d" }},
        {{ post.date | date: "%Y" }}
      </div>
    </li>
  {% endfor %}
</ul>
