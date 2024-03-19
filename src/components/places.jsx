import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";

const Places = ({ setOffice }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (val) => {
        setValue(val, false);
        clearSuggestions();
    
        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        setOffice({ lat, lng });
    };

    const handleClear = () => {
        setValue('', false);
        setOffice(null);
    }


    return (
        <Combobox onSelect={handleSelect}>
            <div className="combobox-input-container">
                <div className="combobox-input-field">
                    <ComboboxInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!ready}
                        className="combobox-input"
                        placeholder="Search address"
                    />
                </div>
                <div className="combobox-clear-btn">
                    <button className="btn btn-secondary" onClick={() => handleClear()}>Reset</button>
                </div>
            </div>
            
            <ComboboxPopover>
                <ComboboxList>
                {status === "OK" &&
                    data.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                    ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
}
 
export default Places;