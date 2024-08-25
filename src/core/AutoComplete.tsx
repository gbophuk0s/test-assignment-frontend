import React, {useState} from "react";

export interface Adapter<T> {

    renderId(item: T): string | number;

    renderText(item: T): string;

    filter(input: string, item: T): boolean;

}

interface Props<T> {
    name?: string;

    items: T[];

    adapter: Adapter<T>;

    initialValue?: T;

    onChange?: (value: T) => void;

}

interface ViewOption<T> {

    id: string | number;

    text: string;

    value?: T;

}

const AutoComplete = <T, >(props: Props<T>) => {
    const name = props.name;
    const adapter = props.adapter;
    const items = props.items;
    const initialValue = props.initialValue;
    const onChange = props.onChange;

    const [text, setText] = useState<string>(() => initialValue != null ? adapter.renderText(initialValue) : "");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
    const handleOnClick = (option: ViewOption<T>) => {
        handleChange(option.text);
        onChange?.(option.value);
    };

    const handleChange = (value: string) => {
        setText(value);
    };

    const viewOptions: ViewOption<T>[] = items
        .filter(it => adapter.filter(text, it))
        .map(it => ({
            id: adapter.renderId(it),
            text: adapter.renderText(it),
            value: it
        }));

    return (
        <div className="autocomplete-container">
            <input
                className="autocomplete-input"
                list="options"
                value={text}
                onFocus={() => {
                    if (!showPlaceholder) {
                        setShowPlaceholder(true);
                    }
                }}
                onChange={(e) => {
                    setShowDropdown(true);
                    handleChange(e.currentTarget.value);
                }}
                placeholder={showPlaceholder ? "Type here to search..." : ""}
            />
            {text.length > 0 && showDropdown && (
                <ul className="autocomplete-options-container">
                    {viewOptions.length == 0 && (
                        <div>Noting found</div>
                    )}

                    {viewOptions.map(it => (
                        <li
                            className="autocomplete-options-container-option"
                            key={it.id}
                            onClick={() => {
                                setShowDropdown(false);
                                handleOnClick(it);
                            }}
                        >
                            {it.text}
                        </li>
                    ))}
                </ul>
            )}

            {name != null && (
                <input type="hidden" name={name} value={text}/>
            )}
        </div>
    );
};

export default AutoComplete;
