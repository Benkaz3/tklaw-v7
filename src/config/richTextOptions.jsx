import React from 'react';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className="bg-gray-100 p-1 rounded font-mono">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node, children) => (
      <h1 className="text-3xl sm:text-4xl font-bold mt-6 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="font-semibold mt-6 mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="font-semibold mt-5 mb-2">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="list-disc ml-6 space-y-1 my-3">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="list-decimal ml-6 space-y-1 my-3">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => {
      const first = React.Children.toArray(children)[0];
      const content =
        React.isValidElement(first) && first.props.children
          ? first.props.children
          : children;
      return <li className="ml-5">{content}</li>;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className="text-primary hover:underline break-words"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = node.data.target.fields || {};
      if (!file?.url) return null;
      return (
        <figure className="mb-6">
          <img
            src={file.url}
            alt={title || ''}
            className="w-full h-auto rounded"
            loading="lazy"
          />
          {title && (
            <figcaption className="text-center text-gray-500 mt-2">
              {title}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default richTextOptions;
