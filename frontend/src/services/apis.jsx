const base_url = process.env.REACT_APP_BASE_URL

const register = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone_number: Number(values.phone),
      address: values.address,
    }
    const res = await fetch(`${base_url}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
}

const login = async (email, password) => {
    const data = { email, password }
    const res = await fetch(`${base_url}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
}

const addBook = async (values) => {
  const data = {
     book_title: values.bookTitle,
     type: values.type,
     quantity: Number(values.quantity),
     author_name: values.authorName,
     price: Number(values.price),
     published_year: Number(values.publishedYear),
   };
 const res = await fetch(`${base_url}/book/create`, {
   method: "POST",
   body: JSON.stringify({ data }),
   headers: { "Content-Type": "application/json" },
 });
 return res.json();
};

const editBook = async (values, bookId) => {
  const data = {
     book_title: values.bookTitle,
     type: values.type,
     quantity: Number(values.quantity),
     author_name: values.authorName,
     price: Number(values.price),
     published_year: Number(values.publishedYear),
   };
 const res = await fetch(`${base_url}/book/update/${bookId}`, {
   method: "PUT",
   body: JSON.stringify({ data }),
   headers: { "Content-Type": "application/json" },
 });
 return res.json();
};

const getBookListData = async (page) => {
  const res = await fetch(`${base_url}/book/getAll?page=${page}&limit=${10}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

const boorowBookList = async (values) => {
  const data = {
     book_title: values.bookTitle
   };
 const res = await fetch(`${base_url}/book/create`, {
   method: "POST",
   body: JSON.stringify({ data }),
   headers: { "Content-Type": "application/json" },
 });
 return res.json();
};

const deleteBook = async (id) => {
  const res = await fetch(`${base_url}/book/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  
  return res.json();
};


export { register, login, addBook, getBookListData, editBook, deleteBook };