import * as React from 'react';
import { TealActionButton, WhiteButton } from '../../../uikit/Button';
import PencilIcon from 'react-icons/lib/fa/pencil';
import styled from 'react-emotion';
import { Field } from 'formik';
import { space, width } from 'styled-system';
import TitleH2 from './TitleH2';
import { toSpaceCase, joinWithLast } from './toSpaceCase';

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


export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {closed: true};
  }

  render() {
    const profile = this.props.profile;

    const fields = this.props.fields;

    const LabelInput = ({field}) =>
      <div style={{width: "50%", boxSizing: "border-box"}}>
        <StyledLabel style={{textTransform: "capitalize"}}>{field}:</StyledLabel>
        <input style={fieldStyle} name={field} value={profile[field]}/>
      </div>;

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

                onClick={() => this.setState({closed: true})}
              >
                <div
                  style={{
                    margin: "0 auto",
                    backgroundColor: "white",
                    width: "90%",
                    padding: "2em",
                    borderRadius: "4px",
                    border: "1px solid rgb(202, 203, 207)"
                  }}
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
                        <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr", gridGap: "1em", backgroundColor: "rgb(237, 238, 241)", padding: "0.5em"}}>
                          {
                            field.split(" ").map( f =>
                              <div style={{boxSizing: "border-box"}}>
                                <StyledLabel style={{textTransform: "capitalize"}}>{toSpaceCase(f)}</StyledLabel>
                                <input style={fieldStyle} name={f} value={profile[f]}/>
                              </div>
                            )
                          }
                        </div>
                      )
                    }
                  </div>
                  <div style={{width: "100%", display: 'flex', justifyContent: "space-between", paddingTop: "2em"}}>
                    <WhiteButton onClick={() => ""}>Cancel</WhiteButton>
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