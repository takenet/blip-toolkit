---
name: Icons and Logos
category: Icons
---

Icons and logos are handed-off as compressed SVGs, with specific names and sizes.

Icons are symbols used as semantic images, usually as action buttons or menu links. These symbols mostly will be saved on 24 pixels by 24 pixels (24x24px) SVG files. It is important to compress such files for smaller sizes. We recommend using [Vecta's Nano SVG Compressor](https://vecta.io/nano).

<h3> One-colored Icons </h3>

One-colored icons must be saved with no fill modification (visually, they will be black). When a designer is creating such icons, they must think SVG areas should always be painted black (not filled) and hollow on the inside. It is better NOT to use masks or other tricks, but draw exactly the shape a designer wants before saving the SVG. In other words, icon shapes must be draw as they are, not be created with visual effects.

After saving one or many SVGs, one must pass such SVGs through cleaning-scripts and compression. These processes ensure the removal of unecessary bits inside the SVG for smaller sizes and better performance.
