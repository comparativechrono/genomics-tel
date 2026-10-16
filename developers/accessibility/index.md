---
title: Accessible interactive pages
lede: Canvas and WebGL views are pictures to a screen reader and hard work with a keyboard. Build each teaching page around the view, with a keyboard route, spoken feedback, a text version of what the picture shows, colours that survive colour blindness, and motion that can be turned off.
description: How to make interactive genomics teaching pages accessible, with keyboard access and focus, ARIA live regions, text alternatives and data tables for canvas and WebGL views, colour-blind-safe palettes and reduced motion, what igv.js, JBrowse, Mol*, Cytoscape.js, Vega-Lite and other libraries support, and a live example.
---

Most of the libraries on this site draw their main view on a canvas or with WebGL, which assistive technology treats as one picture. You cannot change that from outside the library, but you can build the page around the view so that every task has a second route. This page shows how, with an example you can copy, and says what each library offers. The target is WCAG 2.2 level AA [1]; the [educators' page](../../educators/accessibility/) explains what that means in class.

An evaluation of 3,112 life-science data portals found severe accessibility problems on 74.8% of them, and in a preliminary test of three portals, a blind user completed 53.3% of common tasks. Its authors found that following accessibility standards does not by itself make a resource usable [2], so test with people as well as with checklists. Smits and colleagues' ten rules [3] are a good companion to this page.

## Give every pointer action a keyboard route

WCAG asks that everything works from a keyboard, that keyboard focus never gets stuck, that anything done by dragging can also be done with a single pointer without dragging, and that pointer targets are at least 24 by 24 CSS pixels or spaced apart [1]. Interactive components should respond to Tab and the arrow keys as well as to the mouse [3]. In practice:

- **Use real HTML controls.** `<button type="button">` for actions, and `<input>` and `<select>` with a `<label>` for choices. They work with the keyboard and with screen readers without extra code.
- **Give each thing in the picture a button.** One button per variant, as in the example below, or per molecule in a network: this is how a Cytoscape.js pathway diagram became usable from the keyboard in our tests.
- **Replace dragging with buttons and search.** A search box, zoom buttons and buttons that jump to the places students need, as in the [genome browser examples](../genome-browsers/#choose-the-tracks-add-buttons-mark-the-variant).
- **Leave the canvas out of the tab order** unless your code handles keys on it. If it takes over the arrow keys, Tab must still move on.
- **Make targets big enough.** The example's buttons are 32 pixels tall.

## Make focus visible and keep it in order

Keyboard users need to see where they are, and toolbars or overlays must not hide the control that has focus [1].

```css
/* A clear outline for keyboard users only; never remove outlines without a replacement */
:focus-visible { outline: 3px solid #2b56c9; outline-offset: 2px; }
```

Keep controls in the same order in the HTML as on screen, so that Tab moves through them in reading order. Think about where focus goes when something loads: on this site, the **Load the example** button moves focus to the example's frame as it starts to load. If a table or panel scrolls sideways on a phone, give its box `tabindex="0"`, a role and a label, so that keyboard users can scroll it too; the example's table does this.

## Announce feedback with a live region

When a page reacts to what a student does, a screen reader user needs to hear the result without moving focus. WCAG calls these status messages [1]. Put them in an element that is in the page, empty, from the start:

```html
<p id="feedback" role="status" aria-live="polite"></p>
```

Then change its text with `feedback.textContent = "…"`. Screen readers announce changes to a live region that already exists, and MDN advises starting with an empty one and letting it be exposed to assistive technology before the first update ([MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)). Use `polite`, which waits until the screen reader is idle; `assertive` interrupts, so keep it for urgent messages. Write one short message per action, and do not update the region on every frame of an animation.

## Give canvas and WebGL views a text version

A canvas is one image to assistive technology. Give it `role="img"` and an `aria-label` that says in a sentence or two what the picture shows, and put the detail in HTML beside it:

- **A data table** of what the picture shows, such as the features in view, the edges of a network or the residues around a site, as WCAG's rule on information and relationships asks [1]. Keep it small or let students filter it: a table of 100 rows and 100 columns takes 10,000 keystrokes to read [3].
- **Alt text that states the point** of an image, briefly, with captions and labels that explain how to read it [3]. Tools are appearing that write descriptions automatically: AltGosling does this for genomics views made with the Gosling toolkit [4].
- **A static image and a sentence** when WebGL is missing. Without WebGL, Mol\* shows its own message, while NGL and Phylocanvas.gl leave a blank box, so check for WebGL before you start a 3D viewer.

One exception: for Mol\*, put `role="region"` and a label on the viewer's container, not `role="img"`, because `role="img"` hides the viewer's own buttons from assistive technology.

## A canvas view with three routes to the same information

This example draws seven ClinVar variants in *HBB* on a canvas, with no library. Students can choose a variant with a button or by clicking the picture, hear a message, and read the same records in a table.

{% include example.html file="examples/accessible-variant-view.html" title="A canvas view with buttons, a live message and a table" height="740" tall=true caption="The variants are real ClinVar records from this site's HBB teaching data. Try it with the keyboard alone, and again with reduced motion switched on in your device's settings." %}

How it works:

- **The canvas** has `role="img"`, an `aria-label` that sums up the picture, and `aria-describedby` pointing to the caption, which also explains the shapes. It is not focusable, so it cannot trap the keyboard.
- **The buttons** are one `<button>` per variant, with `aria-pressed` saying which one is chosen, plus a button to zoom out. A click on the picture selects the nearest variant within 15 pixels, for pointer users.
- **The live message** is an empty `<p role="status" aria-live="polite">` in the page from the start. Each choice writes one sentence into it.
- **The table** holds the same records. The chosen row is marked in text ("selected", hidden visually) as well as by its background, and the table's box can be scrolled from the keyboard.
- **Shape and colour** carry the ClinVar classification together: orange triangles for pathogenic variants and blue circles for benign ones, with dark outlines. Markers that would overlap move onto separate rows.
- **Motion** follows the device's setting. `window.matchMedia("(prefers-reduced-motion: reduce)")` decides whether the view slides to a variant or jumps, and a sentence on the page says which.

{% include ad.html slot="in_article" %}

## Choose colours that survive colour blindness

Red-green colour vision deficiency affects about 8% of men and 0.4% of women of European ancestry [5]: about eight students in a class of 200 with equal numbers of men and women. WCAG asks that colour is never the only way information is shown, that text has a contrast ratio of at least 4.5:1, and that graphics and controls have at least 3:1 against their surroundings [1].

- **Avoid rainbow and red-green colour maps**, which distort data and can be unreadable for people with colour vision deficiency [6].
- **For continuous data**, use a map designed for colour vision deficiency, such as cividis [7]. For differences either side of zero, our chart examples use ColorBrewer's diverging RdBu scheme, centred on zero. Plotly.js's built-in "RdBu" runs the other way, from blue to red, with uneven steps, so give its colour stops explicitly.
- **For categories**, start from Okabe and Ito's palette or ColorBrewer's [3]. The example's blue (`#2a78d6`) and orange (`#eb6834`) stayed clearly distinct when we simulated colour vision deficiency for our chart research, and both have more than 3:1 contrast with white (4.4:1 and 3.2:1).
- **Repeat the meaning in another channel**: shape, a label, a line style or position [3]. Write labels in dark ink rather than in the series colours.
- **Check in greyscale first** [8], then with a simulator such as Coblis or Viz Palette [9].
- **Change library defaults.** IGV's default colours are not always accessible [3], and the ClinVar tracks used in genome browsers colour variants red and green.

## Respect reduced motion, and let students pause

Anything that starts moving by itself, lasts more than five seconds and sits alongside other content needs a way to pause, stop or hide it [1]. 3Dmol.js's `data-spin` attribute, for example, sets a molecule spinning, so add a pause button next to it. Motion that follows a click, such as a view sliding to a new place, should be easy to switch off: WCAG asks for this at level AAA [1].

Devices let people ask for less motion, because animations such as scaling or panning large objects can cause discomfort for people with vestibular motion disorders ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)). Read the setting in CSS with `@media (prefers-reduced-motion: reduce)`, or in JavaScript:

```javascript
// true when the device asks for less motion; listen for changes too
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function moveTo(target) {
  if (reduceMotion.matches) jumpTo(target);   // show the new view at once
  else slideTo(target);                        // animate, as the example does
}
```

## Know what each library does

We found the following with the keyboard and by reading each library's code and output, on 15 and 16 October 2026. We did not test every library with a screen reader.

<div class="table-wrap" markdown="1">

| Library | Draws with | Keyboard and screen readers | What to add |
|---|---|---|---|
| igv.js 3.8.9 | Canvas | The search box works from the keyboard. F and B jump to the next and previous feature on a selected track, but selecting one needs a pointer. The source has only 3 ARIA labels; screen readers cannot read the tracks. | Buttons for the places that matter, a feature table, and a text version of each task |
| JBrowse 2 4.3.0 | Canvas tracks | Buttons and menus have ARIA labels (75 in the script); the tracks are pictures. | As for igv.js |
| Nightingale 5.11.0 and react-msaview 8.4.1 | Canvas | The alignment is a picture. | A text read-out of the chosen column; a plain SVG viewer with a native slider is the accessible fallback |
| SeqViz 3.10.25 | SVG | The bases, amino acids and labels are text in the page, but a screen reader meets the sequence one letter at a time. Tab does not reach the viewer. | A sentence that states the point, the sequence as plain text, and buttons for the bases that matter |
| Mol\* 5.12.0 and PDBe Mol\* 3.12.0 | WebGL | The viewer has its own buttons and panels around the picture. Labels in 3D can hide behind nearer atoms. | `role="region"` on the container, buttons for preset views, the key point in text, a residue table |
| NGL 2.5.0 | WebGL | Without WebGL, a blank box. Its labels cannot show Greek letters. | A WebGL check, and labels in HTML |
| 3Dmol.js 2.5.5 | WebGL | `data-spin` starts rotation on its own. | A pause control, and a WebGL check |
| Cytoscape.js 3.34.3 | Canvas | Nothing for keyboard or screen-reader users. | A button per node, the edge list as a table, details in a live region, arrow shapes and line styles as well as colour |
| phylotree.js 2.6.0 | SVG | Labels are text in the page, but its menu cannot be reached by keyboard and tips cannot take focus. | Checkboxes for choosing tips, and Escape to close the menu |
| Phylocanvas.gl 1.64.1 | WebGL | Nothing in the page and no keyboard use; blank without WebGL. | A text version of the tree and checkboxes |
| d3, hand-written tree | SVG | Whatever you build: focusable tips with ARIA roles, Enter and Space. | Nothing beyond your own code |
| Vega-Lite 6.4.3 | SVG | Writes ARIA labels for the chart, its axes and every mark. The keyboard reaches only its actions menu. | `aria: false` on dense background layers, a summary sentence and a table. Its canvas renderer loses the per-mark labels. |
| Plotly.js 4.1.1 | SVG | Its toolbar buttons take focus; there is no ARIA on the data. | A label on the container, a summary and a table |
| Observable Plot 0.6.17 | SVG | `ariaDescription`, `ariaLabel` and `ariaHidden` options; tips need a pointer. | A summary and a table |
| webR and Pyodide code boxes | HTML | Code is in a labelled text box, status in a live region, output as text. | Alt text for each plot that describes that plot |
| JupyterLite | HTML | JupyterLab's own keyboard and screen-reader support, which we did not test. | Notebooks with headings, alt text and tables |
| Galaxy | HTML | Galaxy has cut the number of mouse-only steps and improved keyboard navigation [10]. Galaxy Training Network tutorials aim for WCAG 2.0 AA [11]. | Links straight to the tool, workflow or history students need |

</div>

Even where the keyboard can move a view, the data drawn inside canvas and WebGL views stay out of reach of screen readers. That is why the routes above, a table, buttons and a live message, matter more than any library setting.

## Test it yourself

- **Keyboard only.** Unplug the mouse and do the whole task with Tab, Shift+Tab, Enter, Space, the arrow keys and Escape.
- **A screen reader.** NVDA on Windows and VoiceOver on macOS are free [3].
- **Zoom to 200%.** Text must still fit and work at that size [1].
- **Colour.** Look at the page in greyscale and in a colour-blindness simulator.
- **Automated checkers** find some problems quickly; Galaxy's own browser tests use axe-core. They cannot tell you whether the task makes sense without the picture [2].
- **People.** Design and test with disabled users from the start [3].

## References

{: .references}
1. W3C (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation, 5 October 2023; current version 12 December 2024. [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/)
2. L'Yi S, Zhang HG, Mar AP, et al. (2025). A comprehensive evaluation of life sciences data resources reveals significant accessibility barriers. *Scientific Reports* 15: 23676. [doi:10.1038/s41598-025-08731-7](https://doi.org/10.1038/s41598-025-08731-7)
3. Smits TC, Weru L, Gehlenborg N, L'Yi S (2025). Ten simple rules for making biomedical data resources accessible. *PLOS Computational Biology* 21(11): e1013657. [doi:10.1371/journal.pcbi.1013657](https://doi.org/10.1371/journal.pcbi.1013657)
4. Smits TC, L'Yi S, Mar AP, Gehlenborg N (2024). AltGosling: automatic generation of text descriptions for accessible genomics data visualization. *Bioinformatics* 40(12): btae670. [doi:10.1093/bioinformatics/btae670](https://doi.org/10.1093/bioinformatics/btae670)
5. Birch J (2012). Worldwide prevalence of red-green color deficiency. *Journal of the Optical Society of America A* 29(3): 313–320. [doi:10.1364/JOSAA.29.000313](https://doi.org/10.1364/JOSAA.29.000313)
6. Crameri F, Shephard GE, Heron PJ (2020). The misuse of colour in science communication. *Nature Communications* 11: 5444. [doi:10.1038/s41467-020-19160-7](https://doi.org/10.1038/s41467-020-19160-7)
7. Nuñez JR, Anderton CR, Renslow RS (2018). Optimizing colormaps with consideration for color vision deficiency to enable accurate interpretation of scientific data. *PLOS ONE* 13(7): e0199239. [doi:10.1371/journal.pone.0199239](https://doi.org/10.1371/journal.pone.0199239)
8. Marai GE, Pinaud B, Bühler K, Lex A, Morris JH (2019). Ten simple rules to create biological network figures for communication. *PLOS Computational Biology* 15(9): e1007244. [doi:10.1371/journal.pcbi.1007244](https://doi.org/10.1371/journal.pcbi.1007244)
9. Hattab G, Rhyne TM, Heider D (2020). Ten simple rules to colorize biological data visualization. *PLOS Computational Biology* 16(10): e1008259. [doi:10.1371/journal.pcbi.1008259](https://doi.org/10.1371/journal.pcbi.1008259)
10. Galaxy Community (2024). The Galaxy platform for accessible, reproducible, and collaborative data analyses: 2024 update. *Nucleic Acids Research* 52(W1): W83–W94. [doi:10.1093/nar/gkae410](https://doi.org/10.1093/nar/gkae410)
11. Galaxy Training Network. *Accessibility*. Read 15 October 2026. [training.galaxyproject.org](https://training.galaxyproject.org/training-material/accessibility.html)
