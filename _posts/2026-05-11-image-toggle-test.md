---
layout: post
title: "Image Toggle Test"
category: [Test]
---

This is a test post with expandable sections. Click any bar to reveal or hide what's inside.

Hello world, this is a blog that I wrote using GitHub Pages and Jekyll. Below, are a list of resources that I found helpful. You can also see exactly what’s going on with this site by going to the github repository

Github Pages
This site is hosted with GitHub pages. If you follow that link, you’ll see a very brief overview on how you can create and host a site through github. I liked the github documentaion because it was a little more detailed.

Jekyll
What is Jekyll? According to chat: Jekyll is a static site generator that transforms plain text files, often written in Markdown, into fully functional websites. It simplifies web development by eliminating the need for a database, server-side scripting, and complex content management systems, making it an efficient choice for creating fast, secure, and easily maintainable websites.



{% capture c1 %}
<p>First time I saw this I thought it was a painting. Turns out it was just a Tuesday.</p>
<img src="/assets/images/IMG_6539.jpeg" alt="Near the water">
{% endcapture %}


Something that’s kind of sweet is that Jekyll is sponsored? Paid for? by GitHub… GitHub Pages is powered by Jekyll, so you can easily deploy your site using GitHub for free—custom domain name and all.

So they run really well together. Here are the docs from jekyll that will walk through how to download.

How I Got Into This
I found this site which was the main reason for me going the github / jekyll route. While it was a little confusing to follow along, and not much of a tutorial, it was helpful for understanding just how easy it could be to set up a blog with the G & J method.

This is what ultimately got my attention:

My blog posts are just files in a single folder _posts, written in Markdown. Including this post, of course…. The entire code base consists of like 7 files. It’s trivial to tweak the CSS or any of the HTML templates. For example, I added Google Analytics tracking code to all my pages by tweaking the html template, and also Disqus comments to all my posts by tweaking the posts template with the Disqus Javascript code.

That sounded pretty cool to me! So I went for it… I was able to set up comments, some HTML templates,

Other Resources
Markdown. Markdown is a simple markup language that allows you to add formatting to plaintext. It’s cool! The headers on this page, for example,were created by writing “# Other resouces”.
minima. This is the styling / theme that I’m using. But there’s a bunch you can choose from.
blog made with minima. This was helpful just to see what was possible and what other people were doing.
on overriding minima defaults. Super helpful if/when you get to re-writing / customizing the built in templates for pages and such.
On adding categories. For adding blog posts to different categories and displaying them by category or topic.
This medium article helped me figure out how to create folders and also how to programatically write for loops based on site material…

{% include reveal-block.html label="Somewhere near the water" content=c1 %}

{% capture c2 %}


<p>You ever walk past something and then just... carry it with you for the rest of the day? That happened here. Still not totally sure what it means.</p>
<img src="/assets/images/IMG_6555.jpeg" alt="Something to think about">
<p>Anyway. Moving on.</p>
{% endcapture %}


Something that’s kind of sweet is that Jekyll is sponsored? Paid for? by GitHub… GitHub Pages is powered by Jekyll, so you can easily deploy your site using GitHub for free—custom domain name and all.

So they run really well together. Here are the docs from jekyll that will walk through how to download.

How I Got Into This
I found this site which was the main reason for me going the github / jekyll route. While it was a little confusing to follow along, and not much of a tutorial, it was helpful for understanding just how easy it could be to set up a blog with the G & J method.

This is what ultimately got my attention:

My blog posts are just files in a single folder _posts, written in Markdown. Including this post, of course…. The entire code base consists of like 7 files. It’s trivial to tweak the CSS or any of the HTML templates. For example, I added Google Analytics tracking code to all my pages by tweaking the html template, and also Disqus comments to all my posts by tweaking the posts template with the Disqus Javascript code.

That sounded pretty cool to me! So I went for it… I was able to set up comments, some HTML templates,

Other Resources
Markdown. Markdown is a simple markup language that allows you to add formatting to plaintext. It’s cool! The headers on this page, for example,were created by writing “# Other resouces”.
minima. This is the styling / theme that I’m using. But there’s a bunch you can choose from.
blog made with minima. This was helpful just to see what was possible and what other people were doing.
on overriding minima defaults. Super helpful if/when you get to re-writing / customizing the built in templates for pages and such.
On adding categories. For adding blog posts to different categories and displaying them by category or topic.
This medium article helped me figure out how to create folders and also how to programatically write for loops based on site material…

this is the regular paragraph part. i do need to write somethings that just live between blocks

{% include reveal-block.html label="The thing I can't stop thinking about" content=c2 no_js=true %}

{% capture c3 %}
<p>These two were taken about thirty seconds apart. Completely different vibes.</p>
<img src="/assets/images/IMG_6577.jpeg" alt="Photo one">
<br><br>
<img src="/assets/images/IMG_6584.jpeg" alt="Photo two">
<p>Make of that what you will.</p>


{% endcapture %}


Something that’s kind of sweet is that Jekyll is sponsored? Paid for? by GitHub… GitHub Pages is powered by Jekyll, so you can easily deploy your site using GitHub for free—custom domain name and all.

So they run really well together. Here are the docs from jekyll that will walk through how to download.

How I Got Into This
I found this site which was the main reason for me going the github / jekyll route. While it was a little confusing to follow along, and not much of a tutorial, it was helpful for understanding just how easy it could be to set up a blog with the G & J method.

This is what ultimately got my attention:

My blog posts are just files in a single folder _posts, written in Markdown. Including this post, of course…. The entire code base consists of like 7 files. It’s trivial to tweak the CSS or any of the HTML templates. For example, I added Google Analytics tracking code to all my pages by tweaking the html template, and also Disqus comments to all my posts by tweaking the posts template with the Disqus Javascript code.

That sounded pretty cool to me! So I went for it… I was able to set up comments, some HTML templates,

Other Resources
Markdown. Markdown is a simple markup language that allows you to add formatting to plaintext. It’s cool! The headers on this page, for example,were created by writing “# Other resouces”.
minima. This is the styling / theme that I’m using. But there’s a bunch you can choose from.
blog made with minima. This was helpful just to see what was possible and what other people were doing.
on overriding minima defaults. Super helpful if/when you get to re-writing / customizing the built in templates for pages and such.
On adding categories. For adding blog posts to different categories and displaying them by category or topic.
This medium article helped me figure out how to create folders and also how to programatically write for loops based on site material…

{% include reveal-block.html label="Two for one" content=c3 no_js=true %}
