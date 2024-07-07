this.post("/login", (schema, request) => {
  const { email, password } = JSON.parse(request.requestBody);
  const foundUser = schema.users.findBy({ email, password });

  if (!foundUser) {
    return new Response(
      401,
      {},
      { message: "No user with those credentials found!" }
    );
  }

  foundUser.password = undefined;
  return {
    user: foundUser,
    token: "Enjoy your pizza, here's your tokens.",
  };
});
