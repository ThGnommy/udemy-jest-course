import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("displays informations about the repository", () => {
  const repository = {
    language: "GDScript",
    stargazers_count: "20",
    forks: "5",
    open_issues: "2",
  };

  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(`\\b${value}\\b`));
    expect(element).toBeInTheDocument();
  }
});
