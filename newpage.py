from datetime import datetime
import os
import argparse

def get_configs():
    parser = argparse.ArgumentParser(description="Make a new post (if it has spaces, make sure to use double quotes!!)")
    parser.add_argument('--cat', type=str, help="What're you writing about?")
    parser.add_argument('--title', type=str, help="What's the name of the thing you are writing?")
    args = parser.parse_args()
    return args 

def create_category(category, to_create):
    if to_create == 'Y': 
        print(f"Creating a folder (with 'drafts' and '_posts') for {category}")
        os.mkdir(category)
        os.mkdir(os.path.join(category, '_posts'))
        os.mkdir(os.path.join(category, 'drafts'))

    print('Creating a file for the category permalink')
    category_permalink = category.replace(' ', '-').lower()
    category_page_contents = f"""---
layout: category
title: "{category}"
category: "{category}"
permalink: /category/{category_permalink}/
---"""
    category_page = os.path.join('category', f"{category}.md")
    with open(category_page, 'w') as file:
        file.write(category_page_contents)

def category_check(category):
    if os.path.exists(category):
        print('good to go!')
    else:
        to_create = input(f"No folder for '{category}' found... Would you like to create one? Y/N\n")
        create_category(category, to_create)

def main():
    args = get_configs()
    if args is None: 
        category = args.cat
        title = args.title
    else: 
        category = input("Category: ")
        title = input("Title: ")
    
    category_check(category)
    # GET TITLE, CATEGORY, DATETIME
    now = datetime.now()
    now_date = now.strftime("%Y-%m-%d")
    now_datetime = now.strftime("%Y-%m-%d %H:%M%:%S")

    page_contents = f"""---
layout: post
title: {title}
date: {now_datetime}
category: [{category}]
---
Yes, and at last, we begin to write something pretty sweet. As we always do. By reciting: Oh the wonders of the great earth...
"""

    # WRITE THE FILE
    # post_path = os.path.join(f"./{category}/_posts/{now_date}-{title}.md")
    post_path = os.path.join(f"./_posts/{now_date}-{title}.md")
    print(f"Creating (or overwriting in 5..4..)'{post_path}'")
    with open(post_path, 'w') as file:
        file.write(page_contents)

    # REPORT SUCCESS
    print(f"File '{post_path}' created (or overwritten) successfully.")

if __name__ == "__main__":
    main()