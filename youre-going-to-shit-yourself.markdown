---
layout: page
title: You're Going to Shit Yourself
permalink: /well-shit/
---
[$5 - Buy the e-book now](https://buy.stripe.com/eVqeVc0BcfmMfIMgNO67S01)  
**​​"Gripping… Extremely funny... painfully honest... [and] over much too soon." - Jerry**. 
<br>

<img src="/assets/ygtsy-cover.png" style="float: left; margin-right:15px;" width="300">

Everybody’s got a story they *swore* they’d never tell. Sometimes it’s murder. Sometimes it’s infidelity. And sometimes… It's poop.  

You're Going to Shit Yourself is an anonymous, collective memoir about ordinary people with one thing in common: they’ve all pooped their pants.  

Whether it’s diarrhea at a wedding or on the bus to Machu Picchu, pooping in front of your dad or on the neighbor’s trampoline –  these stories are a reminder that shitting yourself is something *everyone* has in common.  

Equal parts disgusting, anonymous, strangely comforting, and hilarious this book is a reminder that sometimes the most human thing you can do? Is let loose.   

And if you haven’t yet? Well it's just a matter of time.

<br>
<br>
<br>


### [Don't waste time. Go birding. And also buy this e-book](https://buy.stripe.com/eVqeVc0BcfmMfIMgNO67S01)

<br>

---

### Got a story of your own?

<form id="story-form" style="max-width: 100%; margin-top: 1rem;">
  <textarea id="body" name="body" required rows="6" placeholder="Tell us what happened..."
    style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; box-sizing: border-box; resize: vertical;"></textarea>
  <br><br>
  <button type="submit" id="submit-btn"
    style="padding: 0.5rem 1.5rem; background: #333; color: #fff; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer;">
    Submit
  </button>
  <p id="form-status" style="margin-top: 1rem;"></p>
</form>

<script>
  document.getElementById('story-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');

    btn.disabled = true;
    btn.textContent = 'Submitting...';
    status.textContent = '';

    try {
      const res = await fetch('https://agtlvvfsqrmixhdmhxkh.supabase.co/rest/v1/messages', {
        method: 'POST',
        headers: {
          'apikey': 'sb_publishable_sjmN5RRDnkXu4vC6ZaeuUw_oiF4R9Rp',
          'Authorization': 'Bearer sb_publishable_sjmN5RRDnkXu4vC6ZaeuUw_oiF4R9Rp',
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ body: document.getElementById('body').value.trim() })
      });

      if (res.ok) {
        status.textContent = 'Story submitted. Thank you!';
        status.style.color = 'green';
        document.getElementById('story-form').reset();
      } else {
        const err = await res.json();
        console.error('Supabase error:', err);
        status.textContent = 'Something went wrong. Try again later.';
        status.style.color = 'red';
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'Something went wrong. Try again later.';
      status.style.color = 'red';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Submit';
    }
  });
</script>
