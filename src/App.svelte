<script>
  import Router from 'svelte-spa-router'
  import RouterLink from './components/RouterLink.svelte';
  import Header from './components/Header.svelte';
  import routes from './routes';
</script>

<Header></Header>
<div class="page">
  <Router {routes}/>
</div>

<style>

/* RESET STYLES */
:global(html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video) {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

:global(article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section) {
	display: block;
}

:global(body) {
	line-height: 1;
}
:global(ol, ul) {
	list-style: none;
}
:global(blockquote, q) {
	quotes: none;
}
:global(blockquote:before, blockquote:after,
q:before, q:after) {
	content: '';
	content: none;
}
:global(table) {
	border-collapse: collapse;
	border-spacing: 0;
}

/* VARIABLES */
:global(:root) {
  --text-black: #2a3534;
  --text-white: #fafafa;
  --white-bg: #fafafa;
  --body-bg: #ececec;
  --header-bg: #353630;
  --border-light: #dfdede;
}

/* MAIN STYLES */

:global(body) {
  min-height: 100%;
  background-color: var(--body-bg);
}

.page {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--white-bg);
  max-width: 800px;
  min-height: calc(-200px + 100vh);
  border-radius: 10px;
  border-right: solid 1px var(--border-light);
  border-bottom: solid 1px var(--border-light);
  padding: 25px 80px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
}

</style>
