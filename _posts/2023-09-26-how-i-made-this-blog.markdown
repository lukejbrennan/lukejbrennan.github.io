---
layout: post
title:  "How I made this blog"
excerpt: "A nice post"
date:   2023-09-28 10:00:00
categories: 
- Writing and Blogging
---

Hello world, this is a blog that I wrote using GitHub Pages and Jekyll. Below, are a list of resources that I found helpful. You can also see *exactly* what's going on with this site by going to the [github repository](https://github.com/lukejbrennan/lukejbrennan.github.io)

# Github Pages
This site is hosted with [GitHub pages](https://pages.github.com/). If you follow that link, you'll see a very brief overview on how you can create and host a site through github. I liked the [github documentaion](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) a bit more (just more verbose). 
 
# Jekyll
What is Jekyll? According to chat: Jekyll is a static site generator that transforms plain text files, often written in Markdown, into fully functional websites. It simplifies web development by eliminating the need for a database, server-side scripting, and complex content management systems, making it an efficient choice for creating fast, secure, and easily maintainable websites.

Something that's kind of sweet is that Jekyll is sponsored? Paid for? by GitHub... 
> Sick of dealing with hosting companies? GitHub Pages is powered by Jekyll, so you can easily deploy your site using GitHub for free—custom domain name and all. 

So they run really well together. Here are the [docs from jekyll](http://jekyllrb.com/docs/) that will walk through how to download.

# Influencers...
I found [this site](https://karpathy.github.io/2014/07/01/switching-to-jekyll/) which was the main reason for me going the github / jekyll route. While it was a little confusing to follow along, and not much of a tutorial, it was helpful for understanding just how easy it could be to set up a blog with the G & J method. 

This is what ultimately got my attention: 
> My blog posts are just files in a single folder _posts, written in Markdown. Including this post, of course.... The entire code base consists of like 7 files. It’s trivial to tweak the CSS or any of the HTML templates. For example, I added Google Analytics tracking code to all my pages by tweaking the html template, and also Disqus comments to all my posts by tweaking the posts template with the Disqus Javascript code.

Sounds sick!

# Other resources
- [Markdown](https://www.markdownguide.org/basic-syntax/). Markdown is a simple markup language that allows you to add formatting to plaintext. It's cool! The headers on this page, for example,were created by writing "# Other resouces". 
- [minima](https://github.com/jekyll/minima). This is the styling / theme that I'm using. But [there's a bunch](https://pages.github.com/themes/) you can choose from. 
- [blog made with minima](https://talk.jekyllrb.com/t/learn-how-to-add-featured-images-to-your-posts/4852). This was helpful just to see what was possible and what other people were doing. 
- [on overriding minima defaults](https://jekyllrb.com/docs/themes/#overriding-theme-defaults). Super helpful if/when you get to re-writing / customizing the built in templates for pages and such. 
- [On adding categories](https://blog.webjeda.com/jekyll-categories/). For adding blog posts to different categories and displaying them by category or topic.
- [This medium article](https://medium.com/crypticcrazeforcs/a-step-by-step-guide-to-building-your-own-website-using-jekyll-i-201ecf2b3547) helped me figure out how to create folders and also how to programatically write for loops based on site material... 


# Terminal commands && Publishing

```
// To see the OG minima folders. and then you can copy/edit them! 
open $(bundle info --path minima)
``` 

```
// To run your source code locally
// Go to http://127.0.0.1:4000 to see your local changes
bundle exec jekyll serve
```

```
// How to publish 
git add .  
git commit -m "adding a new build 
git push origin gh-pages
```

Then you can see the live site at your github repository. Mine is right here at [https://lukejbrennan.github.io/](https://lukejbrennan.github.io/)!


