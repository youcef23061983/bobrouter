// import React, { useState } from "react";
// import { useLoaderData } from "react-router-dom";
// export function loader({ request }) {
//   return new URL(request.url).searchParams.get("message");
// }

// const Login = () => {
//   const [loginFormData, setLoginFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const message = useLoaderData();
//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log(loginFormData);
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setLoginFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   return (
//     <div className="login-container">
//       <h1>Sign in to your account</h1>
//       {message && <h2 className="red">{message}</h2>}
//       <form onSubmit={handleSubmit} className="login-form">
//         <input
//           name="email"
//           onChange={handleChange}
//           type="email"
//           placeholder="Email address"
//           value={loginFormData.email}
//         />
//         <input
//           name="password"
//           onChange={handleChange}
//           type="password"
//           placeholder="Password"
//           value={loginFormData.password}
//         />
//         <button>Log in</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// ***********************second method ***********************
// import {
//   redirect,
//   useActionData,
//   useLoaderData,
//   useNavigation,
//   useFetcher,
// } from "react-router-dom";

// export function loader({ request }) {
//   return new URL(request.url).searchParams.get("message");
// }

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function fakeLoginUser(creds) {
//   await sleep(1000);
//   if (creds.email === "b@b.com" && creds.password === "p123") {
//     localStorage.setItem("loggedin", true);
//     return {
//       email: creds.email,
//       token: "1234567890abcdef",
//     };
//   }
//   throw new Error("Couldn't log the user in");
// }

// export async function action({ request }) {
//   const formData = await request.formData();
//   const email = formData.get("email");
//   const password = formData.get("password");

//   const pathname =
//     new URL(request.url).searchParams.get("redirectTo") || "/host";

//   try {
//     const user = await fakeLoginUser({ email, password });
//     return redirect(pathname);
//   } catch (err) {
//     return err.message;
//   }
// }

// const Login = () => {
//   const errorMessage = useActionData();
//   const message = useLoaderData();
//   const navigation = useNavigation();
//   const fetcher = useFetcher();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const email = formData.get("email");
//     const password = formData.get("password");

//     console.log(email, password);

//     try {
//       const response = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("User successfully posted:", result);
//         // Handle success, e.g., redirect to another page or update UI
//       } else {
//         const errorData = await response.json();
//         console.error("Error posting user:", errorData);
//         // Handle error, e.g., display error message
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       // Handle network error
//     }
//     fetcher.submit(event.target, { method: "post" });
//   };

//   return (
//     <div className="login-container">
//       <h1>Sign in to your account</h1>
//       {message && <h3 className="red">{message}</h3>}
//       {errorMessage && <h3 className="red">{errorMessage}</h3>}
//       <form onSubmit={handleSubmit} className="login-form">
//         <input name="email" type="email" placeholder="Email address" />
//         <input name="password" type="password" placeholder="Password" />
//         <button disabled={navigation.state === "submitting"}>
//           {navigation.state === "submitting" ? "Logging in..." : "Log in"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// """""""""bob ziroll method """""""""""""""""""""""""""""

import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useFetcher,
  Form,
} from "react-router-dom";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fakeLoginUser(creds) {
  await sleep(1000);
  if (creds.email === "b@b.com" && creds.password === "p123") {
    localStorage.setItem("loggedin", true);
    return {
      email: creds.email,
      token: "1234567890abcdef",
    };
  }
  throw new Error("Couldn't log the user in");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";

  try {
    const user = await fakeLoginUser({ email, password });
    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

const Login = () => {
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();
  const fetcher = useFetcher();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    fetcher.submit(event.target, { method: "post" });
  };

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}{" "}
      <Form onSubmit={handleSubmit} className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
};

export default Login;
