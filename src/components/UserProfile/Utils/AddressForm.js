import React from 'react';
import PlacesAutocomplete, { geocodeByPlaceId} from 'react-places-autocomplete';
import scriptjs from 'scriptjs';
import { googleMapsKey } from 'common/injectGlobals';
import { FieldContainer, LabelInput, SuggestionItem } from './Editor';

class WrappedPlacesAutocomplete extends React.Component {
  //https://github.com/kenny-hibino/react-places-autocomplete/pull/107
  state = { loaded: false };

  componentDidMount() {
    scriptjs(
      `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`,
      () => this.setState({ loaded: true, }),
    );
  }

  render() {
    if (!this.state.loaded) return null;
    return <PlacesAutocomplete {...this.props}>{this.props.children}</PlacesAutocomplete>;
  }
}

export default class AddressForm extends React.Component {
  constructor(props) {
    super(props);

    const {
      addressLine1,
      addressLine2,
      country,
      state,
      city,
      zip,
    } = this.props.profile || "";

    this.state = {addressLine1, addressLine2, country, city, state, zip};
    this.updateState = (state, callback) => this.setState({...this.state, ...state}, callback);
    this.handleSelect.bind(this);

    this.suggestions = [];
  }

  handleChange = address => {
    this.updateState({ address });
  };

  handleSelect = (address, placeID) => {
    console.log("HANDLING SELECT. PLaceid is"); console.log(placeID);

    geocodeByPlaceId(placeID).then(results => {
      const defaultObject = { long_name: '' };
      const country = (
        results[0].address_components.find(c => c.types.includes('country')) ||
        defaultObject
      ).long_name;
      const state = (
        results[0].address_components.find(c =>
          c.types.includes('administrative_area_level_1'),
        ) || defaultObject
      ).long_name;
      const city = (
        results[0].address_components.find(c => c.types.includes('locality')) ||
        defaultObject
      ).long_name;
      const streetNumber = (
        results[0].address_components.find(c => c.types.includes('street_number')) ||
        defaultObject
      ).long_name;
      const route = (
        results[0].address_components.find(c => c.types.includes('route')) ||
        defaultObject
      ).long_name;
      const zip = (
        results[0].address_components.find(
          c => c.types.includes('zip') || c.types.includes('postal_code'),
        ) || defaultObject
      ).long_name;

      this.updateState(
        {
          addressLine1: `${streetNumber} ${route}`,
          state,
          city,
          zip,
          country
        }
      );
    }).catch(error => console.error(error));
  };

  getSuggestions(suggestions) {
    if(suggestions.length === 0) return this.suggestions;
    else {
      this.suggestions = suggestions;
      return this.suggestions;
    }
  }

  render() {
    console.log(this.state)
    console.log(this.state.addressLine1)

    return (
      <div>
        <WrappedPlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <LabelInput label={"Search For Your Location"} {...getInputProps()} />
              {
                this.getSuggestions(suggestions).map(suggestion => {
                  //console.log(suggestion.placeId)
                  return <SuggestionItem
                    onClick={() => {
                      this.suggestions = [];
                      this.handleSelect("", suggestion.placeId);
                    }}
                    placeId={suggestion.placeId}
                    description={suggestion.description}
                  />
                })
              }
            </div>)}
        </WrappedPlacesAutocomplete>
        <FieldContainer>
          <LabelInput label={"Address Line 1"} value={this.state.addressLine1}/>
          <LabelInput label={"Address Line 2"} value={this.state.addressLine2}/>
          <LabelInput label={"City"} value={this.state.city}/>
          <LabelInput label={"State"} value={this.state.state}/>
          <LabelInput label={"ZIP Code"} value={this.state.zip}/>
          <LabelInput label={"Country"} value={this.state.country}/>
        </FieldContainer>
      </div>

    );
  }
}