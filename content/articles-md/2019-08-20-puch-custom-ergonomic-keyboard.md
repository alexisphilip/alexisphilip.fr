{
    "date": "2019-08-20",
    "title": "PUCH: homemade ergonomic keyboard",
    "slug": "puch-custom-ergonomic-keyboard",
    "thumbnail": "puch.jpg",
    "categories": [
        "keyboards",
        "programming"
    ],
    "tags": [
        "Custom keyboard",
        "QMK firmware",
        "Woodwork"
    ]
}


![Puch keyboard outside][puch-keyboard-outside]
<p style="text-align: center; font-style: italic;">
    The PUCH keyboard.
</p>

As a programmer, I use the arrow keys... All the time. I quickly found it poorly ergonomic to always get my hands of the home row to reach those keys. I then decided to buil my own keyboard, with a more ergonomic layout that I could program myself.

## Budget

**Materials: ~128 €** (~$155)

**Tools: ~23 €** (~$27)

> Total costs can be lowered if you 3D print your own bottom and top plates, and if you already own soldering tools/materials.

Materials:
- 68 switches (only 59 needed): 17 €
- 59 keycaps: 20 €
- top & bottom plate: 75 €
- microcontroller (ATmega32U'): 2 €
- 1N4148 diodes: 2 €
- wires: 5 €
- solder: 7 €

Tools:
- soldering iron: 18 €
- desoldering pump: 3 €
- desoldering wire: 2 €

## Design

To build the keyboard, I needed one aluminium top plate and bottom plate.

I chose to build an ortholinear layout. I designed the layout to the correct dimensions on Adobe Illustrator.

![Front plate blueprint][front-plate-blueprint]
<p style="text-align: center; font-style: italic;">
    The front plate blueprint.
</p>

I then sent the file to LaserBoost, which laser cut my top & bottom plates design on aluminium.

![LaserBoost plates][laserboost-plates]
<p style="text-align: center; font-style: italic;">
    1.5mm aluminium by Laserboost plates (third one is a gift, never ordered it. Nice of them!).
</p>

## Building

### Soldering switches

I bought 59 Cherry MX Red switches and I soldered them in a matrix pattern.

![Cherry MX red switches][cherry-mx-red-switches]
<p style="text-align: center; font-style: italic;">
    Cherry MX red switches.
</p>

![Matrix layout][matrix-layout]
<p style="text-align: center; font-style: italic;">
    1N4148 diodes linking all switches together in a matrix pattern.
</p>

After soldering them together, I connected them to the ATmega32U4 microcontroller.

![Micro controller][mcu]
<p style="text-align: center; font-style: italic;">
    I soldered a first MCU which was not working, so I replaced it by a ATmega32U4.
</p>

### Wooden enclosure

I built a wooden enclosure which fits between the top and bottom plates. I made an enclosure in it for the micro USB female port.

![Wooden enclosure][wooden-enclosure]
<p style="text-align: center; font-style: italic;">
    Wooden enclosure + handwired micro USB extension to avoid using the MCU as the direct keyboard output.
</p>

Last steps were sanding and oiling the wood.

![PUCH keyboard outside][puch-keyboard-outside]
<p style="text-align: center; font-style: italic;">
    End result. Really proud of it.
</p>

## Programming

I used [QMK firware](https://github.com/qmk/qmk_firmware) to program the microcontroller. It is an keybaord open source firmare which produces standard keyboard inputs understandable by most operating systems (Windows, all Linux distributions, MacOS).

The [documentation](https://docs.qmk.fm/#/) is really well made and easy to understand for anyone.

I programmed a few macro/functions:
- autowrites my e-mail address ;
- shortcuts for *arrow*, *home*, *end* keys and many others ;
- shortcuts for French special characters.

## Conslusion

Building a this keyboard taught me a lot about electronics, design, soldering, ergonomics and C language.

If you are interested in building your own keyboard with your own layout, building one yourself is possible, and you don't need any programming knowledge.

**UPDATE**: I've been using this keyboard for over a year. Writing and programming feels much easier and my workflow is smoother. Macros allow me do things faster, and writing what I'm thinking is easier than before.

[puch-keyboard-outside]: https://www.alexisphilip.fr/static/img/articles/2019-08-20-puch-keyboard-outside.jpg =100%x*
[front-plate-blueprint]: https://www.alexisphilip.fr/static/img/articles/2019-08-20-front-plate-blueprint.png =100%x*
[laserboost-plates]: https://www.alexisphilip.fr/static/img/articles/2019-08-20-laserboost-plates.jpg =100%x*
[cherry-mx-red-switches]: https://www.alexisphilip.fr/static/img/articles/2019-08-20-cherry-mx-red-switches.jpg =100%x*
[matrix-layout]: https://www.alexisphilip.fr/static/img/articles/2019-08-20-matrix-layout.jpg =100%x*
[mcu]: https://www.alexisphilip.fr/static/img/articles/2019-08-20-mcu.jpg =100%x*
[wooden-enclosure]: https://www.alexisphilip.fr/static/img/articles/2019-08-20-wooden-enclosure.jpg =100%x*
