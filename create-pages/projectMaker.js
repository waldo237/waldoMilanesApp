const { slash } = require(`gatsby-core-utils`);
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const {fluid}= require('gatsby-plugin-sharp');

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

module.exports = async ({  graphql, getCache, createNodeId, cache, reporter, createPage, createNode }) => {

  const generateImages = async (node) => {
      const fileNode = await createRemoteFileNode({
        url: node.screenshot,
        parentNodeId: node._id,
        getCache,
        createNode,
        createNodeId,
      });
      const generatedImage = await fluid({
        file: fileNode,
        reporter,
        cache,
      });
    return generatedImage;
  };

  const fetchProject = async () => { 
    // eslint-disable-next-line no-return-await
    return await graphql(GET_PROJECTS)
      .then(({ data }) => {
        const { HWGraphQL: { projects } } = data;
        return { projects };
      }); 
  };
 
  
  await fetchProject().then(async({ projects }) => {
    await Promise.all(
    projects.map(async(project) => {
      const fluidImages = await generateImages(project);
      await  createPage({
          path: `project/${project.technology}`,
          component: slash(projectViewer),
          context: { ...project, screenshotImage: fluidImages },
        });
      })
      )
    })
};
