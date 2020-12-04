// This is the function that does all the work
const generateImages = async (pages ) => {
    const featureImages = new Map();

    for (const page of pages) {
      const { node } = page;

      if (featureImages.has(node.technology)) {
        return;
      }

      const fileNode = await createRemoteFileNode({
        url: node.image_url,
        parentNodeId: node.id,
        getCache,
        createNode,
        createNodeId,
      });

      const generatedImage = await fluid({
        file: fileNode,
        reporter,
        cache,
      });

      featureImages.set(node.technology, generatedImage);
    }

    return featureImages;
  };

  const fluidImages = await generateImages(posts);

  // Create post pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.slug,
        fluidImage: fluidImages.get(node.slug),
      },
    });
  });