
import React, { createContext, useContext, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams
} from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  MessageCircle
} from "lucide-react";

import { products, categories } from "./products";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "./config";
import "./style.css";

const Store = createContext(null);

const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);

function useStore() {
  return useContext(Store);
}

// Instagram icon - custom SVG to avoid Lucide export errors
function InstagramIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [query, setQuery] = useState("");

  const add = (p) =>
    setCart((old) => {
      const found = old.find((x) => x.id === p.id);

      return found
        ? old.map((x) =>
            x.id === p.id ? { ...x, qty: x.qty + 1 } : x
          )
        : [...old, { ...p, qty: 1 }];
    });

  const qty = (id, n) =>
    setCart((old) =>
      old.map((x) =>
        x.id === id
          ? { ...x, qty: Math.max(1, x.qty + n) }
          : x
      )
    );

  const remove = (id) =>
    setCart((old) => old.filter((x) => x.id !== id));

  const toggle = (p) =>
    setWish((old) =>
      old.includes(p.id)
        ? old.filter((x) => x !== p.id)
        : [...old, p.id]
    );

  const value = {
    cart,
    wish,
    query,
    setQuery,
    add,
    qty,
    remove,
    toggle
  };

  return (
    <Store.Provider value={value}>
      <BrowserRouter>
        <Announcement />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Store.Provider>
  );
}

function Announcement() {
  return (
    <div className="announcement">
      A little joy, delivered to your door
      <span>✦</span>
      Free shipping on orders above ₹999
    </div>
  );
}

function Header() {
  const { cart, wish, query, setQuery } = useStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="icon-btn mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>

        <Link to="/" className="brand">
          aztheticlyf<span>♡</span>
          <small>little things, big smiles.</small>
        </Link>

        <nav className={open ? "nav open" : "nav"}>
          {[
            ["Home", "/"],
            ["Shop", "/shop"],
            ["Collections", "/collections"],
            ["About", "/about"],
            ["Contact", "/contact"]
          ].map(([t, u]) => (
            <NavLink
              key={u}
              to={u}
              onClick={() => setOpen(false)}
            >
              {t}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setSearch(!search)}
            aria-label="Search"
          >
            <Search />
          </button>

          <Link
            className="icon-btn count-wrap"
            to="/wishlist"
            aria-label="Wishlist"
          >
            <Heart />
            {wish.length > 0 && <i>{wish.length}</i>}
          </Link>

          <Link
            className="icon-btn count-wrap"
            to="/cart"
            aria-label="Cart"
          >
            <ShoppingBag />
            {cart.length > 0 && (
              <i>{cart.reduce((a, x) => a + x.qty, 0)}</i>
            )}
          </Link>
        </div>
      </div>

      {search && (
        <div className="searchbar">
          <Search size={18} />
          <input
            autoFocus
            placeholder="Search your little favourites..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to="/shop" onClick={() => setSearch(false)}>
            Search
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            aztheticlyf<span>♡</span>
            <small>little things, big smiles.</small>
          </Link>

          <p>
            Thoughtful little finds to make everyday feel a little
            more lovely.
          </p>

          <a
            className="social"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon size={17} /> @aztheticlyf
          </a>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/shop">Shop all</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">Our story</Link>
        </div>

        <div>
          <h4>Need help?</h4>
          <Link to="/contact">Contact us</Link>
          <Link to="/cart">Your cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        <div>
          <h4>A little note</h4>
          <p>
            Have a question or a gift idea? We'd love to hear from
            you.
          </p>
          <Link className="text-link" to="/contact">
            Say hello <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Aztheticlyf. Made with ♡
        </span>
        <span>
          Demo storefront · Product imagery and reviews are samples
        </span>
      </div>
    </footer>
  );
}

function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

function ProductCard({ p }) {
  const { add, wish, toggle } = useStore();
  const saved = wish.includes(p.id);

  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${p.id}`}>
          <img src={p.image} alt={p.name} loading="lazy" />
        </Link>

        {p.tag && <span className="tag">{p.tag}</span>}

        <button
          className={`wish-btn ${saved ? "saved" : ""}`}
          onClick={() => toggle(p)}
          aria-label="Toggle wishlist"
        >
          <Heart
            size={17}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <button className="quick-add" onClick={() => add(p)}>
          Add to bag <Plus size={15} />
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{p.category}</span>
        <Link
          to={`/product/${p.id}`}
          className="product-name"
        >
          {p.name}
        </Link>

        <div className="price">
          {money(p.price)}
          {p.oldPrice && <del>{money(p.oldPrice)}</del>}
        </div>
      </div>
    </article>
  );
}

function ProductGrid({ items }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

function Home() {
  const best = products.slice(0, 4);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={15} /> A LITTLE DOSE OF HAPPY
          </span>

          <h1>
            Little Things,
            <br />
            <em>Big Smiles.</em>
          </h1>

          <p>
            Find your next favourite little thing. From Korean
            stationery to thoughtful gifts, a happy corner for all
            things cute and lovely.
          </p>

          <Link className="btn btn-dark" to="/shop">
            Shop the collection <ArrowRight size={17} />
          </Link>

          <div className="hero-note">
            <span>♡</span> Curated with love, just for you
          </div>
        </div>

        <div className="hero-photo">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cbuy9d7e?w=1400&auto=format&fit=crop&q=90"
            alt="Aesthetic stationery and desk accessories"
          />
          <div className="photo-sticker">
            little joys
            <br />
            inside ♡
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div>♡ Thoughtfully curated</div>
        <div>✦ Cute finds, happy prices</div>
        <div>♡ Gifts made memorable</div>
      </section>

      <section className="section container">
        <SectionTitle
          eyebrow="FIND YOUR HAPPY"
          title="Shop by mood"
          sub="A little something for every kind of lovely."
        />

        <div className="category-grid">
          {categories.slice(1).map((c, i) => (
            <Link
              className={`category-tile tile-${i + 1}`}
              to={`/shop?category=${encodeURIComponent(c)}`}
              key={c}
            >
              <span>0{i + 1}</span>
              <h3>{c}</h3>
              <b>
                Explore <ArrowRight size={15} />
              </b>
            </Link>
          ))}
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="THE CROWD FAVOURITES"
              title="A little love list"
              sub="The pieces everyone has been adding to their carts."
            />
            <Link to="/shop" className="text-link">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <ProductGrid items={best} />
        </div>
      </section>

      <section className="gift-banner container">
        <div className="gift-image">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1000&auto=format&fit=crop&q=85"
            alt="Gift box with ribbon"
          />
        </div>

        <div className="gift-copy">
          <span className="eyebrow">
            A GIFT THAT FEELS LIKE A HUG
          </span>

          <h2>
            Make their day
            <br />
            <em>a little sweeter.</em>
          </h2>

          <p>
            Thoughtful little hampers, wrapped up with all the good
            feelings. Because the best gifts say, “I thought of you.”
          </p>

          <Link
            className="btn btn-dark"
            to="/shop?category=Gift%20Hampers"
          >
            Explore gift hampers <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section container reviews">
        <SectionTitle
          eyebrow="KIND WORDS"
          title="A little love from you"
          sub="Sample testimonials — replace with verified customer reviews before launch."
        />

        <div className="review-grid">
          {[
            "Everything was so pretty and thoughtfully packed. It felt like opening a little gift!",
            "The cutest stationery finds. The quality and details are lovely.",
            "Ordered a hamper for my bestie and she absolutely adored it."
          ].map((r, i) => (
            <div className="review" key={i}>
              <div className="stars">★★★★★</div>
              <p>“{r}”</p>
              <b>Happy customer</b>
              <small>Sample review {i + 1}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="instagram-band">
        <div>
          <span className="eyebrow">
            A LITTLE MORE INSTA-LOVE
          </span>

          <h2>
            Come say <em>hello.</em>
          </h2>

          <p>
            Follow along for new drops, happy mail and everyday
            inspiration.
          </p>

          <a
            className="btn btn-outline"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon size={17} /> Follow @aztheticlyf
          </a>
        </div>

        <div className="insta-pics">
          {[
            "photo-1517842645767-c639042777db",
            "photo-1513364776144-60967b0f800f",
            "photo-1549465220-1a8b9238cd48"
          ].map((id) => (
            <img
              key={id}
              src={`https://images.unsplash.com/${id}?w=400&auto=format&fit=crop&q=80`}
              alt="Aztheticlyf inspiration"
            />
          ))}
        </div>
      </section>

      <section className="newsletter container">
        <div>
          <span className="eyebrow">
            LETTERS, LITTLE JOYS & FIRST DIBS
          </span>

          <h2>A happy note in your inbox.</h2>

          <p>
            Get updates on new arrivals and little surprises.
            (Demo form — connect an email service before launch.)
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              "Thanks for subscribing! Connect an email platform to collect subscribers."
            );
          }}
        >
          <input
            type="email"
            required
            placeholder="Your email address"
          />

          <button className="btn btn-dark">
            Count me in <ArrowRight size={16} />
          </button>
        </form>
      </section>
    </main>
  );
}

function Shop() {
  const { query } = useStore();

  const params = new URLSearchParams(window.location.search);

  const [cat, setCat] = useState(
    params.get("category") || "All"
  );

  const [sort, setSort] = useState("featured");

  let items = products.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      `${p.name} ${p.category} ${p.description}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  if (sort === "low") {
    items.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    items.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="page container">
      <div className="page-intro">
        <span className="eyebrow">THE AZTHETICLYF EDIT</span>
        <h1>
          Find your <em>little joy.</em>
        </h1>
        <p>Lovely things, thoughtfully picked for you.</p>
      </div>

      <div className="shop-toolbar">
        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cat === c ? "active" : ""}
            >
              {c}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      <p className="result-count">
        {items.length} lovely finds
      </p>

      {items.length ? (
        <ProductGrid items={items} />
      ) : (
        <div className="empty">
          <h3>No little finds here just yet.</h3>
          <p>Try another search or category.</p>
          <button
            className="btn btn-dark"
            onClick={() => setCat("All")}
          >
            See all products
          </button>
        </div>
      )}
    </main>
  );
}

function Collections() {
  return (
    <main className="page container">
      <div className="page-intro">
        <span className="eyebrow">CURATED FOR YOUR MOOD</span>
        <h1>
          Our <em>collections.</em>
        </h1>
        <p>Explore the little things that make your day.</p>
      </div>

      <div className="collection-list">
        {categories.slice(1).map((c, i) => (
          <Link
            to={`/shop?category=${encodeURIComponent(c)}`}
            className="collection-row"
            key={c}
          >
            <span>0{i + 1}</span>
            <h2>{c}</h2>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </main>
  );
}

function Product() {
  const { id } = useParams();

  const p = products.find(
    (x) => String(x.id) === String(id)
  );

  const { add, toggle, wish } = useStore();

  const [n, setN] = useState(1);

  if (!p) {
    return (
      <main className="page container empty">
        <h2>We couldn't find that little thing.</h2>
        <Link className="btn btn-dark" to="/shop">
          Back to shop
        </Link>
      </main>
    );
  }

  return (
    <main className="page container product-detail">
      <div className="detail-image">
        <img src={p.image} alt={p.name} />
      </div>

      <div className="detail-copy">
        <span className="eyebrow">{p.category}</span>

        <h1>{p.name}</h1>

        <div className="detail-price">
          {money(p.price)}
          {p.oldPrice && <del>{money(p.oldPrice)}</del>}
        </div>

        <p>{p.description}</p>

        <p className="sample-note">
          Demo product listing · Details and imagery are sample
          content.
        </p>

        <div className="quantity">
          <button
            onClick={() => setN(Math.max(1, n - 1))}
            aria-label="Decrease quantity"
          >
            <Minus />
          </button>

          <b>{n}</b>

          <button
            onClick={() => setN(n + 1)}
            aria-label="Increase quantity"
          >
            <Plus />
          </button>
        </div>

        <button
          className="btn btn-dark full-btn"
          onClick={() => {
            for (let i = 0; i < n; i++) add(p);
          }}
        >
          Add {n} to bag <ShoppingBag size={17} />
        </button>

        <button
          className="btn btn-outline full-btn"
          onClick={() => toggle(p)}
        >
          <Heart size={17} />
          {wish.includes(p.id)
            ? "Remove from wishlist"
            : "Add to wishlist"}
        </button>

        <div className="detail-perks">
          <span>♡ Carefully packed with love</span>
          <span>✦ WhatsApp ordering</span>
        </div>
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="page container story">
      <div className="page-intro">
        <span className="eyebrow">A NOTE FROM US</span>

        <h1>
          Life is made of <em>little things.</em>
        </h1>

        <p>
          And we believe those little things deserve to feel special.
        </p>
      </div>

      <div className="story-body">
        <img
          src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=1000&auto=format&fit=crop&q=85"
          alt="A calm aesthetic desk"
        />

        <div>
          <h2>Welcome to our happy corner.</h2>

          <p>
            Aztheticlyf is a little destination for people who find
            joy in pretty paper, thoughtful gifts, cute accessories
            and everyday details. We bring together finds that make
            ordinary moments feel a bit more special.
          </p>

          <p>
            Whether you're treating yourself or surprising someone
            you love, we hope you find something that makes you
            smile.
          </p>

          <b>With love,</b>
          <br />
          Team Aztheticlyf ♡
        </div>
      </div>

      <p className="sample-note center">
        Brand story is demo copy. Replace with the business owner's
        approved story.
      </p>
    </main>
  );
}

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

function Contact() {
  return (
    <main className="page container contact-page">
      <div className="page-intro">
        <span className="eyebrow">
          WE'RE JUST A MESSAGE AWAY
        </span>

        <h1>
          Let's have a <em>little chat.</em>
        </h1>

        <p>
          Questions, gift ideas or just want to say hello? We'd love
          to hear from you.
        </p>
      </div>

      <div className="contact-card">
        <MessageCircle size={34} />

        <h2>Let's talk on WhatsApp</h2>

        <p>
          For product questions and orders, message us directly.
          We'll be happy to help.
        </p>

        <a
          className="btn btn-dark"
          href={whatsappLink(
            "Hi Aztheticlyf! I have a question."
          )}
          target="_blank"
          rel="noreferrer"
        >
          Message us <ArrowRight size={17} />
        </a>

        <a
          className="text-link"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon size={16} /> @aztheticlyf
        </a>
      </div>
    </main>
  );
}

function Wishlist() {
  const { wish } = useStore();

  const items = products.filter((p) =>
    wish.includes(p.id)
  );

  return (
    <main className="page container">
      <div className="page-intro">
        <span className="eyebrow">SAVED WITH LOVE</span>

        <h1>
          Your <em>wishlist.</em>
        </h1>

        <p>All the little things you're dreaming of.</p>
      </div>

      {items.length ? (
        <ProductGrid items={items} />
      ) : (
        <div className="empty">
          <Heart size={34} />

          <h2>
            Your wishlist is waiting for a little love.
          </h2>

          <p>Tap the heart on anything you adore.</p>

          <Link className="btn btn-dark" to="/shop">
            Explore the shop
          </Link>
        </div>
      )}
    </main>
  );
}

function Cart() {
  const { cart, qty, remove } = useStore();

  const total = cart.reduce(
    (a, p) => a + p.price * p.qty,
    0
  );

  const message = [
    "Hi Aztheticlyf! I'd like to place an order:",
    "",
    ...cart.map(
      (p) => `${p.name} × ${p.qty} — ${money(p.price * p.qty)}`
    ),
    "",
    `Order total: ${money(total)}`,
    "Please let me know the next steps. Thank you!"
  ].join("\n");

  return (
    <main className="page container">
      <div className="page-intro">
        <span className="eyebrow">YOUR LITTLE FINDS</span>

        <h1>
          Your <em>shopping bag.</em>
        </h1>

        <p>Almost yours. ♡</p>
      </div>

      {!cart.length ? (
        <div className="empty">
          <ShoppingBag size={36} />

          <h2>Your bag is taking a tiny nap.</h2>

          <p>Let's find something lovely for it.</p>

          <Link className="btn btn-dark" to="/shop">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((p) => (
              <div className="cart-item" key={p.id}>
                <img src={p.image} alt={p.name} />

                <div className="cart-item-info">
                  <span>{p.category}</span>
                  <b>{p.name}</b>
                  <strong>{money(p.price)}</strong>

                  <div className="quantity small">
                    <button
                      onClick={() => qty(p.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus />
                    </button>

                    <b>{p.qty}</b>

                    <button
                      onClick={() => qty(p.id, 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => remove(p.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <aside className="order-summary">
            <h2>Order summary</h2>

            <div>
              <span>Subtotal</span>
              <b>{money(total)}</b>
            </div>

            <div>
              <span>Shipping</span>
              <span>Confirmed on WhatsApp</span>
            </div>

            <div className="summary-total">
              <span>Estimated total</span>
              <b>{money(total)}</b>
            </div>

            <a
              className="btn btn-dark full-btn"
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
            >
              Checkout on WhatsApp
              <MessageCircle size={17} />
            </a>

            <p className="sample-note">
              No online payment is collected on this demo site.
              Shipping and final order details will be confirmed in
              WhatsApp.
            </p>

            {WHATSAPP_NUMBER.includes("X") && (
              <p className="warning">
                Setup needed: replace the WhatsApp placeholder in
                src/config.js before launch.
              </p>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

function NotFound() {
  return (
    <main className="page container empty">
      <h1>Oops! This page wandered away.</h1>
      <p>Let's get you back to our happy corner.</p>
      <Link to="/" className="btn btn-dark">
        Back home <ArrowRight size={17} />
      </Link>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
