# GitHub Profile Viewer

A simple web app to search and view GitHub user profiles and their recent public repositories.

## Features

- Search for any GitHub username
- View user details: avatar, name, username, bio, location, blog, and profile link
- See follower/following/public repo counts
- Display the 5 most recent public repositories with language and star count
- Responsive, modern UI

## Getting Started

### Prerequisites

- A modern web browser
- Internet connection (to fetch data from GitHub and load fonts/icons)

### Usage

1. **Clone or download this repository.**
2. Open `index.html` in your browser.
3. Enter a GitHub username and click "Search".

### File Structure

```
/
├── index.html
├── style.css
└── script.js
```

- `index.html` – Main HTML structure
- `style.css` – Styling for the app
- `script.js` – Handles fetching and displaying GitHub data

## Customization

- Change the number of repositories shown by editing the `per_page` parameter in `script.js`.
- Update colors and styles in `style.css` as desired.

## Credits

- [GitHub REST API](https://docs.github.com/en/rest)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)

## License

This project is open source and free to use.
