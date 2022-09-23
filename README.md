# adapt-theme-odi

This theme is adapted from the adapt vanilla theme. The bower.json file version details which base version of the vanilla this theme is in sync with. Please refer to the readme and notes from vanilla for more details on features. The README here only explains what is different.

## Settings overview

This theme provides a maximum width theme that is responsive over mobile and desktop themes.

To use this theme here are a few tips.

Avoid content in Articles and Blocks. Add content to components only.

The theme is automatically alternates coloured blocks (one coloured, one white, one coloured etc) if set at article level

It provides some Block classes (add these to the block) to control this:

Add to article (classes)
* color-{one,two,three,four,five,six,seven,eight,nine,ten}
	This is the color used to alternate the color of blocks in an article, leave blank to support legacy control on a per block level.
* invert-{odd,even}
	Invert the odd or even numbered blocks (remember counting starts from 0)

Add to block (classes)
* inverted
	Inverts black on white text to white on colors (overrides article settings)
* notinverted
	Overrides the automatic inversion of colors
* color-{one,two,three,four,five,six,seven,eight,nine,ten}
	Controls the main color of block content. When inverted the background color will be this color and content will be white (or inverted color). When not used alongside inverted, the content will be this color. 
* footer inverted
	A dark color for the footer block
* section-banner
	Add this to a block to make a thin banner block and reduce top and bottom margins

Add to component (classes)
* mobile-hide
	Hides a component when the view is small. Is best used on a graphic which is otherwise there onlyfor layout purposes. 
* intro-logo
	[GRAPHIC ONLY] - Decreases the size of the graphic and adds padding as defined in the theme variables in the logo section
