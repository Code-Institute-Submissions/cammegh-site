# Cammegh Website Read Me

This is my rebuild of the [Cammegh](http://www.cammegh.com/index.php) website using HTML and CSS, with select parts of Bootstrap used for styling purposes. I felt the existing webpages needed a redesign as they are very unfriendly to users, especially those on mobile devices, much of the information is outdated and quite a few sections of JavaScript do nothing.

My aim is to bring the website forward since the last time it was updated a decade ago and give it a fresh new look, with user friendly links, sizing and content. I believe I can manage this through rigorous testing and a simple design that still contains all of the necessary information a user, whether commercial or individual, would need.

## UX

The majority of users of the Cammegh site, using their existing customer base as a template, are part of bigger businesses. Therefore the UX design process needs to focus heavily on showcasing their products, and their USP of customisability.

## Features

#### Products page:
- Wheels page
    - Includes all available wheels produced
- Displays page
    - Includes all available sizes, with information on them
    - Emphasis on viewing angles, clarity of picture
    - Includes info on orientation, LEDs, custom colours for surrounds, poles
- Billboard Graphics page
    - Includes all graphics that are not related to licencing
    - Currently has multiboard graphics on this page (*may move this to licences page later*)
 - Licences page
    - Need more info as I know next to nothing about this product type
- Accessories page
    - To include all available accessories sold (balls, dollies, table layouts, levellers, etc.)

#### Wheel Builder page:
- Includes render of wheel
- Includes all major options
- Render changes based on selections made

#### Contact Info page:
- Includes phone numbers, sales email and support email and working hours
- Includes Cammegh address and link to Google Maps on small resolutions and Google Maps iframe on larger resolutions

### Features Left to Implement

#### Products page:
- To include, and all subsequent pages to include, link to an enquiry form.
- To include links to the following pages:
    - Wheels page
        - To include expanding boxes for all wheels produced, highlighting their features
        - *Maybe have pictures of the wheels in the tiles?*
    - Displays page
        - *Highlight custom surround/pole designs? (Les A/Genting)*


#### Wheel Builder page:
- *'Other' text field for super-customisable parts (number arcs, separator finishes, turret finishes, non-veneer colours)?*
- *Option of "standard" layouts for selection?*
- *File upload option for custom number arcs w/ multiple file capacity (for sequence + artwork)*

#### Clients page:
- TBD what goes here. Suspect this will be dictated mostly by Sales
- *Possibly have a login feature here?*

#### Contact Info page:
- *To include social media links? NOT RECOMMENDED as not updated in forever*

#### Other Functionality
- Reduce image file sizes to reduce load times.
    - Use [this](http://compressimage.toolur.com/) to reduce file size
    - Use something similar to [this](https://stackoverflow.com/questions/27934548/load-a-low-res-background-image-first-then-a-high-res-one) to load high-res files in background, then swap the image once loaded