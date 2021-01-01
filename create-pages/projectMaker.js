/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
const { slash } = require(`gatsby-core-utils`);
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { fluid } = require('gatsby-plugin-sharp');

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

module.exports = async ({ graphql, getCache, createNodeId, cache, reporter, createPage, createNode }) => {

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

  /**
   * call project fetcher and pass them forward
   * add the photos to all projects
   * create a catalog page that will display all projects
   * with their photo.
   *
   */
  await fetchProject().then(async ({ projects }) => {
    const set = new Set();
    const withImage =  await Promise.all(
   await projects.map(async (project) => {
        const fluidImages = await generateImages(project);
        await createPage({
          path: `project/${project.technology}/${project._id}`,
          component: slash(projectViewer),
          context: { ...project, screenshotImage: fluidImages },
        });
        set.add(project.technology);
        return { ...project, screenshotImage: fluidImages };
      })
    )
    return {withImage, set};
  })
  .then(({withImage, set}) => {
    set.forEach((value)=> {
     const projects =  withImage.filter((project)=> project.technology === value);
     createPage({
              path: `project/${value}`,
              component: slash(projectViewer),
              context: projects,
            });
    })
  })

  // const hashMap = {}
  // await fetchProject()
  //   .then(async ({ projects }) => {
  //     projects.map(async (project) => {
  //       if (!hashMap[project.technology]) hashMap[project.technology] = [];
  //       const fluidImages = await generateImages(project);
  //       hashMap[project.technology].push({ ...project, screenshotImage: fluidImages })
  //     })
  //   })
  //   .then(() => {
  //     for (const elem in hashMap) {
  //       const keys = [];
  //       if (hashMap.hasOwnProperty(elem)) {
  //         keys.push(hashMap[elem]);
  //       }
  //       createPage({
  //         path: `project/${elem}`,
  //         component: slash(projectViewer),
  //         context: keys,
  //       });
  //     }
  //   })
};
