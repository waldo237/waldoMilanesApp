/* eslint-disable no-param-reassign */
const fs = require('fs');
const createAllProjects = require( './create-pages/projectMaker' );


exports.createPages = async ({ actions, graphql, getCache, createNodeId, cache, reporter }) => {
  const { createPage, createNode } = actions; 
  await createAllProjects( { graphql, getCache, createNodeId, cache, reporter, createPage, createNode } );
}

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
