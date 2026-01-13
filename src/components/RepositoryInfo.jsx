import RepositoryItem from "./RepositoryItem";

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showGitHubButton />;
};

export default RepositoryInfo;
