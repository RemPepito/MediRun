# MediRun Landing Page

This is a responsive landing page for the MediRun medicine delivery application. The page is built using pure HTML, CSS, and JavaScript, making it lightweight and easy to customize.

## Features

- Fully responsive design that works on all devices
- Modern and clean UI matching MediRun's branding
- Interactive elements with smooth animations
- Optimized for fast loading
- Cross-browser compatible

## File Structure

```
MediRun Landing/
├── index.html         # Main HTML file
├── styles.css         # CSS styles
├── script.js          # JavaScript functionality
├── images/            # Image assets
│   ├── wave.svg       # Wave decoration for hero section
│   ├── screen1.png    # App screenshots
│   ├── screen2.png
│   ├── screen3.png
│   └── ...
└── README.md          # This file
```

## Getting Started

To view the landing page, simply open the `index.html` file in a web browser.

## Customization

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #19a599;
    --primary-dark: #138a80;
    --primary-light: #8be0d8;
    --secondary-color: #e8f8f7;
    --text-color: #333333;
    --light-text: #666666;
    --white: #ffffff;
    --radius: 12px;
    --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
```

### Adding Images

For the best experience, add actual app screenshots and logo images to the `images` directory:

1. Replace placeholder images with actual MediRun app screenshots
2. Add pharmacy partner logos
3. Add the MediRun logo and running man mascot

### Additional Sections

The landing page structure makes it easy to add new sections. Simply follow the existing HTML pattern and add corresponding CSS styles.

## Notes

- The pharmacy partner logos are currently placeholders. Replace these with actual logos for production.
- The app screenshots are placeholders based on the provided design mockups.
- Update all links and contact information before deploying.

## Browser Support

The landing page is compatible with all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
