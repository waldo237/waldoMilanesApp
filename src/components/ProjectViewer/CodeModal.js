/* eslint-disable react/jsx-props-no-spreading */
// prism
import React  from 'react'
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import PropTypes from 'prop-types';
import IconizeFile from './IconizeFile';

const CodeModal = ({
  code,
  fileId,
  name,
  showModal,
}) => {
  const exampleCode = `${code}`.trim();

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={exampleCode}
      language="javascript"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} modal modal-closed ${fileId}`}
          style={style}
        >
          <span
            className="modal-close-btn"
            onClick={() => showModal(fileId)}
            onKeyDown={() => showModal(fileId)}
          >
            &times;
          </span>
          <div className="float-right">
            <IconizeFile name={name} /> <h3>{name}</h3>
          </div>
          <code>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <code>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </code>
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};
CodeModal.propTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
  fileId: PropTypes.string,
  showModal: PropTypes.func,
}
CodeModal.defaultProps={
  code: 'There is no code inside this file.',
  name: 'No filename',
  fileId: '',
  showModal: ()=>{}
}
export default CodeModal;