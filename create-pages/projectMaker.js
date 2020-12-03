const { slash } = require(`gatsby-core-utils`);
const projectViewer = require.resolve(`../src/templates/projectViewer.js`);

// Get all the projects.
const GET_PROJECTS = `
query GET_PROJECTS {
    HWGraphQL {
        projects {
          _id
          code {
            dir {
              _id
              content
              name
              type
            }
          }
          comments {
            _id
            comment
            date
            userId
          }
          date
          description
          rating
          screenshot
          technology
          title
          url
        }
      }
}
`;

module.exports = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const fetchProject = async () => {
        return await graphql(GET_PROJECTS)
            .then(({ data }) => {
                const { HWGraphQL: { projects } } = data;
                return { projects };
            });
    };

    await fetchProject().then(({ projects }) => {
        projects &&
            projects.map((page) => {
                createPage({
                    path: `project/${page.technology}`,
                    component: slash(projectViewer),
                    context: { ...page },
                });

            });

    })

};
