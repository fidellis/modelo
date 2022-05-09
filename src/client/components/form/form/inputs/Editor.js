// import React from 'react';
// import PropTypes from 'prop-types';
// import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// // import htmlToDraft from 'html-to-draftjs';
// import { uploadApi } from '~/lib/api';
// import config from '~/config';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// function createMarkup(text) {
//   return { __html: text };
// }

// function uploadFile(file) {
//   const formData = new FormData();
//   formData.append('file', file);

//   return uploadApi.post('/upload/1', formData).then((response) => {
//     const { data } = response;
//     return { data: { id: 1, nome: file.name, link: `${config.arquivoUrl}/${data.id}` } };
//   });
// }

// function isRaw(value) {
//   return /entityMap/g.test(value);
// }

// // suport html and draft string {"entityMap"...}
// function toContentState(value) {
//   if (!value) return null;
//   if (isRaw(value)) {
//     return convertFromRaw(JSON.parse(value));
//   }
//   // const contentBlock = htmlToDraft(value);
//   // return contentBlock ? ContentState.createFromBlockArray(contentBlock.contentBlocks) : null;
//   return null;
// }

// function toEditorState(value) {
//   const contentState = toContentState(value);
//   return contentState ? EditorState.createWithContent(contentState) : null;
// }

// function toContentString(editorState) {
//   const content = convertToRaw(editorState.getCurrentContent());
//   return JSON.stringify(content);
// }

// function toHtml(editorState) {
//   return createMarkup(draftToHtml(convertToRaw(editorState.getCurrentContent())));
// }

// function toText(editorState) {
//   return convertToRaw(editorState.getCurrentContent()).blocks.reduce((a, b) => a.concat(`${b.text}\n`), '');
// }

// const toolbarOptions = {
//   image: {
//     uploadCallback(file) {
//       return uploadFile(file);
//     },
//     previewImage: true,
//   },
//   blockType: {
//     inDropdown: true,
//     options: ['Normal', 'Blockquote', 'Code'],
//     className: undefined,
//     component: undefined,
//     dropdownClassName: undefined,
//   },
//   options: [
//     'inline',
//     'blockType',
//     'fontSize',
//     'fontFamily',
//     'list',
//     'textAlign',
//     'colorPicker',
//     'link',
//     'embedded',
//     'emoji',
//     'image',
//     'remove',
//     'history',
//   ],
// };

// class DraftJs extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       editorState: toEditorState(props.value),
//       new: true,
//     };



//     this.setEditor = (editor) => {
//       this.editor = editor;
//     };

//     this.focusEditor = () => {
//       if (this.editor) {
//         this.editor.focus();
//       }
//     };

//   }

//   componentWillReceiveProps({ value }) {
//     if (value !== this.props.value && this.state.new) {
//       this.setState({ editorState: toEditorState(value), new: false }, () => {
//         this.onChange(this.state.editorState)
//       });
//     }
//   }

//   onChange = editorState => this.setState({ editorState }, () => this.props.onChange({
//     content: toContentString(this.state.editorState),
//     html: toHtml(this.state.editorState),
//     text: toText(this.state.editorState),
//   }));

//   render() {
//     return (
//       <div style={this.props.style}>
//         <Editor
//           ref={this.setEditor}
//           editorState={this.state.editorState}
//           onEditorStateChange={this.onChange}
//           handlePastedText={this.handlePastedText}
//           toolbar={toolbarOptions}
//         />
//       </div>
//     );
//   }
// }

// DraftJs.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string,
// };

// DraftJs.defaultProps = {
//   value: null,
//   style: {
//     border: '1px solid rgba(0, 0, 0, 0.12)',
//     borderRadius: 4,
//     background: 'white',
//     minHeight: 300,
//   },
// };


// export default DraftJs;
