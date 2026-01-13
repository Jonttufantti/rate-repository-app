import React from "react";
import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryListContainer";

describe("RepositoryListContainer", () => {
  it("renders repository information correctly", () => {
    const repositories = {
      edges: [
        {
          node: {
            id: "jaredpalmer.formik",
            fullName: "jaredpalmer/formik",
            description: "Build forms in React, without the tears",
            language: "TypeScript",
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:
              "https://avatars2.githubusercontent.com/u/4060187?v=4",
          },
        },
        {
          node: {
            id: "async-library.react-async",
            fullName: "async-library/react-async",
            description: "Flexible promise-based React data loader",
            language: "JavaScript",
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl:
              "https://avatars1.githubusercontent.com/u/54310907?v=4",
          },
        },
      ],
    };

    render(<RepositoryListContainer repositories={repositories} />);

    const repositoryItems = screen.getAllByTestId("repositoryItem");

    const [first, second] = repositoryItems;

    // First repository
    expect(first).toHaveTextContent(/jaredpalmer\/formik/);
    expect(first).toHaveTextContent(/Build forms in React, without the tears/);
    expect(first).toHaveTextContent(/TypeScript/);
    expect(first).toHaveTextContent(/21\.9k/);
    expect(first).toHaveTextContent(/1\.6k/);
    expect(first).toHaveTextContent(/3/);
    expect(first).toHaveTextContent(/88/);

    // Second repository
    expect(second).toHaveTextContent(/async-library\/react-async/);
    expect(second).toHaveTextContent(
      /Flexible promise-based React data loader/
    );
    expect(second).toHaveTextContent(/JavaScript/);
    expect(second).toHaveTextContent(/1\.8k/);
    expect(second).toHaveTextContent(/69/);
    expect(second).toHaveTextContent(/3/);
    expect(second).toHaveTextContent(/72/);
  });
});
