# Cammegh Website Rebuild

This is my rebuild of the [Cammegh](http://www.cammegh.com/index.php) website using HTML, CSS, JavaScript and jQuery, with select parts of Bootstrap used for styling purposes. I felt the existing webpages needed a redesign as they are very unfriendly to users, especially those on mobile devices, much of the information is outdated and quite a few sections of JavaScript do nothing.

My aim is to bring the website forward since the last time it was updated a decade ago and give it a fresh new look, with user friendly links, sizing and content. I believe I can manage this through rigorous testing and a simple design that still contains all of the necessary information a user, whether commercial or individual, would need. Given the outdated nature of the existing site, I believed that rebuilding from scratch was the best way to start.

<br>

## UX

### Scope

The majority of users of the Cammegh site, using their existing customer base as a template, are part of bigger businesses. Therefore the UX design process needs to focus heavily on showcasing their products, and their USP of customisability. Talks with the Sales Director and Media Production Coordinator highlighted the following pages and functionality that would be required:

#### Necessary Pages

- Landing page
- Products page with the different categories of products produced
    - Individual pages for each product category
- A page where you can build your own wheel from a selection of options
- Contact page
- Clients page

#### Necessary Functionality

Most of the functionality that was originally decided on is focused on the wheel-builder page. JavaScript is necessary to be able to change image src values and unique selections. The bones of this funcionality was specified as follows:
- Selections highlight when clicked on
- Radio buttons for finishes and/or quantities as necessary
- Selections and buttons change the render of the wheel that is displayed
- Review section that fills out based on the previous selections (very important)
- Ability to automatically send an email with the selections made

I realised early on that more functionality was going to be required, and is outlined below:
- JavaScript possibly required to deal with "sticky hover" from touch-screen devices when deselecting options on the wheel builder page
- Scaling text and boxes so site is usable on multiple resolutions
- Google Maps API and/or link to Google Maps for company address, as picture on existing website does not scale
- Quantity of content will require a return-to-top button on several pages, better to include on all pages
- Roulette wheel page will be huge given range of variations in the product, may require expanding boxes *(when clicked on?)*
- Pictures may require reduced file-size versions to limit load times

### Structure

I decided early on, based on information from the Code Institute course and looking at competitors' websites, that I would not need to fill the entirety of a desktop screen with content. It would spread the information and text out too much, as the high-resolution photographs and renders I intended to use would leave large gaps of empty space. I also decided that if I was going to limit the width of the content, I would need a definable box to put it in and separate it from the rest of the page. This influenced my initial wire frames (done in pen and paper) and is standard across the entire website.

The pages were defined as follows:

<strong>Home</strong> - the landing page for the website. Following examples of competitors, should include a high-res, full-width picture and some text (to be decided upon).

<strong>Products</strong> - to include boxes that link to each product category with a title and a brief description of the category.

Within Products (in order of importance):

- <strong>Roulette Wheels</strong> - to include all standard manufactured roulette wheels, with descriptions, pictures and highlighting features of each
- <strong>Billboard Displays</strong> - to include all standard variations in displays
- <strong>Billboard Graphics</strong> - to include all standard graphics produced, what hardware they work with and highlighting features of each
- <strong>Licences</strong> - to include all licences available for purchase, highlighting features, betting odds and options
- <strong>Accessories</strong> - to include all standard accessories manufactured/sold by Cammegh

<strong>Wheel Builder</strong> - page that will produce a render of a roulette wheel based on selections made by the user. Must include a section that allows the user to email their selections to themselves and an option for the Cammegh Sales team to be cc'ed into said email.

<strong>Contact Info</strong> - standard affair of phone numbers and emails for both Sales and Support staff, and Google Maps image/API to show where the company is located for those who want to visit. *I later decided to add opening hours to this page.*

<strong>Clients</strong> - this is the one page that was not defined. Most competitors sites have something similar ([TCS John Huxley](https://www.tcsjohnhuxley.com/) have a scrollbar with links to various casinos they provide for, [Martin Williams](https://www.mwce.co.uk/clients/) have a page that lists countries and customers together), whilst the original Cammegh website has a [Testimonials page](http://www.cammegh.com/testimonial.php)). As such this page was not defined almost until the completion of the rest of the website.


## Features

### Features Implemented

#### Home Page:
- Full-width picture to draw user's eye
- Brief description of the company and its products

#### Products page:
Includes links to all the following pages, and a brief description about each:
- Wheels page
    - Includes all available wheels produced
    - Includes expanding boxes for all wheels produced, highlighting their features
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
- Review Form:
    - Fills out based on selections
    - Includes a text box for customised number arc sequences
    - Sends an email with the selections
    - Correctly adds/removes cc for Sales based on checkbox

#### Contact Info page:
- Includes phone numbers, sales email and support email and working hours
- Includes Cammegh address and link to Google Maps on small resolutions and Google Maps iframe on larger resolutions

#### Other Functionality
- I used an adapted version of the 31/01/2017 jQuery solution to [loading high-resolution images](https://stackoverflow.com/questions/27934548/load-a-low-res-background-image-first-then-a-high-res-one) to allow the page to quickly load a low-res image (so the layout of the page loads fast) and when the high-res image has finished loading in the background it swaps the src of the low-res image to the high-res image.

### Features Left to Implement
- More space around logo link to home page
- TNR links, but keep OS font for content
- Black/background image for contrast
- Stretch content where necessary (less dead space)

#### Wheel Builder page:
- *Option of "standard" layouts for selection?*
- *File upload option for custom number arcs w/ multiple file capacity (for sequence + artwork). NOTE: this requires a paid subscription to email.js*

#### Contact Info page:
- *To include social media links? NOT RECOMMENDED as not updated in forever*


## Technologies Used

- [BootStrap](https://github.com/twbs/bootstrap/tree/v3.3.7)
    - Parts cherry-picked for desired functionality
- [Fontawesome](https://fontawesome.com/)
    - Used for various icons in small-screen menu.
- [Smart Hover](http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml)
    - Used to prevent the hover css state on touch devices. Works well on most buttons, but not so well on select/de-select buttons on the wheel builder page. I coded those separately.
- [Smooth scroll](https://www.w3schools.com/howto/howto_css_smooth_scroll.asp#section1)
    - Used to scroll smoothly between page sections on the website. I edited this to allow linking to specific locations on other pages.
- [Form Submit Modal](https://codepen.io/hanapiers/pen/EXNrGP)
    - Used to pop-up a confirmation modal on submitting the enquiry form on the Wheel Builder page.
- [GitHub Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
    - Introduced me to the wonder of branches for different levels of functionality and testing.


## Testing




## Deployment




## Credits

- Smart hover JavaScript
    - Taken from http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml. All credit and rights to this code are property of the designer.
- Modal pop-up on form submit JavaScript
    - Taken from https://codepen.io/hanapiers/pen/EXNrGP. All credit and rights to this code are property of the designer, Hana Piers.
- Smooth scroll JavaScript
    - Taken from https://www.w3schools.com/howto/howto_css_smooth_scroll.asp#section1.
- Layout basics
    - Cherry-picked sections from https://github.com/twbs/bootstrap/tree/v3.3.7.

### Content
- The majority of the information is taken from the existing Cammegh website (http://www.cammegh.com/index.php) and the 2018 Cammegh Brochure (http://www.cammegh.com/files/Cammegh_Brochure.pdf).

### Media
- Renders for the Wheel Builder page were provided by Gareth Tilt (Graphics and Software Development).
- All photos and renders are taken from the 2018 Cammegh Brochure. Some minor edits were made by myself using an [online image editor](http://www.online-image-editor.com/).

### Acknowledgements

I received inspiration for this project from the following sources:
- [TCS John Huxley](https://www.tcsjohnhuxley.com/)
    - Their Roulette Wheel Configurator was what prompted Cammegh to start a re-work of their entire website. The aforementioned page was what I based my design and layout off of (with several changes to prevent things like a single-zero number arc set being put with a double zero separator ring).
- [Martin Williams Casino Equipment](https://www.mwce.co.uk/)
    - I admired the simple and concise design of this site and the decision to have the width of the page be limited on wider resolutions was influenced heavily by this. Their site also did not have the same brash colour scheme as TCS Huxley, which forced me to thing about the colour palette I was going to use.

This project came about mostly because of two unrelated incidents that just happened to coincide rather nicely with each other. I wanted a way to practice my coding away from the course I am studying and Cammegh had tried unsuccessfully to get a new website off the ground back in 2017. After that effort floundered, I picked up the pieces and did some digging around the company in 2018 to work out what was likely to be needed. Starting out as a pet-project to develop my skills, it eventually became in-depth and functional enough to be my second stream project for the Code Institute course. This leads on to some acknowledgements of those that helped me, both when this project was in its infancy and when it became a company asset:
- Rob Foord (Media Production Creator and Coordinator) gave me a wealth of information regarding what had been asked of him when the original idea for a new Cammegh website was given to him. Most of the original ideas for pages came from him and he also showed me some of the preliminary work he did. This kick-started the pet-project part with the idea that it might become a compayn asset later on.
- Gareth was supportive throughout the project, giving both his time and experience to help me understand JS concepts and provide me with the extensive catalogue of renders that the wheel builder requires to work properly.
