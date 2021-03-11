import { RepositoryItem } from "./RepositoryItem";

import "../styles/repositories.scss";
import { useState, useEffect } from "react";

import { FaGithub, FaSearch } from "react-icons/fa";

interface Repository {
  name: string;
  description: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface User {
  name: string;
  avatar_url: string;
  login: string;
  company: string;
  blog: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [user, setUser] = useState<User>({
    name: "",
    avatar_url: "",
    login: "",
    company: "",
    blog: "",
  });
  const [currentUser, setCurrentUser] = useState("tiagopierre");

  function handleGetRepositories() {
    fetch(`https://api.github.com/users/${currentUser}/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data))
      .then(() => {
        fetch(`https://api.github.com/users/${currentUser}`)
          .then((response) => response.json())
          .then((data) => setUser(data));
      });
  }

  useEffect(() => {
    handleGetRepositories();
  }, []);

  return (
    <section className="container">
      <h1>
        <span>
          <FaGithub size={32} />
        </span>
        GitHub
        <span>explorer</span>
      </h1>

      <form>
        <input
          type="text"
          placeholder="Digite aqui um usuário válido do GitHub"
          value={currentUser}
          onChange={(event) => {
            setCurrentUser(event.target.value);
          }}
        />
        <button type="button" onClick={handleGetRepositories}>
          <FaSearch size={15} color="#444" />
        </button>
      </form>
      <div className="user">
        <img src={user.avatar_url} alt={user.login} />
        <div>
          <p>{user.name}</p>
          <p>Company: {user.company ?? "not reported by user"}</p>
          <p>Blog: {user.blog ?? "not reported by user"}</p>
        </div>
      </div>

      <ul>
        {repositories.map((repository) => {
          return (
            <RepositoryItem key={repository.name} repository={repository} />
          );
        })}
      </ul>
    </section>
  );
}
