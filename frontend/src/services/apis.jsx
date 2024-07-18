const base_url = process.env.REACT_APP_BASE_URL

const register = async (name, email, password) => {
    const data = {name, email, password}
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


export { register, login };