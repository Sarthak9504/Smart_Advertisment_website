function getCookieList(req, name) {
  try {
    const cookie = req.cookies[name];
    return cookie ? JSON.parse(cookie) : [];
  } catch {
    return [];
  }
}

function addToCookieList(res, req, name, newItem) {
  const list = getCookieList(req, name);
  if (!list.includes(newItem)) list.push(newItem);

  res.cookie(name, JSON.stringify(list), {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: Number(process.env.COOKIE_EXPIRY),
  });
}

function overwriteCookieList(res, req, name, newItem) {
  const list = [];
  list.push(newItem);

  res.cookie(name, JSON.stringify(list), {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: Number(process.env.COOKIE_EXPIRY),
  });
}

module.exports = { addToCookieList, overwriteCookieList };
