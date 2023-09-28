---
layout: page-no-title
title: Writing
permalink: /writing/
---

<div id="archives">
{% for category in site.categories %}
  <div class="archive-group">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugize }}"></div>
    <p></p>
    <h3 class="category-head">{{ category_name }}</h3>
    <a name="{{ category_name | slugize }}"></a>
    {% for post in site.categories[category_name] %}
    <article class="archive-item">
      <h4><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h4>
    </article>
    {% endfor %}
  </div>
{% endfor %}
</div>


### Notre Dame Magazine 
[A Prayer for Everyone](https://magazine.nd.edu/stories/a-prayer-for-everyone/)

### The South Seattle Emerald
[Sweeps Continue in Seattle: Perspectives From the Street](https://southseattleemerald.com/2021/06/14/sweeps-continue-in-seattle-perspectives-from-the-street/)

[History of the Unhoused 2010-Present](https://southseattleemerald.com/2021/07/29/then-and-now-seattles-plan-for-homelessness-from-2010-to-2020/)

### SlackJaw 
[(Tough) Love From God](https://medium.com/slackjaw/tough-love-from-god-3bdd0905ffa7)

### Business Insider
[I Moved from Seattle to Chicago to Try Again With My Ex](https://www.insider.com/i-moved-cities-to-try-again-with-my-ex-girlfriend-2023-5)

### Dirty Spoon 
[Pizza Odyssey](http://www.dirty-spoon.com/pizza-odyssey/)

### Andre House
[Dappled Things](https://andrehouse.org/wp-content/uploads/2019/03/Spring-2019-Open-Door.pdf)

### PS I Love You
[The Art of a Graceful Tumble](https://psiloveyou.xyz/the-art-of-a-graceful-tumble-6b8579c04ad4)

### FaithND
[Take and Eat](http://faith.nd.edu/s/1210/faith/interior.aspx?sid=1210&gid=609&pgid=29702&cid=58509&ecid=58509&crid=0&calpgid=29874&calcid=61619)

### C3 News Magazine 
[A Congressman from Idaho Leads Efforts to Restore Salmon to the Snake River](https://c3newsmag.com/idaho-congressmen-looks-to-restore-salmon-to-the-snake-river/)

[Oberon Sustainability Commitments](https://c3newsmag.com/oberon-fuels-decarbonizing-transportation-sector/)

[How high prices are spurring farmers to adopt eco-friendly fertilizers](https://c3newsmag.com/how-high-prices-are-spurring-farmers-to-adopt-eco-friendly-fertilizers/)

[Can Single-Use Plastics Be Replaced By Seaweed?](https://c3newsmag.com/can-single-use-plastics-be-replaced-by-seaweed/)

[Lithos Carbon is Using Enhanced Rock Weathering to Capture CO2](https://c3newsmag.com/lithos-carbon-is-using-enhanced-rock-weathering-to-capture-co2/)

[RepAir Develops an Efficient and Low-Heat Direct Air Capture System to Remove CO2 from the Atmosphere](https://c3newsmag.com/repair-develops-an-efficient-and-low-heat-direct-air-capture-system-to-remove-co2-from-the-atmosphere/)

[Saved by Plants: How Genetically Modified Trees Could Help Fight Climate Change](https://c3newsmag.com/living-carbon-san-francisco-trees/)

[How Three Companies are Combating Water Stress and Water Scarcity](https://c3newsmag.com/how-three-companies-are-combating-water-stress-and-water-scarcity/)

[A Canadian Startup Builds Nuclear Fusion Power Plant](https://c3newsmag.com/a-canadian-startup-builds-nuclear-fusion-power-plant/)

[AspiraDAC Leads the Way To Carbon Neutrality with Solar Powered Devices](https://c3newsmag.com/aspiradac-australia-solar-powered-devices/)
