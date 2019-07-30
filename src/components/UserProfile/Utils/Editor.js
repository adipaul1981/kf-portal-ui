import * as React from 'react';
import { TealActionButton, WhiteButton } from '../../../uikit/Button';
import PencilIcon from 'react-icons/lib/fa/pencil';
import styled from 'react-emotion';
import { Field } from 'formik';
import { space, width } from 'styled-system';
import TitleH2 from './TitleH2';
import { toSpaceCase, joinWithLast } from './toSpaceCase';
import cloneDeep from "lodash/cloneDeep"
import { omit } from 'lodash/object';

const StyledLabel = styled('label')`
  font-size: 14px;
  letter-spacing: 0.2px;
  text-align: left;
  font-weight: 700;
`;

const fieldStyle = {
  backgroundColor: 'rgb(255, 255, 255)',
  borderBottomColor: 'rgb(212, 214, 221)',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  borderImageOutset: '0px',
  borderImageRepeat: 'stretch',
  borderImageSlice: '100%',
  borderImageSource: 'none',
  borderImageWidth: '1',
  borderLeftColor: 'rgb(212, 214, 221)',
  borderLeftStyle: 'solid',
  borderLeftWidth: '1px',
  borderRightColor: 'rgb(212, 214, 221)',
  borderRightStyle: 'solid',
  borderRightWidth: '1px',
  borderTopColor: 'rgb(212, 214, 221)',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  boxShadow: 'rgba(0, 0, 0, 0.075) 0px 1px 1px 0px inset',
  boxSizing: 'border-box',
  color: 'rgb(0, 0, 0)',
  cursor: 'text',
  display: 'block',
  fontFamily: '"Open Sans", sans-serif',
  fontSize: '14px',
  fontStretch: '100%',
  fontStyle: 'normal',
  fontVariantCaps: 'normal',
  fontVariantEastAsian: 'normal',
  fontVariantLigatures: 'normal',
  fontVariantNumeric: 'normal',
  fontWeight: '400',
  height: '34px',
  letterSpacing: 'normal',
  lineHeight: '20px',
  marginBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px',
  marginTop: '0px',
  minWidth: '0px',
  outlineColor: 'rgb(0, 0, 0)',
  outlineStyle: 'none',
  outlineWidth: '0px',
  paddingBottom: '6px',
  paddingLeft: '12px',
  paddingRight: '12px',
  paddingTop: '6px',
  textAlign: 'start',
  textIndent: '0px',
  textRendering: 'auto',
  textShadow: 'none',
  textTransform: 'none',
  transitionDelay: '0s, 0s',
  transitionDuration: '0.15s, 0.15s',
  transitionProperty: 'border-color, box-shadow',
  transitionTimingFunction: 'ease-in-out, ease-in-out',
  maxWidth: "100%",
  width: "100%",
  wordSpacing: '0px',
  writingMode: 'horizontal-tb',
};

const selectStyle = {
  alignItems: 'center',
  backgroundAttachment: 'scroll',
  backgroundClip: 'border-box',
  backgroundColor: 'rgb(255, 255, 255)',
  backgroundOrigin: 'padding-box',
  backgroundPositionX: '100%',
  backgroundPositionY: '50%',
  backgroundRepeatX: '',
  backgroundRepeatY: '',
  backgroundSize: 'auto',
  borderBottomColor: 'rgb(212, 214, 221)',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  borderImageOutset: '0px',
  borderImageRepeat: 'stretch',
  borderImageSlice: '100%',
  borderImageSource: 'none',
  borderImageWidth: '1',
  borderLeftColor: 'rgb(212, 214, 221)',
  borderLeftStyle: 'solid',
  borderLeftWidth: '1px',
  borderRightColor: 'rgb(212, 214, 221)',
  borderRightStyle: 'solid',
  borderRightWidth: '1px',
  borderTopColor: 'rgb(212, 214, 221)',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  boxShadow: 'none',
  boxSizing: 'border-box',
  color: 'rgb(0, 0, 0)',
  cursor: 'default',
  display: 'block',
  fontFamily: 'Arial',
  fontSize: '14px',
  fontStretch: '100%',
  fontStyle: 'normal',
  fontVariantCaps: 'normal',
  fontVariantEastAsian: 'normal',
  fontVariantLigatures: 'normal',
  fontVariantNumeric: 'normal',
  fontWeight: '400',
  letterSpacing: 'normal',
  lineHeight: '20px',
  marginBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px',
  marginTop: '0px',
  outlineColor: 'rgb(0, 0, 0)',
  outlineStyle: 'none',
  outlineWidth: '0px',
  paddingBottom: '7px',
  paddingLeft: '7px',
  paddingRight: '21px',
  paddingTop: '7px',
  textAlign: 'start',
  textIndent: '0px',
  textRendering: 'auto',
  textShadow: 'none',
  textTransform: 'capitalize',
  whiteSpace: 'pre',
  wordSpacing: '0px',
  writingMode: 'horizontal-tb',
  WebkitAppearance: 'none',
  WebkitRtlOrdering: 'logical',
  WebkitBorderImage: 'none'
};

const areaStyle = {
  display: "block",
  backgroundColor: 'rgb(255, 255, 255)',
  borderBottomColor: 'rgb(202, 203, 207)',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  borderImageOutset: '0px',
  borderImageRepeat: 'stretch',
  borderImageSlice: '100%',
  borderImageSource: 'none',
  borderImageWidth: '1',
  borderLeftColor: 'rgb(202, 203, 207)',
  borderLeftStyle: 'solid',
  borderLeftWidth: '1px',
  borderRightColor: 'rgb(202, 203, 207)',
  borderRightStyle: 'solid',
  borderRightWidth: '1px',
  borderTopColor: 'rgb(202, 203, 207)',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  boxSizing: 'border-box',
  color: 'rgb(0, 0, 0)',
  cursor: 'text',
  flexDirection: 'column',
  fontFamily: 'Montserrat, sans-serif, sans-serif',
  fontSize: '14px',
  fontStretch: '100%',
  fontStyle: 'normal',
  fontVariantCaps: 'normal',
  fontVariantEastAsian: 'normal',
  fontVariantLigatures: 'normal',
  fontVariantNumeric: 'normal',
  fontWeight: '400',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  marginBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px',
  marginTop: '0px',
  minHeight: '144px',
  outlineColor: 'rgb(0, 0, 0)',
  outlineStyle: 'none',
  outlineWidth: '0px',
  overflowWrap: 'break-word',
  paddingBottom: '2px',
  paddingLeft: '2px',
  paddingRight: '2px',
  paddingTop: '2px',
  resize: 'none',
  textAlign: 'start',
  textIndent: '0px',
  textRendering: 'auto',
  textShadow: 'none',
  textTransform: 'none',
  transitionDelay: '0s',
  transitionDuration: '0.2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
  whiteSpace: 'pre-wrap',
  width: '100%',
  wordSpacing: '0px',
  writingMode: 'horizontal-tb',
  WebkitAppearance: 'none',
  WebkitRtlOrdering: 'logical',
  WebkitBorderImage: 'none'
};

function override(obj, newField) {
  const newFields = Array.isArray(newField) ? newField : [newField];

  const temp = omit(obj, newFields.map(f => Object.keys(f)));
  newFields.forEach(f => temp[Object.keys(f)] = f[Object.keys(f)[0]]);

  console.log(temp)
  return temp;
}

const EditorInput = (props) => <input type={"text"} {...override(props, {style: fieldStyle})}/>

const LabelInput = (props) => (
  <div style={{boxSizing: "border-box"}}>
    <StyledLabel style={{textTransform: "capitalize"}}>{props.label}:</StyledLabel>
    <EditorInput {...props}/>
  </div>
);

export {LabelInput};

const LabelSelect = (props) => (
  <div style={{boxSizing: "border-box"}}>
    <StyledLabel style={{textTransform: "capitalize"}}>{props.label}:</StyledLabel>
    <select {...override(props, {style: selectStyle})}/>
  </div>
);

export {LabelSelect};

const LabelTextArea = (props) => (
  <div style={{boxSizing: "border-box"}}>
    <StyledLabel style={{textTransform: "capitalize"}}>{props.label}:</StyledLabel>
    <textarea {...override(props, {style: areaStyle})}></textarea>
  </div>
);

export {LabelTextArea};

const FieldContainer = (props) => (
  <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr", gridGap: "1em", backgroundColor: "rgb(237, 238, 241)", padding: "0.5em"}}>
    {props.children}
  </div>
);

export {FieldContainer};

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {closed: true};
    this.cancel = () => this.setState({closed: true});
  }

  render() {
    const profileCopy = cloneDeep(this.props.profile);  //local copy of the profile. Used when editing, and will overwrite the profile on save

    const predefCells = this.props.Cells;
    const cellKeys = Object.keys(predefCells);

    const fields = [...this.props.fields].filter(f => !cellKeys.includes(f));

    return (
      <div>
        {
          this.state.closed
            ? ""
            : (
              <div
                style={{
                  position: "fixed",
                  left: "0px",
                  top: "0px",
                  bottom: "0px",
                  right: "0px",
                  height: "100%",
                  width: "100%",
                  zIndex: 150,
                  backgroundColor: "rgba(0,0,0,0.4)", /* Black w/ opacity */
                  color: 'black',
                  display: "flex",
                  alignItems: "center",
                }}

                onClick={this.cancel}
              >
                <div
                  style={{
                    margin: "0 auto",
                    backgroundColor: "white",
                    width: "90%",
                    maxHeight: "90%",
                    padding: "2em",
                    borderRadius: "4px",
                    border: "1px solid rgb(202, 203, 207)",
                    position: "relative",
                    overflowY: "auto",
                  }}

                  onClick={(event) => event.stopPropagation()}  //cancel parent's onClick
                >
                  <TitleH2>
                    {(() => {
                      const temp = this.props.title;

                      if(temp === undefined) return "Edit your information";
                      else return "Edit your "+(temp.split(" ").map(t => t.charAt(0).toLowerCase() + t.slice(1, t.length)).join(" "));
                    })()}
                  </TitleH2>
                  <div style={{display: "grid", gridTemplateColumns: "1fr", gridGap: "2em"}}>
                    {
                      fields.map( field =>
                        <FieldContainer>
                          {field.split(" ").map( f => <LabelInput value={profileCopy[f]} label={toSpaceCase(f)}/>)}
                        </FieldContainer>
                      ).concat(cellKeys.map(k => predefCells[k](profileCopy)))
                    }
                  </div>
                  <div style={{width: "100%", display: 'flex', justifyContent: "space-between", paddingTop: "2em"}}>
                    <WhiteButton onClick={this.cancel}>Cancel</WhiteButton>
                    <TealActionButton onClick={() => ""}>Save</TealActionButton>
                  </div>
                </div>
              </div>
            )
        }
        <WhiteButton onClick={ () => this.setState({closed: false})}>
          <PencilIcon size={12} className="icon" /> Edit
        </WhiteButton>
      </div>
    )
  }
}