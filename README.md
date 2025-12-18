 # Coffee strike Site vitrine

 A polished static showcase website for Coffee Strike (Batna) — hero video, full menu with WhatsApp ordering, responsive design and PWA support. This repository is named: **Coffee strike Site vitrine**.

 Repository contents:
- `index.html` — Homepage with hero video and featured images.
- `menu.html` — Full menu rendered client-side with WhatsApp order links.
- `about.html` — About, contact and Google Maps embed.
- `css/style.css` — Styling with responsive layout and animations.
- `js/main.js` — Client logic: menu rendering, PWA registration and install prompt handling.
- `manifest.json` — Web App manifest for PWA.
- `sw.js` — Service worker (caching app shell and assets).
- `assets/` — Your images, video and logo (we included placeholders).
- `LICENSE` — MIT license.
- `.github/workflows/pages.yml` — GitHub Actions workflow to deploy to GitHub Pages on push to `main`.

Quick start
1. Place your real assets into the `assets/` folder (logo, `1.jpg..4.jpg`, `VD.mp4`).
2. Run a local server for testing (service worker needs HTTP):
```bash
cd "Coffee Strike"
python3 -m http.server 8000
```
Open `http://localhost:8000` in your browser.

Deploy to GitHub
- A GitHub Pages workflow is included and will publish the repository on push to `main`.

PWA notes
- The app registers a service worker and provides a simple install button when the browser triggers `beforeinstallprompt`.

Contact & Next steps
- Update `README.md` with your preferred description, author name, and any deployment details.

How to publish to GitHub (recommended — `gh` CLI)
1. Install and authenticate `gh` (GitHub CLI):
```bash
# on Ubuntu/Debian
sudo apt update && sudo apt install gh -y
gh auth login
```
2. Create the remote repo and push from this folder:
```bash
cd "Coffee Strike"
gh repo create "Coffee strike Site vitrine" --public --description "Showcase website for Coffee Strike (Batna) — PWA, menu and WhatsApp ordering" --source=. --remote=origin --push
```

How to publish to GitHub (manual UI)
1. Create a new repository on github.com named `Coffee strike Site vitrine`.
2. On the repo page follow the "push an existing repository from the command line" instructions:
```bash
git remote add origin https://github.com/<your-username>/Coffee-strike-site-vitrine.git
git branch -M main
git push -u origin main
```

Note: replace `https://github.com/<your-username>/Coffee-strike-site-vitrine.git` with the exact URL from GitHub when you create the repository.

If you want, I can attempt to install `gh` here and create the repo for you, but that requires elevated permissions and an authenticated session. Otherwise run the `gh` command above on your machine to publish.

Publishing with Netlify
-----------------------
This site is ready to publish on Netlify. Choose one of the following options:

1) Continuous deploy from GitHub (recommended)
	- Push this repo to GitHub (see earlier instructions).
	- Go to https://app.netlify.com → "New site from Git" → pick GitHub, select `Coffee-strike-site-vitrine` and follow the prompts.
	- Set the "Build command" to empty and the "Publish directory" to `/` (or keep defaults). Netlify will deploy the static files.

2) One-time manual deploy (drag & drop)
	- Build (none needed) and zip the repository root or simply drag the `index.html` and `assets/` folder into the Netlify Sites UI deploy area: https://app.netlify.com/drop

3) Deploy via Netlify CLI (advanced)
	- Install and login:
		```bash
		npm install -g netlify-cli
		netlify login
		```
	- From the project root, deploy a one-off draft:
		```bash
		netlify deploy --dir=. --prod
		```
	- Or link to a new site and deploy:
		```bash
		netlify init
		netlify deploy --dir=. --prod
		```

Netlify settings and redirects
	- `netlify.toml` is included and publishes the repository root. Add redirects or headers there if needed.


