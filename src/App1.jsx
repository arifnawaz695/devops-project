import React from "react";

export default function App() {
  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      backgroundColor: "#3b82f6",
      padding: "10px 0",
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      zIndex: 1000,
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "18px",
    },
    section: {
      minHeight: "100vh",
      padding: "60px 20px",
      scrollMarginTop: "80px",
    },
    title: {
      fontSize: "42px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "40px",
      color: "#1f2937",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      overflow: "hidden",
      transition: "0.3s",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    content: {
      padding: "20px",
    },
    name: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#111827",
    },
    price: {
      fontSize: "16px",
      color: "#4b5563",
    },
    button: {
      marginTop: "10px",
      padding: "10px",
      width: "100%",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    removeButton: {
      marginTop: "10px",
      padding: "10px",
      width: "100%",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    formGroup: {
      maxWidth: "500px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    textarea: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      resize: "vertical",
    },
    submitButton: {
      padding: "12px",
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  const [shoes, setShoes] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  React.useEffect(() => {
    fetch("https://dummyjson.com/products/category/mens-shoes")
      .then((res) => res.json())
      .then((data) => setShoes(data.products));
  }, []);

  function handleAddToCart(product) {
    setCartItems((prev) => [...prev, product]);
  }

  function handleRemoveFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Message sent.`);
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      <nav style={styles.nav}>
        <a href="#home" style={styles.navLink}>
          Home
        </a>
        <a href="#about" style={styles.navLink}>
          About
        </a>
        <a href="#cart" style={styles.navLink}>
          Cart
        </a>
        <a href="#contact" style={styles.navLink}>
          Contact
        </a>
      </nav>

      <section id="home" style={styles.section}>
        <h1 style={styles.title}>Online Shoe Store</h1>
        <div style={styles.grid}>
          {shoes.map((shoe) => (
            <div key={shoe.id} style={styles.card}>
              <img src={shoe.thumbnail} alt={shoe.title} style={styles.image} />
              <div style={styles.content}>
                <h2 style={styles.name}>{shoe.title}</h2>
                <p style={styles.price}>${shoe.price}</p>
                <button
                  style={styles.button}
                  onClick={() => handleAddToCart(shoe)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" style={{ ...styles.section, background: "#f3f4f6" }}>
        <h1 style={styles.title}>About Us</h1>
        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          We are passionate about shoes! Our online store offers a diverse
          collection of footwear that balances comfort, fashion, and
          affordability. Whether you're looking for sports shoes, casuals, or
          formal wear — we’ve got your feet covered!
        </p>
      </section>

      <section id="cart" style={{ ...styles.section, backgroundColor: "#fef9c3" }}>
        <h1 style={styles.title}>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Your cart is empty.
          </p>
        ) : (
          <>
            <div style={styles.grid}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.card}>
                  <img src={item.thumbnail} alt={item.title} style={styles.image} />
                  <div style={styles.content}>
                    <h2 style={styles.name}>{item.title}</h2>
                    <p style={styles.price}>${item.price}</p>
                    <button
                      style={styles.removeButton}
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                maxWidth: "500px",
                margin: "40px auto 0",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Payment Summary
              </h2>
              <p style={{ fontSize: "18px" }}>
                Total Items: <strong>{cartItems.length}</strong>
              </p>
              <p style={{ fontSize: "18px", marginBottom: "20px" }}>
                Total Price:{" "}
                <strong>
                  $
                  {cartItems
                    .reduce((total, item) => total + item.price, 0)
                    .toFixed(2)}
                </strong>
              </p>
              <button
                style={{
                  ...styles.submitButton,
                  backgroundColor: "#3b82f6",
                  padding: "14px 30px",
                  fontSize: "18px",
                }}
                onClick={() => alert("Redirecting to payment gateway...")}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </section>

      <section id="contact" style={styles.section}>
        <h1 style={styles.title}>Contact Us</h1>
        <form style={styles.formGroup} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.submitButton}>
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
