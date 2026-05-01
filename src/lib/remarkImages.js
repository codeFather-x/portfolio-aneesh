// Remark plugin to transform relative image paths in blog posts
// Converts ../images/file.png to /blog/images/file.png

export function remarkImages() {
  return (tree) => {
    // Visit all image nodes
    const visit = (node) => {
      if (node.type === 'image') {
        // Transform relative paths like ../images/... to absolute paths
        if (node.url && node.url.includes('../images/')) {
          node.url = node.url.replace(/.*\/images\//, '/blog/images/')
        }
      }
      // Recursively visit children
      if (node.children) {
        node.children.forEach(visit)
      }
    }
    
    tree.children.forEach(visit)
  }
}
