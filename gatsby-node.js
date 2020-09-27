/* eslint-disable no-param-reassign */
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