/**
 * Converts a Contentful rich text node to a plain text string.
 * Recursively processes paragraph, text, and hyperlink nodes.
 */
const convertRichTextToString = (richTextNode) => {
  if (!richTextNode?.content) return '';

  return richTextNode.content
    .map((node) => {
      if (!node) return '';
      switch (node.nodeType) {
        case 'paragraph':
          return convertRichTextToString(node);
        case 'text':
          return node.value || '';
        case 'hyperlink':
          return (node.content || []).map((linkNode) => linkNode.value || '').join('');
        default:
          return '';
      }
    })
    .join(' ');
};

export default convertRichTextToString;
