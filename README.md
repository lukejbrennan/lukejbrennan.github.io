# lukejbrennan.github.io
My software development portfolio
 
 ### To Launch locally


 `bundle exec jekyll serve`

 `bundle exec jekyll serve --livereload`

see source
 `open $(bundle info --path minima)`
# Links to Docs
[Markdown](https://www.markdownguide.org/basic-syntax/) 

[minima](https://github.com/jekyll/minima) 

[blog made with minima](https://talk.jekyllrb.com/t/learn-how-to-add-featured-images-to-your-posts/4852)
https://github.com/BillRaymond/jekyll-featured-images

# More resources
- https://medium.com/crypticcrazeforcs/
- a-step-by-step-guide-to-building-your-own-website-using-jekyll-ii-1da6749dcc20 
- [on overriding minima defaults](https://jekyllrb.com/docs/themes/#overriding-theme-defaults)
- note that you can do `open $(bundle info --path minima)` to see the OG minima folders... adn then you can copy/edit them! 
- [On adding categories](https://blog.webjeda.com/jekyll-categories/)


[how to start and grow your email list as a writer](https://writingcooperative.com/how-to-start-and-grow-your-email-list-as-a-writer-762aca4c6824)



<style>
        /* Style the search container */
        .search-container {
            position: relative;
            width: 300px; /* Adjust the width as needed */
        }

        /* Style the text input */
        .search-input {
            width: 100%;
            padding: 10px 40px 10px 10px; /* Adjust padding to make space for the search icon */
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        /* Style the search icon */
        .search-icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            font-size: 18px;
            color: #555;
            cursor: pointer;
        }
    </style>



{% if page.show_sidebar %}
  <div class="sidebar">
    sidebar content
  </div>
{% endif %}


jekyll blogs:
https://tomordonez.com/ 

adding a search bar: 
https://jekyllcodex.org/without-plugin/search-lunr/