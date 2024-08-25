import { Helmet } from "react-helmet-async";
import styles from "./auth.module.css";
import { useGetAuthMutation } from "../../store/authApi/authApi";
import { useState } from "react";
import { TUserResponse } from "../../types/userTypes";
import { onKeyEnterDown } from "../../helpers/onEnterClick";

export default function Authorization() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [inputErr, setInputErr] = useState("");

  const credentials = {
    username: username,
    password: password,
    expiresInMins: 5,
  };

  const [getAuth, { isLoading, error }] = useGetAuthMutation<TUserResponse>();
  error && console.log(error.data);
  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (credentials.username && credentials.password) {
      try {
        const credentialsJson = JSON.stringify(credentials);
        await getAuth(credentialsJson).unwrap();
      } catch (err) {
        console.log("Login failed");
      }
    }

    if (!credentials.username || !credentials.password) {
      setInputErr("enter login or password");
    }
  };

  return (
    <div className={styles.auth__container}>
      <Helmet>
        <title> Login | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
      </Helmet>
      <main className={styles.auth__container}>
        <section
          aria-label="login form"
          className={styles.auth__container_content}
        >
          <h1 className={styles.container__content_title}>Sign in</h1>
          <article className={styles.container__content_box}>
            <label htmlFor="login">
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                  setInputErr("");
                }}
                placeholder="Login"
                className={styles.content__box_input}
                id="login"
                type="text"
              />
            </label>

            <label htmlFor="password">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setInputErr("");
                }}
                placeholder="Password"
                className={styles.content__box_input}
                id="password"
                type="password"
              />
            </label>
            <button
              disabled={isLoading ? true : false}
              onClick={handleLogin}
              onKeyDown={(e) => {
                onKeyEnterDown(e, handleLogin);
              }}
              className={styles.content__box_button}
            >
              Sign in
            </button>
          </article>
          {error && error?.error && (
            <p style={{ color: "red" }}>{error?.error}</p>
          )}
          {error && error?.data?.message && (
            <p style={{ color: "red" }}>{error.data.message}</p>
          )}
          {inputErr && <p style={{ color: "red" }}>{inputErr && inputErr}</p>}
        </section>
      </main>
    </div>
  );
}
