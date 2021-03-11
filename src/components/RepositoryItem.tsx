interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
    html_url: string;
  };
}

export function RepositoryItem(props: RepositoryItemProps) {
  return (
    <li>
      <strong>{props.repository.name}</strong>

      <div>{props.repository.description ?? "Repositório sem descrição."}</div>

      <a href={props.repository.html_url} target="_blank">
        <button>Access</button>
      </a>
    </li>
  );
}
