---
layout: post
title:  "How I Made My Blog with Github, Jekyll and Material Design"
description: Using GitHub, Jekyll and Material Design, I decided to create my own blog from scratch to learn something. This blog is the result.
permalink: /how-i-made-my-blog-with-github-jekyll-and-material-design
---
![How I made my blog with Github, Jekyll and Material Design cover image](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/github_jekyll_materialdesign.jpg)

Every day we learn new technologies, we know more about what we thought we knew
everything and we solve problems. But most of the time, this knowledge is not
passed forward, sometimes it only arrives to our coworkers. Thinking about it,
I decided (finally) to create my blog. I decided not to use a out of the box blog, but to
build one from scratch to learn something. This post talks about this experience
and this blog where you are is the result.

<!--excerpt_separator-->

## Hosting from GitHub

To start the project, I needed some place to host my blog. I wondered the idea of renting an instance on [Amazon EC2][1]. There is nothing wrong with EC2, but when I met [GitHub Pages][2] I realized it was the ideal solution for my case. It is an easy hosting solution for websites with HTML, CSS, and JavaScript files. GitHub Pages offers free hosting for a site per GitHub account and organization, and unlimited project sites. On a daily basis there is no bureaucracy: just edit, commit and push your changes to update the site's content. If the repository is public (my case), anyone in the community can contribute by submitting a pull request to improve the content of a post.

To create a personal site on GitHub Pages simply create a repository called `username.github.io`, being `username` your username on GitHub. Then, create an `index.html` file, add some content, commit and push your changes. Now, just go in the browser and access the site in `http://username.github.io`. For my persoal blog, I created a respository called `bernardopacheco.github.io` which can be accessed in `http://bernardopacheco.github.io`.

Although the `bernardopacheco.github.io` worked well, I wanted to put my custom domain `bernardopacheco.net`. After setting up my custom domain through my DNS provider, I had to say to GitHub to redirect any request with the host `bernardopacheco.net` to `bernardopacheco.github.io`. To do that, all I had to do was to create a file in the root of the respository called [CNAME][4] containing my custom domain.

More information:

- [User, Organization, and Project Pages][3];
- [About custom domains for GitHub Pages sites][6];
- [Adding a CNAME file to your repository][5].

## Blogging with Jekyll

Beyond the support of regular HTML content, the real power behind GitHub Pages is [Jekyll][7], a simple, blog-aware static site generator. There is no database, just [Markdown][8] (or [Textile][9]) [Liquid][10], HTML and CSS. Jekyll takes all your content, renders Markdown and Liquid templates, and generates a complete, static website ready to be served.

The main strengths of Jekyll are:

1. Powerful and flexible configuration through [YAML][13] files;

2. Easy page and post configuration using [YAML Front Matter][14], a set of metadata to specify things like default layout, custom title, author name or a  different date for the post;

3. Support for syntax highlighting of more than 100 languages with [Pygments][11] or [Rouge][12];

4. Support for the [Liquid templating language][10] to easily HTML markup through variables, tags and filters;

5. Flexible way to customize the [permalinks][15] of the site.

Jekyll is a really fantastic tool that together with GitHub Pages made the development of this blog less painful and more fun.

## Makeup with Material Design

[Material Design][16] is a design language developed by Google that uses grid-based layouts, responsive animations and transitions, padding, and depth effects such as lighting and shadows. It's an evolving spec which has [continuous releases][17]. I used this design language to build the blog layout. So, did I use **every** aspect of the specification? No way. The material design covers various topics, some make sense for my blog, others not.

### Typography

The [typographic section][20] recomends the standard typeface [Roboto][18]. It is a beautiful font that has been refined to work across the wider set of platforms. To avoid a messy layout, the styles was based on a typographic scale of 12, 14, 16, 20, 34, and 42 px. Furthermore, I considered this advice on readability and line length from the [Baymard Institute][21]: *"You should have around 60 characters per line if you want a good reading experience. Having the right amount of characters on each line is key to the readability of your text."*.

### Text colors and palette

The material design has an [entire section][19] to inspire you about colors. One interesting tip was the different shades for text, icons and dividers to make a hierarchy of information. The image below presents the color scale adopted:

![Text, icons and dividers color palette](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/text-color-palette.jpg "Text, icons and dividers color palette")

As my primary and secondary color palettes, I liked these ones to menu, link
and text selection colors:

![Primary color palette](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/primary-color-palette.jpg "Primary color palette")

![Secondary color palette](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/secondary-color-palette.jpg "Secondary color palette")

Not all colors were used, only the primary 500, primary 700, accent 200 and accent 400 were sufficient to compose the final color palette.

## GitHub and Disqus API integration

In the lower left corner of this blog, there are two informations about this
repository on GitHub: stars counter, a way that people bookmark your project,
and fork counter, how many copies of your project were made. To fecth the summary
representation of the repository through the [GitHub API][22], I just called
`https://api.github.com/repos/bernardopacheco/bernardopacheco.github.io?callback=yourcallback` and got
`stargazers_count` and `forks` properties. Because I was using JSONP,
a `callback` property must be passed in the query string.

Another API integration was made with [Disqus][23]. Disqus is a networked
community platform that provides a feature-rich comment system to leverage the
community discussion about some post. This blog utilizes three pieces:
comment system widget, comments count and recent comments widget. The first two
were installed with a drop-in [code snippet][24]. The last one, recent comments
widget, was a custom component built with the [Disqus API][25]. To fetch a
post's list of comments, I called `https://disqus.com/api/3.0/forums/listPosts.jsonp?forum=bernardopacheco&related=thread&api_key=<apikey>&callback=yourcallback`,
being `api_key` my public API key value on Disqus and a `callback` to get the
response of the JSONP request.

## Being smarter with Grunt

The [Grunt Task Runner][27] help me to automate the repetitive tasks like minification, concatenation, compilation and linting of the source code while building the project. You can check all the tasks and it's settings in the [Gruntfile.js][26] file. In fact, I would like to highlight one particular task and it's results: the [grunt-uncss][28] task. Powered by [PhantomJS][29], the grunt-uncss task removes unused CSS. This blog uses the [Twitter Bootstrap] [30] and the [Font Awesome][31] libraries, but it uses less than 10% of the CSS they provide. As a result, they can end up with inflated stylesheets which can significantly increase page load time and affect performance. Yes, performance matters. As Jakob Nielsen said in his [Website Response Times][32] article, "*[...] people **engage** more with a site when they can move freely and focus on the content instead of on their endless wait.*".

The figure below shows a piece of the output generated from the execution of the
Grunt's tasks:

[![Removing unused CSS with UnCSS](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/uncss.jpg "Removing unused CSS with UnCSS")](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/uncss.jpg)

The first task `less:build` concatenates and compiles all the less source code
and generates a single stylesheet file with 167.88 kB in size. The next task
`uncss:dist` removes all the unused CSS reducing the file size of 167.88 kB to
17 kB, that is, 90% of the stylesheet was removed. The last task `less:dist`
minifies the cleaned stylesheet reducing the file size of 17 kB to 11.84 kB.
Thus, reducing of 167.88 kB to 11.84 kB, this shows that only 7% was a useful
stylesheet code.

One last comment: You may have noticed a pattern in the name of the generated
files. To prevent the browser using an old version of a cached file
while there is a newer version of the same file, the name of the stylesheet and
script files is generated in the form `<github-username>-<blog-version>.[css,js]`,
for example, `bernardopacheco-1.0.0.css` and `bernardopacheco-1.0.0.js`.

## Start your own blog!

Anyone is welcome to clone, fork and contribute to this project. If you are
interested in making your blog from this project, you have to install the
following dependencies:

- [Git][33];
- [Node.js][34];
- [Bower][35];
- [Grunt][27];
- [Jekyll][7].

In the root directory of the repository, run the following commands:

{% highlight javascript %}
npm install // install node modules
bower install // install client side libraries
jekyll build // build the site
grunt // build project
jekyll serve // run the site
{% endhighlight %}

After these commands, you can go in your browser and access the site locally in
`http://0.0.0.0:4000`.

To customize the blog with your informations, you need to change two files:
`_config.yml` and `src/css/variables.less`. Here is the content of the
`_config.yml` file:

[![Blog configuration](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/config.jpg "Blog configuration")](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/config.jpg)

The properties are self-explanatory. With these informations, all the site
structure are generated, including file names, share options, number of posts
per page, GitHub links, repository status and Disqus widgets. For instance,
in the `share` section, if you don't want a Facebook share button, just set
the `facebook` property to `false` and the Grunt automation process will be
responsible for removing the Facebook share script of the final generated script
file. Nice!

This is the content of the `src/css/variables.less` file:

[![Blog configuration](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/less-variables.jpg "Blog configuration")](/assets/images/posts/2015-01-03-how-i-made-my-blog-with-github-jekyll-and-material-design/less-variables.jpg)

If you want to alter the typography, you can change the font size and font
family. You can also change the primary and secondary color palettes, as well as
the text colors hierarchy. If you wish to increase or decrease the width of the
side menu, you can also do it. Now, if you want to make other changes that are not
possible via configuration files, do this, touch the source code and hack
something! It will be great to see other creative solutions!

[1]: https://aws.amazon.com/ec2/
[2]: https://pages.github.com/
[3]: https://help.github.com/articles/user-organization-and-project-pages/
[4]: https://github.com/bernardopacheco/bernardopacheco.github.io/blob/master/CNAME
[5]: https://help.github.com/articles/adding-a-cname-file-to-your-repository/
[6]: https://help.github.com/articles/about-custom-domains-for-github-pages-sites/
[7]: http://jekyllrb.com/
[8]: http://daringfireball.net/projects/markdown/
[9]: http://redcloth.org/textile
[10]: https://github.com/Shopify/liquid/wiki
[11]: http://pygments.org/
[12]: https://github.com/jayferd/rouge
[13]: http://www.yaml.org/
[14]: http://jekyllrb.com/docs/frontmatter/
[15]: http://jekyllrb.com/docs/permalinks/
[16]: http://www.google.com.br/design/spec/material-design/introduction.html
[17]: http://www.google.com.br/design/spec/whats-new/whats-new.html
[18]: http://www.google.com/fonts/specimen/Roboto
[19]: http://www.google.com.br/design/spec/style/color.html#
[20]: http://www.google.com.br/design/spec/style/typography.html
[21]: http://baymard.com/blog/line-length-readability
[22]: https://developer.github.com/v3/
[23]: https://disqus.com
[24]: https://disqus.com/admin/universalcode/
[25]: https://disqus.com/api/docs/
[26]: https://github.com/bernardopacheco/bernardopacheco.github.io/blob/master/Gruntfile.js
[27]: http://gruntjs.com/
[28]: https://github.com/addyosmani/grunt-uncss
[29]: http://phantomjs.org/
[30]: http://getbootstrap.com/
[31]: http://fortawesome.github.io/Font-Awesome/
[32]: http://www.nngroup.com/articles/website-response-times/
[33]: http://git-scm.com/
[34]: http://nodejs.org/
[35]: http://bower.io/
