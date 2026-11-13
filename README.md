# Aztheticlyf — demo e-commerce storefront

A responsive React + Vite storefront with product browsing, category filters, search, product details, wishlist, cart quantity controls and WhatsApp order handoff. This is a frontend demo; it does not collect payments or store orders on a server.

## Run locally
1. Install Node.js (LTS) from https://nodejs.org/
2. Extract the project ZIP and open the folder in VS Code.
3. In the terminal, run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite (usually http://localhost:5173).

## Before showing the business owner
- Open `src/config.js` and replace `91XXXXXXXXXX` with the confirmed WhatsApp number (digits only, with country code).
- Replace all demo products, prices, descriptions and image URLs in `src/products.js`.
- Replace the sample testimonials and demo About copy in `src/main.jsx`.
- Confirm shipping policy, delivery timelines, returns, product availability and actual prices with the owner.
- Product imagery currently uses remote Unsplash demo photos. Replace with the owner's approved product photos before a real launch.
- Test the WhatsApp link on a phone with WhatsApp installed. The WhatsApp number placeholder will not work until configured.

## GitHub upload
1. Create a new empty repository on https://github.com/new (for example `aztheticlyf-store`).
2. Extract this ZIP. Open the extracted folder in VS Code.
3. Open Terminal in that folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial Aztheticlyf storefront"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/aztheticlyf-store.git
   git push -u origin main
   ```
   Replace `YOUR-USERNAME` with your GitHub username. If Git asks, sign in through your browser.

## Deploy on Vercel
1. Push the project to GitHub using the steps above.
2. Sign in at https://vercel.com/ and choose **Add New → Project**.
3. Import the `aztheticlyf-store` repository.
4. Vercel should detect Vite automatically. Build command: `npm run build`; output directory: `dist`.
5. Click **Deploy**. Future pushes to `main` will trigger new deployments.

## Project structure
```text
aztheticlyf-store/
├── index.html
├── package.json
├── README.md
├── public/
└── src/
    ├── config.js
    ├── main.jsx
    ├── products.js
    ├── style.css
    ├── components/
    └── pages/
```

## Notes
- Cart and wishlist state are held in React memory and reset on page refresh. Add localStorage or a backend if persistence is required.
- Product photos and reviews are placeholders; confirm image rights and replace before commercial use.
- The newsletter is a demo interaction only and does not save email addresses.
- WhatsApp checkout prepares a message with item names, quantities, line prices and subtotal. Final shipping/payment arrangements happen in chat.
