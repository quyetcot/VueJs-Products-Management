const users = [
    { id: 1, email: "admin@example.com", password: "123456" },
    { id: 2, email: "user@example.com", password: "password" },
  ];
  
  // Logic đăng nhập
  exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);
  
    if (user) {
      res.json({ token: "fake-jwt-token", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  };
  