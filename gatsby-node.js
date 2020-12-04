/* eslint-disable no-param-reassign */
const fs = require('fs');
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const createAllProjects = require( './create-pages/projectMaker' );
const urlPhottos = require('./urlPhotos.json')

exports.createPages = async ( { actions, graphql } ) => {
	await createAllProjects( { actions, graphql } );

};


exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    if (page.path.match(/^\/project/)) {
      page.matchPath = "/project/*"

      createPage(page)
    }
    if (page.path.match(/^\/singleArticle\//)) {
      page.matchPath = "/singleArticle/*"

      createPage(page)
    }
    if (page.path.match(/^\/enterNewPassword\//)) {
      page.matchPath = "/enterNewPassword/*"

      createPage(page)
    }
    if (page.path.match(/^\/user\/profile\//)) {
      page.matchPath = "/user/profile/*"

      createPage(page)
    }

  }
  
  exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /bad-module/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }


exports.onPostBuild = () => {
  fs.copyFile(`./firebase.json`, `./public/firebase.json`, (err) => {
    if (err) {
      throw err;
    }
  });
};



exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  const firstPhoto = urlPhottos[0];
  if (firstPhoto ) {
    const fileNode = await createRemoteFileNode({
      url:firstPhoto.url, // string that points to the URL of the image
      parentNodeId: firstPhoto.url, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id
    }
  }
}